"use client";

import { useState } from "react";
import { FaArrowRight, FaICursor } from "react-icons/fa";
import Card from "./Card";
import Modal from "./Modal";
import { BsCursor } from "react-icons/bs";
import { PiCursorClickFill } from "react-icons/pi";

export default function LetsCollabCard() {
    const [open, setOpen] = useState(false);

    return (
        <>
        <Card
            colSpan={3}
            rowSpan={1}
            role="button"
            tabIndex={0}
            onClick={() => setOpen(true)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(true);
                }
            }}
            className="hover:border-white/20 hover:bg-neutral-800 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-0"
        >
            <div className="p-3 flex flex-row gap-8">
                <div className="flex-grow">
                    <div className="flex">
                        <span className="text-white text-md font-semibold mb-2">let's collab!</span><br />
                        <PiCursorClickFill size={12} className="ml-auto text-neutral-400" />
                    </div>
                    <span className="text-neutral-400 text-sm mt-2">
                        i'm always open to new opportunities and collaborations. whether you have a project in mind or just want to chat about tech, feel free to reach out!
                    </span>
                </div>
            </div>
        </Card>

        <Modal open={open} onClose={() => setOpen(false)}>
            ttt
        </Modal>
        </>
    );
}