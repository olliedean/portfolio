import PortfolioGrid from "@/components/PortfolioGrid";
import ProfileCard from "@/components/ProfileCard";
import MusicCard from "@/components/PresenceCard";

export default function Home() {
  return (
    <PortfolioGrid>
      <ProfileCard />
      <MusicCard />
    </PortfolioGrid>
  );
}
