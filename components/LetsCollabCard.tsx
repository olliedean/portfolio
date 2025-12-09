import { FaArrowRight } from "react-icons/fa";
import Card from "./Card";
import Link from "next/link";

export default function LetsCollabCard() {
    return (
        <Link href="mailto:olliedean@kakao.com" target="_blank" rel="noopener noreferrer" className="col-span-3">
            <Card colSpan={3} rowSpan={1} className="hover:border-white/20 hover:bg-neutral-800 overflow-hidden">
                <div className="p-3 flex flex-row gap-8">
                    <div className="flex-grow">
                        <span className="text-white text-md font-semibold mb-2">let's collab!</span><br />
                        <span className="text-neutral-400 text-sm">
                            i'm always open to new opportunities and collaborations. whether you have a project in mind or just want to chat about tech, feel free to reach out!
                        </span>
                    </div>
                    <button className="text-sm ml-auto bg-white/4 border-white/5 border-2 text-white font-semibold py-1 rounded self-center w-full">
                        lets talk <FaArrowRight className="inline ml-2" />
                    </button>
                </div>
            </Card>
        </Link>
    );
}