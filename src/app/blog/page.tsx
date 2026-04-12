import { baseURL } from "@/app/resources";
import { blog, person } from "@/app/resources/content";
import { Posts } from "@/components/blog/Posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: blog.title,
  description: blog.description,
  openGraph: {
    title: blog.title,
    description: blog.description,
    url: `${baseURL}${blog.path}`,
  },
};

export default function Blog() {
  return (
    <div className="w-full max-w-screen-md flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-primary">{blog.title}</h1>
      <Posts range={[1]} thumbnail columns="1" />
    </div>
  );
}
