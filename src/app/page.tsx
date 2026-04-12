import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Reveal } from "@/components/Reveal";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { JsonLd } from "@/components/JsonLd";
import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";
import { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
  openGraph: {
    title: home.title,
    description: home.description,
    url: `${baseURL}${home.path}`,
    images: [home.image],
  },
};

function SectionMarker({ number, label }: { number: string; label?: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="font-code text-[0.65rem] tracking-[0.25em] text-primary whitespace-nowrap">
        {number}
      </span>
      {label && (
        <span className="font-code text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground/40 whitespace-nowrap">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full max-w-screen-md flex flex-col gap-20 items-center pb-20">
      <JsonLd
        type="WebPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* 01 · HERO */}
      <div className="w-full flex flex-col gap-6 pt-8">
        <SectionMarker number="01" label="Introduction" />

        <Reveal translateY={4}>
          <p className="font-code text-[0.58rem] tracking-[0.22em] uppercase text-accent mb-3">
            {person.role}
          </p>
          <h1
            className="text-5xl sm:text-6xl tracking-[-0.025em] text-balance font-primary"
            style={{ lineHeight: "1.0" }}
          >
            <span style={{ fontWeight: 700 }}>Hello, I&apos;m </span>
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "hsl(var(--primary))" }}>Ernesto</em>
          </h1>
        </Reveal>

        <Reveal translateY={8} delay={0.2}>
          <p className="text-base text-muted-foreground max-w-[48ch] leading-relaxed text-balance">
            {home.subline}
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild className="rounded-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={home.contactCta.link}>
                <Mail className="h-4 w-4" />
                {home.contactCta.title}
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full gap-2">
              <Link href={about.path}>
                {about.avatar.display && (
                  <Avatar className="w-5 h-5 -ml-1">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>{person.firstName[0]}</AvatarFallback>
                  </Avatar>
                )}
                {about.title}
              </Link>
            </Button>
          </div>
        </Reveal>

        {home.featured.display && (
          <Reveal delay={0.5}>
            <Link
              href={home.featured.href}
              className="flex items-center gap-3 w-full bg-card border border-border rounded-md px-4 py-3 hover:bg-secondary transition-colors group"
              style={{ borderLeftWidth: "2px", borderLeftColor: "hsl(var(--accent))" }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: "hsl(var(--accent))",
                  boxShadow: "0 0 6px hsl(var(--accent) / 0.6)",
                }}
              />
              <span className="font-code text-[0.55rem] tracking-[0.08em] text-muted-foreground">
                {home.featured.title}
              </span>
              <span className="ml-auto text-muted-foreground/40 group-hover:text-muted-foreground transition-colors text-xs">
                →
              </span>
            </Link>
          </Reveal>
        )}
      </div>

      {/* 02 · SKILLS */}
      <div className="w-full flex flex-col gap-6">
        <SectionMarker number="02" label="Skills & Tools" />
        <Reveal translateY={8} delay={0.1}>
          <div className="grid grid-cols-6 sm:grid-cols-6 gap-4">
            {person.skills.slice(0, 12).map((skill) => (
              <Link
                key={skill.title}
                href={skill.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 rounded-lg hover:bg-secondary transition-colors"
                title={skill.title}
              >
                <Image
                  src={skill.src}
                  alt={skill.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>

      {/* 03 · SELECTED WORK */}
      <div className="w-full flex flex-col gap-6">
        <SectionMarker number="03" label={home.projectsSectionTitle} />
        <Reveal translateY={16} delay={0.15}>
          <Projects range={[1, 2]} />
        </Reveal>
      </div>

      {/* 04 · FROM THE BLOG */}
      {routes["/blog"] && (
        <div className="w-full flex flex-col gap-6">
          <SectionMarker number="04" label={home.blogSectionTitle} />
          <Posts range={[1, 2]} columns="2" />
        </div>
      )}
    </div>
  );
}
