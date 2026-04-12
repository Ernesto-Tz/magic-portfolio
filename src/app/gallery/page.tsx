import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL } from "@/app/resources";
import { gallery, person } from "@/app/resources/content";
import { JsonLd } from "@/components/JsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: gallery.title,
  description: gallery.description,
  openGraph: {
    title: gallery.title,
    description: gallery.description,
    url: `${baseURL}${gallery.path}`,
    images: [`${baseURL}/og?title=${encodeURIComponent(gallery.title)}`],
  },
};

export default function Gallery() {
  return (
    <div className="w-full max-w-screen-lg">
      <JsonLd
        type="WebPage"
        baseURL={baseURL}
        path={gallery.path}
        title={gallery.title}
        description={gallery.description}
        image={`${baseURL}/og?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <MasonryGrid />
    </div>
  );
}
