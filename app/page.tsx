import PortfolioGrid from "@/components/PortfolioGrid";
import ProfileCard from "@/components/ProfileCard";
import MusicCard from "@/components/PresenceCard";
import SocialsGrid from "@/components/SocialsGrid";
import ServicesCard from "@/components/ServicesCard";

export default function Home() {
  return (
    <PortfolioGrid>
      <ProfileCard />
      <MusicCard />
      <SocialsGrid />
      <ServicesCard />
    </PortfolioGrid>
  );
}
