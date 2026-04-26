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
import type { Block, Post, PostStatus } from "./types/post";

const POSTS = "posts";

function docToPost(id: string, data: Record<string, unknown>): Post {
  return {
    id,
    title: (data.title as string) ?? "",
    slug: (data.slug as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    coverImage: (data.coverImage as string) ?? "",
    coverAlt: (data.coverAlt as string) ?? "",
    status: ((data.status as PostStatus) ?? "draft"),
    tags: (data.tags as string[]) ?? [],
    blocks: ((data.blocks as Block[]) ?? []).filter(isKnownBlock),
    author: (data.author as string) ?? "",
    createdAt: (data.createdAt as Timestamp) ?? Timestamp.now(),
    updatedAt: (data.updatedAt as Timestamp) ?? Timestamp.now(),
    publishedAt: (data.publishedAt as Timestamp | null) ?? null,
  };
}

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

export async function getPublishedPosts(): Promise<Post[]> {
  const q = query(
    collection(db, POSTS),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToPost(d.id, d.data()));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(
    collection(db, POSTS),
    where("slug", "==", slug),
    where("status", "==", "published"),
    limit(1),
  );
  const snap = await getDocs(q);
  const first = snap.docs[0];
  if (!first) return null;
  return docToPost(first.id, first.data());
}

export async function getPublishedSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => p.slug).filter(Boolean);
}
