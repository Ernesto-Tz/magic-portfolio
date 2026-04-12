import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { about, blog, person, baseURL } from "@/app/resources";
import { formatDate } from "@/app/utils/formatDate";
import { JsonLd } from "@/components/JsonLd";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug || "";
  const post = getPosts(["src", "app", "blog", "posts"]).find((p) => p.slug === slugPath);
  if (!post) return {};
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      images: [post.metadata.image ? `${baseURL}${post.metadata.image}` : `${baseURL}/og?title=${post.metadata.title}`],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const { slug } = await params;
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug || "";
  const post = getPosts(["src", "app", "blog", "posts"]).find((p) => p.slug === slugPath);

  if (!post) notFound();

  const avatars = post.metadata.team?.map((p: { avatar: string }) => ({ src: p.avatar })) || [];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-screen-sm flex flex-col gap-6">
        <JsonLd
          type="BlogPosting"
          baseURL={baseURL}
          path={`${blog.path}/${post.slug}`}
          title={post.metadata.title}
          description={post.metadata.summary}
          datePublished={post.metadata.publishedAt}
          dateModified={post.metadata.publishedAt}
          image={`${baseURL}/og?title=${encodeURIComponent(post.metadata.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Button asChild variant="ghost" size="sm" className="w-fit -ml-2 gap-1 text-muted-foreground">
          <Link href="/blog">
            <ChevronLeft className="h-4 w-4" />
            Posts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-primary">{post.metadata.title}</h1>
        <div className="flex items-center gap-3">
          {avatars.length > 0 && (
            <div className="flex">
              {avatars.map((avatar: { src: string }, i: number) => (
                <Avatar key={i} className="w-6 h-6 border-2 border-background" style={{ marginLeft: i > 0 ? "-6px" : 0 }}>
                  <AvatarImage src={avatar.src} />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </p>
        </div>
        <article className="w-full">
          <CustomMDX source={post.content} />
        </article>
      </div>
    </div>
  );
}
