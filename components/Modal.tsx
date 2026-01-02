"use client";

import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
    children: React.ReactNode;
    open?: boolean;
    onClose?: () => void;
};

export default function Modal({ children, open = false, onClose = () => {} }: ModalProps) {
    const [isMounted, setIsMounted] = useState(open);
    const [isVisible, setIsVisible] = useState(open);

    useEffect(() => {
        if (open) {
            const raf = requestAnimationFrame(() => {
                setIsMounted(true);
                setIsVisible(true);
            });
            return () => cancelAnimationFrame(raf);
        }

        if (isMounted) {
            let timer: ReturnType<typeof setTimeout> | undefined;
            const raf = requestAnimationFrame(() => {
                setIsVisible(false);
                timer = setTimeout(() => {
                    setIsMounted(false);
                }, 300);
            });
            return () => {
                cancelAnimationFrame(raf);
                if (timer) clearTimeout(timer);
            };
        }
        return undefined;
    }, [open, isMounted]);

    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
            onClick={onClose}
        >
            <div
                className={`bg-neutral-800 rounded-lg border-2 p-3 border-white/5 max-w-lg w-full transform transition-all duration-300 ease-in-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    aria-label="Close modal"
                    className="text-neutral-400 hover:text-white cursor-pointer float-right"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
                {children}
            </div>
        </div>
    );
}