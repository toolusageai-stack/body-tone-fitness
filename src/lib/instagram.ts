import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { InstagramSlot } from "./types/post";

const COLLECTION = "instagram_slots";

export async function getSlotsForPage(page: string): Promise<InstagramSlot[]> {
  const ref = doc(db, COLLECTION, page);
  const snap = await getDoc(ref);
  if (!snap.exists()) return [];
  const data = snap.data() as { slots?: InstagramSlot[]; updatedAt?: Timestamp };
  const slots = Array.isArray(data.slots) ? data.slots : [];
  return slots
    .filter((s) => s && typeof s.url === "string" && s.url.trim() !== "")
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}

/**
 * Normalises an Instagram URL into the canonical embed-ready form:
 * `https://www.instagram.com/{kind}/{shortcode}/`. Returns null when the
 * URL is not a recognised post / reel / tv link.
 */
export function normalizeInstagramUrl(raw: string): string | null {
  try {
    const u = new URL(raw);
    if (
      !/instagram\.com$/i.test(u.hostname) &&
      !/(^|\.)instagr\.am$/i.test(u.hostname)
    ) {
      return null;
    }
    const parts = u.pathname.split("/").filter(Boolean);
    const kindIndex = parts.findIndex((p) =>
      ["p", "reel", "reels", "tv"].includes(p),
    );
    if (kindIndex === -1 || !parts[kindIndex + 1]) return null;
    const kind = parts[kindIndex] === "reels" ? "reel" : parts[kindIndex];
    const shortcode = parts[kindIndex + 1];
    return `https://www.instagram.com/${kind}/${shortcode}/`;
  } catch {
    return null;
  }
}
