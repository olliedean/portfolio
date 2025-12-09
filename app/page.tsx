import PortfolioGrid from "@/components/PortfolioGrid";
import ProfileCard from "@/components/ProfileCard";
import MusicCard from "@/components/PresenceCard";
import SocialsGrid from "@/components/SocialsGrid";
import ServicesCard from "@/components/ServicesCard";
import ResumeCard from "@/components/ResumeCard";
import ProjectsCard from "@/components/Projects";
import LetsCollabCard from "@/components/LetsCollabCard";

export default function Home() {
  return (
    <PortfolioGrid>
      <ProfileCard />
      <MusicCard />
      <SocialsGrid />
      <ServicesCard />
      <ResumeCard />
      <ProjectsCard />
      <LetsCollabCard />
    </PortfolioGrid>
  );
}
