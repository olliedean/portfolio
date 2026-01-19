import { FaExternalLinkAlt } from "react-icons/fa";
import Card from "./Card";
import Image from "next/image";
import Link from "next/link";

export default function ResumeCard() {
    return (
        <Link href="https://ollie.cool/resume" target="_blank" rel="noopener noreferrer" className="col-span-4 md:col-span-1">
            <Card colSpan={1} rowSpan={1} className="relative p-3 overflow-hidden md:aspect-square hover:border-white/20 hover:bg-neutral-800">
                <div className="flex relative z-10">
                    <span className="text-white font-medium">resume</span>
                    <div className="flex-grow" />
                    <FaExternalLinkAlt size={12} className="mt-1 text-neutral-400" />
                </div>
                <Image
                    src="/resume.svg"
                    alt="Resume Icon"
                    width={128}
                    height={128}
                    className="absolute right-2 bottom-2 w-10 h-10 opacity-10 invert pointer-events-none md:static mb-[-4px] mr-5 md:mt-4 md:w-[128px] md:h-[128px] md:opacity-5"
                />
            </Card>
        </Link>
    );
}