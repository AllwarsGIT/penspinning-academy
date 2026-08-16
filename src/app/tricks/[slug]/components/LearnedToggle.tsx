"use client"

import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md"
import { useLearnedTricks } from "@/app/providers/learnedTricksProvider"

type LearnedToggleProps = {
    trickId: string
    size?: "sm" | "md"
    className?: string
}

function LearnedToggle({
    trickId,
    size = "md",
    className = "",
}: LearnedToggleProps) {
    const { isLearned, toggleLearned, mounted } = useLearnedTricks()

    // Evita mismatch de hidratación.
    if (!mounted) return null

    const learned = isLearned(trickId)
    const iconSize = size === "sm" ? 18 : 24

    return (
        <button
            type="button"
            aria-pressed={learned}
            aria-label={
                learned
                    ? "Mark as not learned"
                    : "Mark as learned"
            }
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleLearned(trickId)
            }}
            className={`
                flex
                items-center
                justify-center
                rounded-full
                cursor-pointer
                transition-all
                duration-200
                ease-out
                hover:scale-110
                active:scale-90
                ${
                    learned
                        ? "bg-emerald-100 text-emerald-500 hover:bg-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-300 dark:hover:bg-emerald-800/70"
                        : "bg-black/30 text-gray-300 hover:bg-black/50 hover:text-white dark:bg-black/30 dark:text-gray-500 dark:hover:text-gray-300"
                }
                ${className}
            `}
        >
            <span
                key={learned ? "learned" : "not-learned"}
                className="flex animate-[learned-pop_200ms_ease-out]"
            >
                {learned ? (
                    <MdCheckCircle size={iconSize} />
                ) : (
                    <MdRadioButtonUnchecked size={iconSize} />
                )}
            </span>
        </button>
    )
}

export default LearnedToggle