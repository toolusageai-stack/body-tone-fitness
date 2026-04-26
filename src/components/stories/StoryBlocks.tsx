import Image from "next/image";
import { Info } from "@phosphor-icons/react/dist/ssr";
import type { Block, ImageAlignment } from "@/lib/types/post";
import { renderInline } from "@/lib/inline-md";

/**
 * Renders the block array on the public dark-theme surface. Used by both
 * blog posts and member stories. Supports inline markdown (**bold**, *italic*,
 * [link](url)), image alignment (left/right/center/full), divider rules, and
 * callouts.
 */
export function StoryBlocks({ blocks }: { blocks: Block[] }) {
  // Plain block layout (not flex) so floated images wrap text beside them.
  // Flex children do not honour sibling floats — using `space-y-*` keeps the
  // normal block formatting context intact.
  return (
    <div className="space-y-7">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading": {
      const Tag = block.level === 2 ? "h2" : "h3";
      // h2 always starts a new section: clear any active float so the heading
      // never gets stranded beside an image that's taller than its line.
      const classes =
        block.level === 2
          ? "clear-both pt-2 font-display text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-[2.25rem]"
          : "font-display text-xl font-medium tracking-tight text-white md:text-2xl";
      return <Tag className={classes}>{renderInline(block.text)}</Tag>;
    }
    case "paragraph":
      return (
        <p className="max-w-[68ch] text-[17px] leading-[1.75] text-white/80 md:text-lg md:leading-[1.7]">
          {renderInline(block.text)}
        </p>
      );
    case "image":
      if (!block.url) return null;
      return <ImageBlockView block={block} />;
    case "quote":
      return (
        <blockquote className="max-w-[68ch] border-l-2 border-[var(--color-gold)] pl-5 md:pl-6">
          <p className="font-display text-2xl font-light italic leading-snug text-[var(--color-gold)] md:text-3xl">
            &ldquo;{renderInline(block.text)}&rdquo;
          </p>
          {block.attribution ? (
            <footer className="mt-3 text-xs uppercase tracking-[0.18em] text-white/50 not-italic">
              — {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      );
    case "list": {
      const Tag = block.style === "numbered" ? "ol" : "ul";
      const classes =
        block.style === "numbered"
          ? "list-decimal space-y-2 pl-6 text-white/80 marker:text-[var(--color-gold)]/60"
          : "list-disc space-y-2 pl-6 text-white/80 marker:text-[var(--color-gold)]/60";
      return (
        <Tag className={classes}>
          {block.items.map((item, i) => (
            <li key={i} className="max-w-[68ch] text-[17px] leading-[1.7] md:text-lg">
              {renderInline(item)}
            </li>
          ))}
        </Tag>
      );
    }
    case "divider":
      return (
        <hr
          aria-hidden="true"
          className="my-4 border-0"
          style={{
            height: "1px",
            backgroundImage:
              "linear-gradient(to right, transparent, rgba(201,169,97,0.4), transparent)",
          }}
        />
      );
    case "callout":
      return (
        <aside className="flex max-w-[72ch] gap-4 rounded-2xl border border-[var(--color-gold)]/25 bg-[var(--color-gold-glow)] p-5 md:p-6">
          <span
            aria-hidden="true"
            className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-ink)]/50 text-[var(--color-gold)]"
          >
            <Info size={18} weight="fill" />
          </span>
          <div className="flex min-w-0 flex-col gap-1.5">
            {block.title ? (
              <p className="font-display text-lg font-medium tracking-tight text-white">
                {renderInline(block.title)}
              </p>
            ) : null}
            <p className="text-[16px] leading-relaxed text-white/85 md:text-[17px]">
              {renderInline(block.text)}
            </p>
          </div>
        </aside>
      );
    default:
      return null;
  }
}

const ALIGN_CLASSES: Record<ImageAlignment, string> = {
  // Float behaves like an editorial sidebar — capped so it never dominates
  // the viewport. For big showpiece images the editor should pick `center`
  // or `full`, not a float alignment.
  left: "md:float-left md:mr-7 md:mb-4 md:w-[42%] md:max-w-[26rem] lg:max-w-[32rem]",
  right: "md:float-right md:ml-7 md:mb-4 md:w-[42%] md:max-w-[26rem] lg:max-w-[32rem]",
  center: "mx-auto w-full max-w-4xl",
  full: "w-full max-w-none",
};

function ImageBlockView({
  block,
}: {
  block: { type: "image"; url: string; alt: string; caption?: string; align?: ImageAlignment };
}) {
  const align = block.align ?? "center";
  const wrapperClass = ALIGN_CLASSES[align];

  return (
    <figure className={`flex flex-col gap-2 ${wrapperClass}`}>
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-line-strong)]">
        <Image
          src={block.url}
          alt={block.alt}
          width={1600}
          height={900}
          className="h-auto w-full object-cover"
          sizes={align === "full" ? "100vw" : "(min-width: 768px) 768px, 100vw"}
        />
      </div>
      {block.caption ? (
        <figcaption className="text-xs text-white/45">{block.caption}</figcaption>
      ) : null}
    </figure>
  );
}
