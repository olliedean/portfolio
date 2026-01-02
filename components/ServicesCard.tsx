import Card from "./Card";

export default function ServicesCard() {
    return (
        <Card colSpan={2} rowSpan={1} className="p-3 flex flex-col justify-between text-white overflow-hidden">
            <span className="text-md font-medium">services</span>
            
        </Card>
    );
}