import React from 'react'
import Link from 'next/link'

function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-180 max-h-[60vh] overflow-hidden mt-16">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/psaIntro.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="absolute inset-0 bg-black/50" />
            
            <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
                <h1 className="hero-responsive font-bold text-white font-inter">
                    Pen Spinning Academy
                </h1>
                <p className="subtitle-responsive text-gray-300   ">
                    The most powerful resource to learn penspinning
                </p>
                <div className="flex flex-row gap-3 mt-2">
                    <Link 
                        href="/learn"
                        className="px-6 py-2.5 bg-white text-black rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                        Start learning
                    </Link>
                    <button className="px-6 py-2.5 border border-white text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors">
                        How it works
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Hero