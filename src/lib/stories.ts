import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Block } from "./types/post";
import type { Story, StoryStatus } from "./types/story";

const STORIES = "stories";

function isKnownBlock(block: Block): boolean {
  return (
    block.type === "heading" ||
    block.type === "paragraph" ||
    block.type === "image" ||
    block.type === "quote" ||
    block.type === "list" ||
    block.type === "divider" ||
    block.type === "callout"
  );
}

function docToStory(id: string, data: Record<string, unknown>): Story {
  return {
    id,
    slug: (data.slug as string) ?? "",
    memberName: (data.memberName as string) ?? "",
    shortDescription: (data.shortDescription as string) ?? "",
    instagramUrl: (data.instagramUrl as string) ?? "",
    coverImage: (data.coverImage as string) || undefined,
    coverAlt: (data.coverAlt as string) || undefined,
    status: ((data.status as StoryStatus) ?? "draft"),
    order: typeof data.order === "number" ? (data.order as number) : 0,
    blocks: ((data.blocks as Block[]) ?? []).filter(isKnownBlock),
    tags: (data.tags as string[]) ?? [],
    createdAt: (data.createdAt as Timestamp) ?? Timestamp.now(),
    updatedAt: (data.updatedAt as Timestamp) ?? Timestamp.now(),
    publishedAt: (data.publishedAt as Timestamp | null) ?? null,
  };
}

export async function getPublishedStories(): Promise<Story[]> {
  const q = query(
    collection(db, STORIES),
    where("status", "==", "published"),
    orderBy("order", "asc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToStory(d.id, d.data()));
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const q = query(
    collection(db, STORIES),
    where("slug", "==", slug),
    where("status", "==", "published"),
    limit(1),
  );
  const snap = await getDocs(q);
  const first = snap.docs[0];
  if (!first) return null;
  return docToStory(first.id, first.data());
}

export async function getPublishedStorySlugs(): Promise<string[]> {
  const stories = await getPublishedStories();
  return stories.map((s) => s.slug).filter(Boolean);
}

/**
 * Extract the Instagram permalink into the canonical form the embed script
 * expects: https://www.instagram.com/{kind}/{shortcode}/. Accepts reel/p/tv
 * URLs and tolerates query strings (utm_source, etc). Returns null when the
 * URL is not a recognisable Instagram post — caller should hide the embed.
 */
export function normalizeInstagramUrl(raw: string): string | null {
  try {
    const u = new URL(raw);
    if (!/instagram\.com$/i.test(u.hostname) && !/(^|\.)instagr\.am$/i.test(u.hostname)) {
      return null;
    }
    const parts = u.pathname.split("/").filter(Boolean);
    // valid kinds: p (post), reel, tv
    const kindIndex = parts.findIndex((p) => ["p", "reel", "reels", "tv"].includes(p));
    if (kindIndex === -1 || !parts[kindIndex + 1]) return null;
    const kind = parts[kindIndex] === "reels" ? "reel" : parts[kindIndex];
    const shortcode = parts[kindIndex + 1];
    return `https://www.instagram.com/${kind}/${shortcode}/`;
  } catch {
    return null;
  }
}
