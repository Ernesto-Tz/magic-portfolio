import { ProjectCard } from "@/components";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";

interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  coverImage: unknown;
  images: unknown[];
  link?: string;
}

interface ProjectsProps {
  projects?: SanityProject[];
  range?: [number, number?];
}

export function Projects({ projects = [], range }: ProjectsProps) {
  const displayed = range
    ? projects.slice(range[0] - 1, range[1] ?? projects.length)
    : projects;

  return (
    <div className="w-full flex flex-col gap-12 mb-10 px-4">
      {displayed.map((project, index) => {
        const imageUrls = (project.images ?? [])
          .filter(Boolean)
          .map((img) => urlFor(img as SanityImageSource).width(960).url());

        return (
          <ProjectCard
            priority={index < 2}
            key={project._id}
            href={`/work/${project.slug}`}
            images={imageUrls}
            title={project.title}
            description={project.summary}
            content=""
            avatars={[]}
            link={project.link || ""}
          />
        );
      })}
    </div>
  );
}
