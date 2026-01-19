import { ReactNode } from "react";

interface PortfolioGridProps {
  children: ReactNode;
  autoRows?: boolean;
}

export default function PortfolioGrid({ children, autoRows = false }: PortfolioGridProps) {
  const rowsClass = autoRows ? "md:auto-rows-min" : "md:grid-rows-[repeat(3,minmax(0,1fr))]";
  return (
    <main className="bg-neutral-900 p-6">
      <div className={`md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-7 ${rowsClass} gap-4 place-content-center`}>
        {children}
      </div>
    </main>
  );
}