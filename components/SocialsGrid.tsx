import React from "react";
import { FaDiscord, FaExternalLinkAlt, FaGithub } from "react-icons/fa";

type Social = {
    label: string;
    handle: string;
    href: string;
    icon: React.ReactNode;
};

const socials: Social[] = [
    {
        label: "discord",
        handle: "olliedean",
        href: "https://discord.com/users/olliedean",
        icon: <FaDiscord />,
    },
    {
        label: "github",
        handle: "olliedean",
        href: "https://github.com/olliedean",
        icon: <FaGithub />,
    },
];

export default function SocialsGrid() {
    return (
        <section aria-label="social links" className="grid grid-cols-1 col-span-2 gap-3">
            {socials.map((s) => (
                <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-xl border-2 border-white/10 bg-neutral-800/50 p-3 text-zinc-200 hover:border-white/20 hover:bg-neutral-800"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-200">
                            {s.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{s.handle}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaExternalLinkAlt />
                    </div>
                </a>
            ))}
        </section>
    );
}