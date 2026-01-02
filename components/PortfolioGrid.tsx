import { ReactNode } from "react";

interface PortfolioGridProps {
  children: ReactNode;
}

export default function PortfolioGrid({ children }: PortfolioGridProps) {
  return (
    <main className="bg-neutral-900 p-6">
      <div className="md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-7 md:grid-rows-3 gap-4 place-content-center">
        {children}
      </div>
    </main>
  );
}