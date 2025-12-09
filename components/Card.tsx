import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}

export default function Card({ children, className = "", colSpan = 1, rowSpan = 1 }: CardProps) {
  const gridClasses = `col-span-${colSpan} row-span-${rowSpan}`;
  
  return (
    <div className={`${gridClasses} bg-neutral-800 rounded-lg border border-neutral-700 ${className}`}>
      {children}
    </div>
  );
}