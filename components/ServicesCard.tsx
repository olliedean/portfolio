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
        <Card colSpan={2} rowSpan={1} className="p-3 flex flex-col justify-between text-white overflow-hidden">
            <span className="text-md font-medium">services</span>
            
        </Card>
    );
}