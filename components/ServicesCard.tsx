import Card from "./Card";
import MarqueeRow from "./MarqueeRow";

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
        </Card>
    );
}