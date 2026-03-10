"use client"
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useState, useLayoutEffect, useEffect } from 'react';
import { useTheme } from "next-themes";

function DarkmodeButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useLayoutEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => setShowMessage(false), 700)
            return () => clearTimeout(timer)
        }
    }, [showMessage])

    const dark = theme === "dark"

    const [message, setMessage] = useState("")

    const toggleTheme = () => {
        if (showMessage) return
        setMessage(dark ? "Light mode" : "Dark mode")
        setTheme(dark ? "light" : "dark")
        setShowMessage(true)
    }

    if (!mounted) {
        return <div className="w-18 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
    }

    return (
        <div className="relative">
            <div 
                className="bg-gray-400 w-18 h-10 rounded-full items-center flex justify-start cursor-pointer hover:scale-110 transition-all ease-in-out duration-350"
                onClick={toggleTheme}
            >
                {dark ? 
                    <div className="bg-black w-8 h-8 p-0 mx-1 rounded-full flex justify-center items-center transition-all ease-in-out duration-350">
                        <FaMoon className="text-[20px] text-white font-bold"/>
                    </div>
                    :
                    <div className="bg-white w-8 h-8 p-0 mx-1 rounded-full flex justify-center items-center translate-x-8 transition-all ease-in-out duration-350 rotate-360">
                        <MdSunny className="text-[20px] text-black font-bold"/>
                    </div>
                }
            </div>
            <div className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono tracking-widest uppercase bg-white text-gray-600 border border-gray-200 px-4 py-1.5 rounded-full transition-all duration-300 ${
                showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}>
                {message}
            </div>
        </div>
    )
}

export default DarkmodeButton