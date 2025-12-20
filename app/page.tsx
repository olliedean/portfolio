import PortfolioGrid from "@/components/PortfolioGrid";
import ProfileCard from "@/components/ProfileCard";
import SocialsGrid from "@/components/SocialsGrid";
import ServicesCard from "@/components/ServicesCard";
import ResumeCard from "@/components/ResumeCard";
import ProjectsCard from "@/components/Projects";
import LetsCollabCard from "@/components/LetsCollabCard";
import PresenceCard from "@/components/PresenceCard";
import StatsCard from "@/components/StatsCard";

export default function Home() {
  return (
    <PortfolioGrid>
      <ProfileCard />
      <PresenceCard />
      <SocialsGrid />
      <ServicesCard />
      <ResumeCard />
      <ProjectsCard />
      <LetsCollabCard />
      <StatsCard />
    </PortfolioGrid>
  );
}
