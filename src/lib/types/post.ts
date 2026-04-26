import type { Timestamp } from "firebase/firestore";

export type PostStatus = "draft" | "published";

export type HeadingBlock = {
  type: "heading";
  level: 2 | 3;
  text: string;
};

export type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type ImageAlignment = "left" | "right" | "center" | "full";

export type ImageBlock = {
  type: "image";
  url: string;
  alt: string;
  caption?: string;
  align?: ImageAlignment;
};

export type QuoteBlock = {
  type: "quote";
  text: string;
  attribution?: string;
};

export type ListBlock = {
  type: "list";
  style: "bullet" | "numbered";
  items: string[];
};

export type DividerBlock = {
  type: "divider";
};

export type CalloutBlock = {
  type: "callout";
  text: string;
  title?: string;
};

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | QuoteBlock
  | ListBlock
  | DividerBlock
  | CalloutBlock;

export type BlockType = Block["type"];

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  status: PostStatus;
  tags: string[];
  blocks: Block[];
  author: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | null;
};

export type InstagramSlot = {
  id: string;
  position: number;
  url: string;
  caption?: string;
};

export type InstagramSlotsDoc = {
  page: string;
  slots: InstagramSlot[];
  updatedAt: Timestamp;
};
