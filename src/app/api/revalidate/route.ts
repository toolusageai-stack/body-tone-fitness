import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RevalidateKind = "post" | "story" | "instagram";

const KIND_TO_PATHS: Record<RevalidateKind, { index: string; item: (slug: string) => string }> = {
  post: {
    index: "/blog",
    item: (slug) => `/blog/${slug}`,
  },
  story: {
    index: "/success-stories",
    item: (slug) => `/success-stories/${slug}`,
  },
  // For Instagram slot updates the `slug` field carries the page key
  // (e.g. "gallery", "home"). Each page that consumes slots gets revalidated.
  instagram: {
    index: "/gallery",
    item: (slug) => (slug === "gallery" ? "/gallery" : `/${slug}`),
  },
};

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 500 });
  }

  const header = request.headers.get("authorization") ?? "";
  const provided = header.replace(/^Bearer\s+/i, "").trim();
  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let slug: string | undefined;
  let kind: RevalidateKind = "post";
  try {
    const body = (await request.json()) as { slug?: string; kind?: RevalidateKind };
    slug = body.slug;
    if (body.kind === "story" || body.kind === "post" || body.kind === "instagram") {
      kind = body.kind;
    }
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const paths = KIND_TO_PATHS[kind];
  revalidatePath(paths.index);
  if (slug) {
    revalidatePath(paths.item(slug));
  }

  return NextResponse.json({
    ok: true,
    revalidated: { kind, index: paths.index, slug: slug ?? null },
  });
}
