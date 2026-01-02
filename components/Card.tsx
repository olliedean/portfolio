import { ReactNode, HTMLAttributes } from "react";

type CardProps = Omit<HTMLAttributes<HTMLDivElement>, "className"> & {
  children: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
};

export default function Card({ children, className = "", colSpan = 1, rowSpan = 1, ...rest }: CardProps) {
  // Map numbers to safe class names to ensure Tailwind includes them
  const colSpanMdClasses = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
    4: 'row-span-4',
    5: 'row-span-5',
    6: 'row-span-6',
  };

  const colClass = `col-span-4 ${colSpanMdClasses[colSpan as keyof typeof colSpanMdClasses] || 'md:col-span-1'}`;
  const rowClass = rowSpanClasses[rowSpan as keyof typeof rowSpanClasses] || 'row-span-1';

  return (
    <div
      className={`${colClass} ${rowClass} bg-neutral-800/50 rounded-lg border-2 border-white/5 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}