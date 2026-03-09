"use client"
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useState , useEffect } from 'react';

function DarkmodeButton() {

    const [dark, setDark] = useState(   () => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });

    const toggleTheme = () => {
        setDark(!dark);
    }

    useEffect(() => {
        const root = window.document.documentElement;
        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return (
        <>
            {/* <div 
                className=" w-12 h-12  flex justify-center items-center"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}>
                
                {isOpen ? 
                    <FaMoon className="text-[25px] text-black font-bold" />
                    :
                    <MdSunny className="text-[30px] text-black font-bold" />
                }

            </div> */}
            
            <div 
                className="bg-gray-400 w-18 h-10 rounded-full items-center flex justify-start cursor-pointer hover:scale-110 transition-all ease-in-out duration-350"
                onClick={toggleTheme}>

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
