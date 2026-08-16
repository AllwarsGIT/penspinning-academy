"use client"
import Link from "next/link"
import Image from "next/image"
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver"

// Notación real de tricks existentes en la base de datos — no inventada.
// Fuente: campo `notation` de /tricks (thumb-around, finger-pass, around,
// index-around, middle-around, ring-around, powerpass, twisted-sonic, etc.)
const NOTATION_GLYPHS = [
    "TA", "FP", "PP", "A", "IA", "MA", "RA",
    "Tw Sonic", "bakfall", "neobak", "NeoSA",
    "Palmspin", "Thumbspin", "baktap", "Corkscrew", "Shadow", "Swivel"
]

function Hero() {
    const { elementRef: titleRef, hasIntersected: titleVisible } = useIntersectionObserver({ threshold: 0.1 })
    const { elementRef: subtitleRef, hasIntersected: subtitleVisible } = useIntersectionObserver({ threshold: 0.1 })
    const { elementRef: buttonRef, hasIntersected: buttonVisible } = useIntersectionObserver({ threshold: 0.1 })

    return (
        <section className="relative flex flex-col items-center justify-center min-h-[520px] h-[70vh] max-h-[720px] overflow-hidden mt-16">
            <Image
                src="/learnPortraitUpscaled.jpeg"
                alt="Pen Spinning Academy"
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/25" />

            {/* Notación real de tricks existentes, como textura de fondo —
                muy tenue, rotada, se lee como patrón técnico, no como texto a leer. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 flex flex-wrap content-center justify-center gap-x-10 gap-y-6 -rotate-6 scale-125 opacity-[0.08] select-none pointer-events-none font-mono text-2xl md:text-3xl font-bold text-white"
            >
                {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i}>{NOTATION_GLYPHS[i % NOTATION_GLYPHS.length]}</span>
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center gap-5 text-center px-5">

                <span
                    className={`font-mono text-xs tracking-widest uppercase text-gray-400 transition-all duration-800 ${
                        titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    [ Open Beta ]
                </span>

                <h1
                    ref={titleRef}
                    className={`text-4xl md:text-6xl font-bold text-gray-300 font-inter transition-all duration-800 delay-100 ${
                        titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    <span className="text-white">P</span>en <span className="text-white">S</span>pinning <span className="text-white">A</span>cademy
                </h1>

                <p
                    ref={subtitleRef}
                    className={`md:text-xl text-gray-400 max-w-md transition-all duration-800 delay-200 ${
                        subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    The website to learn penspinning online step by step.
                </p>

                <div
                    ref={buttonRef}
                    className={`flex flex-row gap-3 mt-2 transition-all duration-800 delay-400 ${
                        buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    <Link
                        href="/tricks"
                        className="px-6 py-2.5 bg-white text-black rounded-xl text-sm sm:text-lg font-bold transition-all duration-200"
                        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.95)' }}
                        onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
                    >
                        Start learning
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero