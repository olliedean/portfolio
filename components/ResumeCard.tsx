import { FaExternalLinkAlt } from "react-icons/fa";
import Card from "./Card";
import Image from "next/image";
import Link from "next/link";

export default function ResumeCard() {
    return (
        <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Card colSpan={1} rowSpan={1} className="p-3 overflow-hidden aspect-square hover:border-white/20 hover:bg-neutral-800">
                <div className="flex">
                    <span className="text-white font-medium">resume</span>
                    <div className="flex-grow" />
                    <FaExternalLinkAlt size={12} className="mt-1 text-neutral-400" />
                </div>
                <Image
                    src="/resume.svg"
                    alt="Resume Icon"
                    width={128}
                    height={128}
                    className="mt-4 opacity-5 invert"
                />
            </Card>
        </Link>
    );
}