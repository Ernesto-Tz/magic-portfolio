import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

function slugify(str: string): string {
  return String(str)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function createHeading(level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const sizeMap: Record<string, string> = {
    h1: "text-3xl font-bold mt-8 mb-4 font-primary",
    h2: "text-2xl font-bold mt-8 mb-3 font-primary",
    h3: "text-xl font-semibold mt-6 mb-2 font-primary",
    h4: "text-lg font-semibold mt-4 mb-2",
    h5: "text-base font-semibold mt-4 mb-2",
    h6: "text-sm font-semibold mt-4 mb-2",
  };

  const Heading = ({ children, ...props }: { children: ReactNode }) => {
    const slug = slugify(children as string);
    const Tag = level;
    return (
      <Tag id={slug} className={cn(sizeMap[level], "group flex items-center gap-2")} {...props}>
        {children}
        <a
          href={`#${slug}`}
          className="opacity-0 group-hover:opacity-50 transition-opacity text-muted-foreground text-sm"
          aria-hidden="true"
        >
          #
        </a>
      </Tag>
    );
  };
  Heading.displayName = level;
  return Heading;
}

function CustomLink({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  if (href.startsWith("/")) {
    return <Link href={href} className="text-primary underline underline-offset-4 hover:text-primary/80" {...props}>{children}</Link>;
  }
  if (href.startsWith("#")) {
    return <a href={href} {...props}>{children}</a>;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:text-primary/80" {...props}>{children}</a>;
}

function CustomImage({ alt, src, ...props }: { alt?: string; src: string } & Record<string, unknown>) {
  if (!src) return null;
  return (
    <div className="relative w-full aspect-video my-6 rounded-xl overflow-hidden border border-border">
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="(max-width: 960px) 100vw, 960px"
        className="object-cover"
      />
    </div>
  );
}

function CustomParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-base leading-[175%] text-foreground/90 mt-2 mb-3">
      {children}
    </p>
  );
}

function CustomInlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-secondary text-foreground px-1.5 py-0.5 rounded text-sm font-code">
      {children}
    </code>
  );
}

function CustomPre(props: React.HTMLAttributes<HTMLPreElement>) {
  const child = props.children as React.ReactElement<{ className?: string; children?: string }>;
  const language = child?.props?.className?.replace("language-", "") ?? "text";

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/50">
        <span className="text-xs text-muted-foreground font-code uppercase tracking-wider">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm font-code leading-relaxed" {...props} />
    </div>
  );
}

// Compatibility wrappers for Once-UI components used directly in MDX posts
function Column({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: unknown }) {
  return <div className={cn("flex flex-col", className as string | undefined)} {...(props as any)}>{children}</div>;
}

function Row({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: unknown }) {
  return <div className={cn("flex flex-row flex-wrap gap-2", className as string | undefined)} {...(props as any)}>{children}</div>;
}

function Table({ data }: { data?: { headers: { content: string; key: string }[]; rows: string[][] } }) {
  if (!data) return null;
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {data.headers.map((h) => (
              <th key={h.key} className="border border-border px-3 py-2 text-left font-semibold bg-secondary/50">
                {h.content}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i} className="even:bg-secondary/20">
              {row.map((cell, j) => (
                <td key={j} className="border border-border px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const components = {
  p: CustomParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: CustomImage as any,
  a: CustomLink as any,
  code: CustomInlineCode as any,
  pre: CustomPre as any,
  // Once-UI MDX component compatibility
  Column: Column as any,
  Row: Row as any,
  Table: Table as any,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
  );
}
