import Card from "./Card";

export default function ProjectsCard() {
    return (
        <Card colSpan={3} rowSpan={2}>
            <div className="p-3">
                <span className="text-white text-md font-semibold mb-2">projects i've worked on</span>
            </div>
        </Card>
    );
}