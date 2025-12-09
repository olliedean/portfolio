interface MarqueeRowProps {
  items: string[];
  colorClass: string;
  direction?: "left" | "right";
  duration?: number;
  paddingTop?: string;
}

export default function MarqueeRow({
  items,
  colorClass,
  direction = "left",
  duration = 16,
  paddingTop = "pt-1",
}: MarqueeRowProps) {
  return (
    <div className={`marquee ${paddingTop}`}>
      <div
        className="track"
        data-direction={direction}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...Array(2)].map((_, dupIdx) =>
          items.map((service) => (
            <span
              key={`${direction}-${dupIdx}-${service}`}
              className={`text-sm ${colorClass}`}
            >
              {service}
            </span>
          ))
        )}
      </div>
    </div>
  );
}