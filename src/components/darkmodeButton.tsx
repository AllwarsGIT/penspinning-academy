"use client"
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useState , useLayoutEffect } from 'react';
import { useTheme } from "next-themes";

function DarkmodeButton() {


    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])


    const dark = theme === "dark"

    const toggleTheme = () => {
        setTheme(dark ? "light" : "dark")
    }

    if (!mounted) {
        return (
            <div className="w-18 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        )
    }

    return (
        <>
            <div 
                className="bg-gray-400 w-18 h-10 rounded-full items-center flex justify-start cursor-pointer hover:scale-110 transition-all ease-in-out duration-350"
                onClick={toggleTheme}
                >

                {dark ? 
                    <div className="bg-black w-8 h-8 p-0 mx-1 rounded-full border-black flex justify-center items-center  transition-all ease-in-out duration-350 ">
                        <FaMoon className="text-[20px] text-white font-bold "/>
                    </div>
                    :
                    <div className="bg-white w-8 h-8 p-0 mx-1 rounded-full border-black flex justify-center items-center translate-x-8 transition-all ease-in-out duration-350 rotate-360">
                        <MdSunny className="text-[20px] text-black font-bold"/>
                    </div>
                }
            </div>
        </>
    )
}

export default DarkmodeButton
