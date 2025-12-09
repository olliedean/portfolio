import Card from "./Card";

const services = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Database Management",
    "Cloud Services",
    "API Integration",
    "E-commerce Solutions",
    "SEO Optimization",
    "Content Management Systems",
    "Cybersecurity",
    "Performance Optimization",
    "Technical Support"
];

export default function ServicesCard() {
    return (
        <Card colSpan={1} rowSpan={1} className="p-3 aspect-square flex flex-col justify-between text-white overflow-hidden">
            <span className="text-md font-medium">services</span>

            {(() => {
                const MarqueeRow = ({
                  items,
                  colorClass,
                  direction = "left",
                  duration = 16,
                  paddingTop = "pt-1",
                }: {
                  items: string[];
                  colorClass: string;
                  direction?: "left" | "right";
                  duration?: number;
                  paddingTop?: string;
                }) => (
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

                return (
                  <div className="h-full flex flex-col gap-2">
                    <MarqueeRow
                      items={services}
                      colorClass="text-neutral-300"
                      direction="left"
                      duration={32}
                      paddingTop=""
                    />
                    <MarqueeRow
                      items={services}
                      colorClass="text-neutral-400"
                      direction="right"
                      duration={38}
                      paddingTop=""
                    />
                    <MarqueeRow
                      items={services}
                      colorClass="text-neutral-500"
                      direction="left"
                      duration={43}
                      paddingTop=""
                    />
                  </div>
                );
            })()}
        </Card>
    );
}