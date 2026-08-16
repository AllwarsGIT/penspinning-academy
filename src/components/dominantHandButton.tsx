"use client"
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { IoHandLeftSharp, IoHandRight } from "react-icons/io5"
import { useDominantHand } from "@/app/providers/dominantHandProvider"

function DominantHandButton() {
    const [mounted, setMounted] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("")
    const { isLeftHanded, toggleHand } = useDominantHand()

    useLayoutEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!showMessage) return
        const timer = setTimeout(() => setShowMessage(false), 700)
        return () => clearTimeout(timer)
    }, [showMessage])

    const handleClick = () => {
        if (showMessage) return

        const willBeLeftHanded = !isLeftHanded
        toggleHand()
        setMessage(willBeLeftHanded ? "Left handed" : "Right handed")
        setShowMessage(true)
    }

    if (!mounted) {
        return <div className="w-18 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
    }

    return (
        <div className="relative">
            <button
                type="button"
                role="switch"
                aria-checked={isLeftHanded}
                aria-label="Toggle dominant hand"
                onClick={handleClick}
                className="bg-gray-400 dark:bg-gray-600 w-18 h-10 rounded-full items-center flex justify-start cursor-pointer hover:scale-110 transition-all ease-in-out duration-350"
            >
                {isLeftHanded ? (
                    <div className="bg-black w-8 h-8 mx-1 rounded-full flex justify-center items-center transition-all ease-in-out duration-350 rotate-0">
                        <IoHandRight className="text-[20px] text-white rotate-20 transition-all ease-in-out duration-350" />
                    </div>
                ) : (
                    <div className="bg-white w-8 h-8 mx-1 rounded-full flex justify-center items-center translate-x-8 transition-all ease-in-out duration-350 rotate-360">
                        <IoHandLeftSharp className="text-[20px] text-black -rotate-20 transition-all ease-in-out duration-350" />
                    </div>
                )}
            </button>

            <div className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono tracking-widest uppercase bg-white dark:bg-black text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 px-4 py-1.5 rounded-full transition-all duration-300 ${
                showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}>
                {message}
            </div>
        </div>
    )
}

export default DominantHandButton