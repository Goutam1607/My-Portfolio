import { AvatarSoundProvider } from "@/components/avatar/AvatarSound";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import { isTodo, profile } from "@/data/portfolio";

// Structured data so search engines understand this page is about a person
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: `mailto:${profile.email}`,
  jobTitle: profile.role,
  address: { "@type": "PostalAddress", addressLocality: "Mysuru", addressCountry: "IN" },
  affiliation: { "@type": "CollegeOrUniversity", name: "Vidyavardhaka College of Engineering" },
  sameAs: [profile.github, profile.linkedin].filter((u) => !isTodo(u)),
  ...(isTodo(profile.siteUrl) ? {} : { url: profile.siteUrl }),
};

export default function Home() {
  return (
    <AvatarSoundProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </AvatarSoundProvider>
  );
}
