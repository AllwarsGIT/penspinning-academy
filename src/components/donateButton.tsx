"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

type DonateNavButtonProps = {
    className?: string
}

export default function DonateNavButton({ className = "" }: DonateNavButtonProps) {
    const [isShining, setIsShining] = useState(false)

    useEffect(() => {
        const triggerShine = () => {
            setIsShining(true)
            setTimeout(() => setIsShining(false), 900)
        }

        triggerShine() // brillo inicial al cargar
        const interval = setInterval(triggerShine, 5 * 60 * 10)

        return () => clearInterval(interval)
    }, [])

    return (
        <Link
            href="/donate"
            className={`relative inline-flex items-center overflow-hidden rounded-md bg-gradient-to-r from-[#d92b4b] to-[#a91538] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl ${className}`}
        >
            Donate

            {/* Barrido de brillo — se dispara cada 5 minutos */}
            <span
                className={`pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/40 ${
                    isShining ? "animate-donate-shine" : "-translate-x-[200%]"
                }`}
            />

            <style jsx>{`
                @keyframes donate-shine {
                    from {
                        transform: translateX(-200%) skewX(-12deg);
                    }
                    to {
                        transform: translateX(400%) skewX(-12deg);
                    }
                }
                .animate-donate-shine {
                    animation: donate-shine 0.9s ease-in-out;
                }
            `}</style>
        </Link>
    )
}