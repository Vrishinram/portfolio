import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <HeroSection />
        <div className="content-wrap">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <SkillsSection />
          <ContactSection />
        </div>
      </main>
    </>
  );
}
