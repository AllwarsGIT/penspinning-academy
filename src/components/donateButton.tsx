"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { MdFavorite } from "react-icons/md"

type DonateNavButtonProps = {
    className?: string
}

export default function DonateNavButton({
    className = "",
}: DonateNavButtonProps) {
    const [isShining, setIsShining] = useState(false)

    useEffect(() => {
        const triggerShine = () => {
            setIsShining(true)

            setTimeout(() => {
                setIsShining(false)
            }, 900)
        }

        // Brillo inicial
        triggerShine()

        // Cada 2 minutos
        const interval = setInterval(triggerShine, 2 * 30 * 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Link
            href="/donate"
            className={`
                group
                relative
                inline-flex
                items-center
                gap-2
                overflow-hidden
                rounded-md
                border
                border-[#FF5E5B]/30
                bg-[#FF5E5B]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-[0_4px_18px_rgba(255,94,91,0.15)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[#FF5E5B]/60
                hover:bg-[#ff6966]
                hover:shadow-[0_6px_24px_rgba(255,94,91,0.25)]
                ${className}
            `}
        >

            <MdFavorite
                size={16}
                className="
                    relative
                    z-10
                    transition-transform
                    duration-300
                    group-hover:scale-110
                "
            />

            <span className="relative z-10">
                Donate
            </span>


            {/* Shine */}
            <span
                className={`
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-0
                    w-1/3
                    -skew-x-12
                    bg-white/35
                    blur-[1px]
                    ${
                        isShining
                            ? "animate-donate-shine"
                            : "-translate-x-[200%]"
                    }
                `}
            />


            <style jsx>{`
                @keyframes donate-shine {
                    from {
                        transform: translateX(-200%) skewX(-12deg);
                    }

                    to {
                        transform: translateX(500%) skewX(-12deg);
                    }
                }

                .animate-donate-shine {
                    animation: donate-shine 0.9s ease-in-out;
                }
            `}</style>

        </Link>
    )
}