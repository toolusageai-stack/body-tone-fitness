import type { Timestamp } from "firebase/firestore";
import type { Block } from "./post";

export type StoryStatus = "draft" | "published";

export type Story = {
  id: string;
  slug: string;
  memberName: string;
  shortDescription: string;
  instagramUrl: string;
  coverImage?: string;
  coverAlt?: string;
  status: StoryStatus;
  order: number;
  blocks: Block[];
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | null;
};
