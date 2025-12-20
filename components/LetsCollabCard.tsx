"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Card from "./Card";
import Modal from "./Modal";

export default function LetsCollabCard() {
    const [open, setOpen] = useState(false);

    return (
        <>
        <button
            type="button"
            className="col-span-3 text-left cursor-pointer"
            onClick={() => setOpen(true)}
        >
            <Card colSpan={3} rowSpan={1} className="hover:border-white/20 hover:bg-neutral-800 overflow-hidden">
                <div className="p-3 flex flex-row gap-8">
                    <div className="flex-grow">
                        <span className="text-white text-md font-semibold mb-2">let's collab!</span><br />
                        <span className="text-neutral-400 text-sm">
                            i'm always open to new opportunities and collaborations. whether you have a project in mind or just want to chat about tech, feel free to reach out!
                        </span>
                    </div>
                    <span className="text-sm ml-auto bg-white/4 border-white/5 border-2 text-white font-semibold py-1 px-3 rounded self-center">
                        lets talk <FaArrowRight className="inline ml-2" />
                    </span>
                </div>
            </Card>
        </button>

        <Modal open={open} onClose={() => setOpen(false)}>
            ttt
        </Modal>
        </>
    );
}