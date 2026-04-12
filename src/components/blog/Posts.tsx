import { getPosts } from "@/app/utils/utils";
import Post from "./Post";
import { cn } from "@/lib/utils";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  direction,
}: PostsProps) {
  const allBlogs = getPosts(["src", "app", "blog", "posts"]);

  const sortedBlogs = allBlogs.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  const gridCols =
    columns === "2"
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === "3"
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-1";

  if (displayedBlogs.length === 0) return null;

  return (
    <div className={cn("grid gap-3 w-full mb-10", gridCols)}>
      {displayedBlogs.map((post) => (
        <Post
          key={post.slug}
          post={post}
          thumbnail={thumbnail}
          direction={direction}
        />
      ))}
    </div>
  );
}
