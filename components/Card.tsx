import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}

export default function Card({ children, className = "", colSpan = 1, rowSpan = 1 }: CardProps) {
  // Map numbers to safe class names to ensure Tailwind includes them
  const colSpanClasses = {
    1: 'col-span-1',
    2: 'col-span-2', 
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  };
  
  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3', 
    4: 'row-span-4',
    5: 'row-span-5',
    6: 'row-span-6',
  };
  
  const colClass = colSpanClasses[colSpan as keyof typeof colSpanClasses] || 'col-span-1';
  const rowClass = rowSpanClasses[rowSpan as keyof typeof rowSpanClasses] || 'row-span-1';
  
  return (
    <div className={`${colClass} ${rowClass} bg-neutral-800/50 rounded-lg border-2 border-white/5 ${className}`}>
      {children}
    </div>
  );
}