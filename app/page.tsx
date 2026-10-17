import { Achievements } from "@/components/achievements";
import { CommandMenu } from "@/components/command-menu";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Focus } from "@/components/focus";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { QuickConnect } from "@/components/quick-connect";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Focus />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <CommandMenu />
      <QuickConnect />
    </>
  );
}
