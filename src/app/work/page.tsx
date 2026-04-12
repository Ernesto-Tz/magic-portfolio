import { baseURL } from "@/app/resources";
import { about, person, work } from "@/app/resources/content";
import { Projects } from "@/components/work/Projects";
import { JsonLd } from "@/components/JsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: work.title,
  description: work.description,
  openGraph: {
    title: work.title,
    description: work.description,
    url: `${baseURL}${work.path}`,
    images: [`${baseURL}/og?title=${encodeURIComponent(work.title)}`],
  },
};

export default function Work() {
  return (
    <div className="w-full max-w-screen-md">
      <JsonLd
        type="WebPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`${baseURL}/og?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Projects />
    </div>
  );
}
