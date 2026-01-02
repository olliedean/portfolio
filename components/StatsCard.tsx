import Image from "next/image";
import Card from "./Card";
import { CgArrowTopRight } from "react-icons/cg";

export default function StatsCard() {
    return (
        <Card colSpan={1} rowSpan={1} className="p-3 overflow-hidden aspect-square hover:border-white/20 hover:bg-neutral-800">
            <div className="flex">
                <span className="text-white font-medium">stats</span>
                <div className="flex-grow" />
                <CgArrowTopRight size={18} className="mt-1 text-neutral-400" />
            </div>
            <Image
                src="/chart-simple-solid-full.svg"
                alt="Resume Icon"
                width={128}
                height={128}
                className="mt-4 opacity-5 invert"
            />
        </Card>
    );
}