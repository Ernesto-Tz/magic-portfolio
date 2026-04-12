import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { person, social } from "@/app/resources/content";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  x: Twitter,
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Spacer on mobile so content isn't hidden behind fixed bottom nav */}
      <div className="h-20 sm:hidden" />
      <footer className="w-full flex justify-center px-2 py-2">
        <div className="w-full max-w-screen-md flex items-center justify-between px-4 py-2">
          <p className="text-xs text-muted-foreground">
            © {currentYear} /{" "}
            <span className="text-foreground">{person.name}</span>
            {" "}/ Build your portfolio with{" "}
            <Link
              href="https://once-ui.com/templates/magic-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Once UI
            </Link>
          </p>
          <div className="flex gap-1">
            {social.map((item) => {
              if (!item.link) return null;
              const Icon = iconMap[item.icon] ?? Mail;
              return (
                <Button
                  key={item.name}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 text-muted-foreground hover:text-foreground"
                >
                  <Link href={item.link} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
};
