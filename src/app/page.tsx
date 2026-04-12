import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Row,
  LogoCloud,
} from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

interface SectionMarkerProps {
  number: string;
  label?: string;
}

function SectionMarker({ number, label }: SectionMarkerProps) {
  return (
    <Flex gap="12" vertical="center" fillWidth style={{ marginBottom: "0.5rem" }}>
      <span
        style={{
          fontFamily: "var(--font-code)",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          color: "var(--brand-on-background-weak)",
          opacity: 0.7,
          whiteSpace: "nowrap",
        }}
      >
        {number}
      </span>
      {label && (
        <span
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "var(--neutral-on-background-weak)",
            opacity: 0.5,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "var(--neutral-alpha-weak)",
        }}
      />
    </Flex>
  );
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="80" horizontal="center" style={{ paddingBottom: "var(--static-space-80)" }}>
      <Schema
        as="webPage"
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

      {/* ── 01 · HERO ──────────────────────────────────────── */}
      <Column fillWidth paddingTop="xl" gap="l">
        <SectionMarker number="01" label="Introduction" />

        <RevealFx translateY="4" fillWidth>
          <Heading
            wrap="balance"
            variant="display-strong-l"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.05" }}
          >
            {home.headline}
          </Heading>
        </RevealFx>

        <RevealFx translateY="8" delay={0.2} fillWidth>
          <Text
            wrap="balance"
            onBackground="accent-weak"
            variant="body-default-xl"
            style={{ maxWidth: "48ch", lineHeight: "1.7" }}
          >
            {home.subline}
          </Text>
        </RevealFx>

        <RevealFx delay={0.4} fillWidth>
          <Flex gap="16" wrap paddingTop="8">
            <Button
              href={home.contactCta.link}
              prefixIcon={home.contactCta.icon}
              label={home.contactCta.title}
              size="m"
              variant="secondary"
              data-border="rounded"
            />
            <Button
              href={about.path}
              variant="secondary"
              size="m"
              arrowIcon
              data-border="rounded"
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </Flex>
        </RevealFx>
      </Column>

      {/* ── 02 · SKILLS ────────────────────────────────────── */}
      <Column fillWidth gap="l">
        <SectionMarker number="02" label="Skills & Tools" />
        <RevealFx translateY="8" delay={0.1}>
          <LogoCloud
            logos={person.skills.map((skill) => ({
              iconSrc: skill.src,
              size: "xl",
              wordmark: false,
              alt: skill.title,
            }))}
            columns="6"
            mobileColumns="3"
            gap="16"
            limit={12}
          />
        </RevealFx>
      </Column>

      {/* ── 03 · SELECTED WORK ─────────────────────────────── */}
      <Column fillWidth gap="l">
        <SectionMarker number="03" label={home.projectsSectionTitle} />
        <RevealFx translateY="16" delay={0.15}>
          <Projects range={[1, 2]} />
        </RevealFx>
      </Column>

      {/* ── 04 · FROM THE BLOG ─────────────────────────────── */}
      {routes["/blog"] && (
        <Column fillWidth gap="l">
          <SectionMarker number="04" label={home.blogSectionTitle} />
          <Flex fillWidth paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Column>
      )}

      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
