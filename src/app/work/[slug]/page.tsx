import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { about, work, person, baseURL } from "@/app/resources";
import { formatDate } from "@/app/utils/formatDate";
import { JsonLd } from "@/components/JsonLd";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts(["src", "app", "work", "projects"]).find((p) => p.slug === slug);
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

export default async function WorkPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPosts(["src", "app", "work", "projects"]).find((p) => p.slug === slug);

  if (!post) notFound();

  const avatars = post.metadata.team?.map((p: { avatar: string }) => ({ src: p.avatar })) || [];
  const techSkills = person.skills.filter(
    (skill: { title: string; projects?: string[] }) =>
      Array.isArray(skill.projects) && skill.projects.includes(post.slug)
  );

  return (
    <div className="w-full max-w-screen-sm flex flex-col gap-6">
      <JsonLd
        type="WebPage"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        image={`${baseURL}/og?title=${encodeURIComponent(post.metadata.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Button asChild variant="ghost" size="sm" className="w-fit -ml-2 gap-1 text-muted-foreground">
        <Link href="/work">
          <ChevronLeft className="h-4 w-4" />
          Work
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
      {techSkills.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="text-2xl font-bold font-primary">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {techSkills.map((skill: { title: string }, index: number) => (
              <Badge key={`${skill.title}-${index}`} variant="secondary">
                {skill.title}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
