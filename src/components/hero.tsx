"use client"
import Link from "next/link"
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver"

function Hero() {
    const { elementRef: titleRef, hasIntersected: titleVisible } = useIntersectionObserver({ threshold: 0.1 })
    const { elementRef: subtitleRef, hasIntersected: subtitleVisible } = useIntersectionObserver({ threshold: 0.1 })
    const { elementRef: buttonRef, hasIntersected: buttonVisible } = useIntersectionObserver({ threshold: 0.1 })

    return (
        <section className="relative flex flex-col items-center justify-center min-h-180 max-h-[60vh] overflow-hidden mt-16">
            <video 
                className="absolute inset-0 w-full h-full object-cover" 
                style={{ willChange: 'transform' }}
                src="https://pub-768f808dc5fe4b5284d814f5967be01c.r2.dev/psaIntroFinal.mp4" 
                // poster="/learnPortraitUpscaled.jpeg"
                preload="none"
                autoPlay 
                muted 
                loop 
                playsInline 
            />
            <div className="absolute inset-0 bg-black/50" />
            
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <h1 
                    ref={titleRef}
                    className={`text-4xl md:text-6xl font-bold text-gray-300 font-inter transition-all duration-800 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <span className="text-white">P</span>en <span className="text-white">S</span>pinning <span className="text-white">A</span>cademy
                </h1>
                <p 
                    ref={subtitleRef}
                    className={`md:text-xl text-gray-400 transition-all duration-800 delay-200 ${subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    The website to learn penspinning online step by step.
                </p>
                <div 
                    ref={buttonRef}
                    className={`flex flex-row gap-3 mt-2 transition-all duration-800 delay-400 ${buttonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                   <Link 
                        href="/learn" 
                        className="px-6 py-2.5 bg-white text-black rounded-xl text-xs sm:text-sm font-bold transition-all duration-200"
                        style={{ boxShadow: '0 4px 0 0 #d1d5db' }}
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