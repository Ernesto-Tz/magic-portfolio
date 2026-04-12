import Image from "next/image";
import Link from "next/link";
import { Globe, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TableOfContents from "@/components/about/TableOfContents";
import { JsonLd } from "@/components/JsonLd";
import { baseURL } from "@/app/resources";
import { person, about, social } from "@/app/resources/content";
import { Metadata } from "next";
import React from "react";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  x: Twitter,
};

export const metadata: Metadata = {
  title: about.title,
  description: about.description,
  openGraph: {
    title: about.title,
    description: about.description,
    url: `${baseURL}${about.path}`,
    images: [`${baseURL}/og?title=${encodeURIComponent(about.title)}`],
  },
};

function SectionDivider({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-code text-[0.65rem] tracking-[0.25em] text-primary/70 whitespace-nowrap">
        {number}
      </span>
      <span className="font-code text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground/50 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export default function About() {
  const structure = [
    { title: about.intro.title, display: about.intro.display, items: [] },
    { title: about.work.title, display: about.work.display, items: about.work.experiences.map((e: { company: string }) => e.company) },
    { title: about.studies.title, display: about.studies.display, items: about.studies.institutions.map((i: { name: string }) => i.name) },
    { title: about.technical.title, display: about.technical.display, items: person.skills.map((s: { title: string }) => s.title) },
  ];

  return (
    <div className="w-full max-w-screen-md">
      <JsonLd
        type="WebPage"
        baseURL={baseURL}
        path={about.path}
        title={about.title}
        description={about.description}
        image={`${baseURL}/og?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Fixed ToC sidebar */}
      {about.tableOfContent.display && (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 pl-6 gap-8 hidden lg:flex flex-col">
          <TableOfContents structure={structure} about={about} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-8">
        {/* Sticky avatar column */}
        {about.avatar.display && (
          <div className="sm:sticky sm:top-20 flex flex-col items-center gap-3 min-w-[160px] px-4 pb-8 self-start">
            <Avatar className="w-24 h-24">
              <AvatarImage src={person.avatar} alt={person.name} />
              <AvatarFallback>{person.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              {person.location}
            </div>
            {person.languages.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center">
                {person.languages.map((lang: string) => (
                  <Badge key={lang} variant="secondary" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main content */}
        <div className="flex-[9] max-w-[640px] flex flex-col">
          {/* Hero */}
          <div id={about.intro.title} className="min-h-[160px] flex flex-col justify-center mb-8">
            <h1 className="text-4xl font-bold font-primary">{person.name}</h1>
            <p className="text-lg text-primary/70 mt-1">{person.role}</p>
            {social.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {social.map((item: { name: string; link?: string; icon: string }) => {
                  if (!item.link) return null;
                  const Icon = iconMap[item.icon] ?? Mail;
                  return (
                    <React.Fragment key={item.name}>
                      <Button asChild variant="outline" size="sm" className="hidden sm:flex gap-1.5 text-xs">
                        <Link href={item.link} target="_blank" rel="noopener noreferrer">
                          <Icon className="h-3.5 w-3.5" />
                          {item.name}
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="icon" className="sm:hidden w-8 h-8">
                        <Link href={item.link} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                          <Icon className="h-4 w-4" />
                        </Link>
                      </Button>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>

          {/* Intro */}
          {about.intro.display && (
            <>
              <SectionDivider number="01" label={about.intro.title} />
              <div className="text-base leading-relaxed mb-10 flex flex-col gap-4">
                {about.intro.description}
              </div>
            </>
          )}

          {/* Work */}
          {about.work.display && (
            <>
              <SectionDivider number="02" label={about.work.title} />
              <h2 id={about.work.title} className="text-2xl font-bold font-primary mb-4">
                {about.work.title}
              </h2>
              <div className="flex flex-col gap-8 mb-10">
                {about.work.experiences.map((exp: { company: string; role: string; timeframe: string; achievements: React.ReactNode[] }, i: number) => (
                  <div key={`${exp.company}-${i}`} className="flex flex-col">
                    <div className="flex justify-between items-end mb-1 flex-wrap gap-1">
                      <span id={exp.company} className="text-base font-semibold">
                        {exp.role}
                      </span>
                      <span className="text-xs text-muted-foreground">{exp.timeframe}</span>
                    </div>
                    <span className="text-sm text-primary/70 mb-3">{exp.company}</span>
                    <ul className="flex flex-col gap-3">
                      {exp.achievements.map((achievement: React.ReactNode, j: number) => (
                        <li key={j} className="text-sm text-foreground/80 leading-relaxed">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Studies */}
          {about.studies.display && (
            <>
              <SectionDivider number="03" label={about.studies.title} />
              <h2 id={about.studies.title} className="text-2xl font-bold font-primary mb-4">
                {about.studies.title}
              </h2>
              <div className="flex flex-col gap-6 mb-10">
                {about.studies.institutions.map((inst: { name: string; description: string; timeframe: string }, i: number) => (
                  <div key={`${inst.name}-${i}`} className="flex flex-col gap-1">
                    <div className="flex justify-between items-end flex-wrap gap-1">
                      <span id={inst.name} className="text-base font-semibold">
                        {inst.description}
                      </span>
                      <span className="text-xs text-muted-foreground">{inst.timeframe}</span>
                    </div>
                    <span className="text-sm text-primary/70">{inst.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Technical skills */}
          {about.technical.display && (
            <>
              <SectionDivider number="04" label={about.technical.title} />
              <h2 id={about.technical.title} className="text-2xl font-bold font-primary mb-8">
                {about.technical.title}
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-10">
                {person.skills.map((skill: { title: string; src: string; href: string }, i: number) => (
                  <Link
                    key={`${skill.title}-${i}`}
                    href={skill.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-secondary transition-colors"
                    title={skill.title}
                  >
                    <Image
                      src={skill.src}
                      alt={skill.title}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-xs text-muted-foreground text-center">{skill.title}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
