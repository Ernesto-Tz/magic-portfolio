"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/app/utils/formatDate";
import { cn } from "@/lib/utils";

interface PostProps {
  post: any;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block w-full rounded-xl border border-border hover:border-border/80 hover:bg-secondary/40 transition-all duration-200"
    >
      <div
        className={cn(
          "relative flex",
          direction === "row" ? "flex-row" : "flex-col"
        )}
      >
        {post.metadata.image && thumbnail && (
          <div className="relative w-full aspect-video rounded-t-xl overflow-hidden">
            <Image
              src={post.metadata.image}
              alt={"Thumbnail of " + post.metadata.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-1 p-5">
          <h2 className="text-base font-semibold text-balance leading-snug group-hover:text-primary transition-colors font-primary">
            {post.metadata.title}
          </h2>
          <p className="text-xs text-muted-foreground">
            {formatDate(post.metadata.publishedAt, false)}
          </p>
          {post.metadata.tag && (
            <Badge variant="secondary" className="w-fit mt-2 text-xs">
              {post.metadata.tag}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
