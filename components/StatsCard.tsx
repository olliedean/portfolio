import Image from "next/image";
import Card from "./Card";
import { CgArrowTopRight } from "react-icons/cg";

export default function StatsCard() {
    return (
        <Card colSpan={1} rowSpan={1} className="relative p-3 overflow-hidden md:aspect-square hover:border-white/20 hover:bg-neutral-800">
            <div className="flex relative z-10">
                <span className="text-white font-medium">stats</span>
                <div className="flex-grow" />
                <CgArrowTopRight size={16} className="mt-1 text-neutral-400" />
            </div>
            <Image
                src="/chart-simple-solid-full.svg"
                alt="Stats Icon"
                width={128}
                height={128}
                className="absolute right-2 bottom-2 w-10 h-10 opacity-10 invert pointer-events-none md:static mb-[-4px] mr-5 md:mt-4 md:w-[128px] md:h-[128px] md:opacity-5"
            />
        </Card>
    );
}