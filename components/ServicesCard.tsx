"use client";

import Card from "./Card";
import MarqueeRow from "./MarqueeRow";

const services = [
  "TypeScript",
  "JavaScript",
  "Golang",
  "PHP",
  "Kotlin",
  "Java",
  "React",
  "Next.js",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Vercel",
  "APIs",
];

export default function ServicesCard() {
  return (
    <Card colSpan={2} rowSpan={1} className="p-3 text-white overflow-hidden">
      <div className="flex mb-2">
        <span className="text-md font-medium">services</span>
        <div className="flex-1" />
        <span className="text-xs text-neutral-400">stacks i work with</span>
      </div>

      <div className="relative">
        <MarqueeRow
          items={services}
          colorClass="text-gray-300"
          direction="left"
          duration={18}
          paddingTop="pt-0"
        />
        <MarqueeRow
          items={services}
          colorClass="text-gray-100"
          direction="right"
          duration={16}
          paddingTop="pt-1"
        />
        <MarqueeRow
          items={services}
          colorClass="text-gray-300"
          direction="left"
          duration={20}
          paddingTop="pt-1"
        />
      </div>
    </Card>
  );
}