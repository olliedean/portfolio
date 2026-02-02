import { FaExternalLinkAlt } from "react-icons/fa";
import Card from "./Card";

type Project = {
    name: string;
    link: string;
    description: string;
    tags: string[];
};

const projects: Project[] = [
    {
        name: "lincoln pride website",
        link: "https://lincolnpride.co.uk",
        description: "i worked on the backend and UI for the lincoln pride website.",
        tags: ["PHP", "Stripe", "jQuery"],
    },
    {
        name: "pulse",
        link: "https://ollie.cool/pulse",
        description: "a popular music bot for discord",
        tags: ["Kotlin", "Discord", "Lavalink", "JDA"],
    },
    {
        name: "upbeat staff panel",
        link: "https://upbeat.pw/staff",
        description: "i worked on the staff panel for upbeat, a popular internet radio station.",
        tags: ["PHP", "Auth", "jQuery"],
    },
];

export default function ProjectsCard() {
    return (
        <Card colSpan={3} rowSpan={2} className="p-3 text-white">
            <div className="flex mb-2">
                <span className="text-md font-medium">projects</span>
                <div className="flex-1" />
                {/*<a href="https://github.com/olliedean" target="_blank" className="text-xs text-neutral-400 hover:text-white">see more</a> */}
            </div>

            <div className="space-y-3 overflow-y-auto max-h-64 md:max-h-[16rem] pr-4 custom-scrollbar">
                {projects.map((p) => (
                    <a
                        key={p.name}
                        href={p.link}
                        target="_blank"
                        className="group relative block rounded-lg border border-white/10 bg-neutral-800/60 p-4 overflow-hidden transition-all hover:bg-neutral-700/50 hover:border-white/20 hover:translate-y-[1px]"
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-purple-700" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold">{p.name}</span>
                                <span className="text-xs text-neutral-400 group-hover:text-white">
                                    <FaExternalLinkAlt />
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-neutral-300 leading-relaxed">{p.description}</p>
                            <div className="mt-1 flex flex-wrap gap-2">
                                {p.tags.map((t) => (
                                    <span key={`${p.name}-${t}`} className="text-[10px] px-2 py-1 rounded-full bg-neutral-900/60 border border-white/10">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </Card>
    );
}