"use client"

import { useEffect, useRef, useState } from "react"

type Shortcut = {
    key: string
    action: string
}

type InfoTooltipProps = {
    title?: string
    shortcuts: Shortcut[]
}

function VideoInfoTooltip({
    title = "Keyboard controls",
    shortcuts,
}: InfoTooltipProps) {
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handlePointerDown = (e: PointerEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsVisible(false)
            }
        }

        document.addEventListener("pointerdown", handlePointerDown, true)

        return () => {
            document.removeEventListener(
                "pointerdown",
                handlePointerDown,
                true
            )
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative inline-flex items-center mx-2"
        >
            <button
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible((v) => !v)}
                aria-label="Keyboard shortcuts"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black text-sm font-bold leading-none text-white transition-opacity select-none lg:opacity-50 lg:hover:opacity-100 border border-white"
            >
                ?
            </button>

            <div
                className={`absolute top-full left-0 mt-2 w-72 overflow-hidden rounded-xl border border-white/15 bg-black/95 shadow-xl backdrop-blur-md transition-all duration-200 ${
                    isVisible
                        ? "pointer-events-auto opacity-100 translate-y-0"
                        : "pointer-events-none opacity-0 -translate-y-1"
                }`}
            >
                <div className="border-b border-white/10 px-4 py-3">
                    <h3 className="text-sm font-semibold text-white">
                        {title}
                    </h3>
                </div>

                <div className="p-3">
                    {shortcuts.map((shortcut) => (
                        <div
                            key={shortcut.key}
                            className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-white/5"
                        >
                            <kbd className="min-w-12 rounded-md border border-white/15 bg-white/10 px-2 py-1 text-center text-xs font-semibold text-white shadow-sm">
                                {shortcut.key}
                            </kbd>

                            <span className="ml-4 text-sm text-gray-300">
                                {shortcut.action}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VideoInfoTooltip