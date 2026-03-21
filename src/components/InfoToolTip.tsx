"use client"
import { useState } from "react"

type InfoTooltipProps = {
    text: string
}

function InfoTooltip({ text }: InfoTooltipProps) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="relative inline-flex items-center mx-2">
            <button
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
                className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center text-sm font-mono  font-bold leading-none transition-colors select-none"
                style={{ 
                    border: `1px solid #6b728090`,
                    color: "#6b7280"
                }}
            >
                ?
            </button>
            <div 
                className={`absolute bg-white dark:bg-black backdrop-blur-sm whitespace-pre-line -left-10 sm:left-6 top-6 md:top-auto md:-translate-y-1/2 z-50 w-50 sm:w-90 px-3 py-2 rounded-xl text-m text-gray-800 dark:text-gray-300 transition-all duration-400 ${
                    isVisible ? "opacity-100 pointer-events-auto " : "opacity-0 pointer-events-none"
                }`}
                style={{
                    border: `1px solid #6b728090`,
                }}
            >
                {text}
            </div>
        </div>
    )
}

export default InfoTooltip