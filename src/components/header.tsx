"use client"
import React from 'react'
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
import { useRouter, usePathname } from "next/navigation"
import DarkmodeButton from './darkmodeButton';
import DominantHandButton from './dominantHandButton';
import Link from 'next/link';


function Header () {
    const router = useRouter()

    const handleNavClick = (href: string) => {
        router.push(href)
        setTimeout(() => setIsOpen(false), 400)
    }
    // Menu state
    const [isOpen, setIsOpen] = useState(false);

    // To leave the menu items activated
    const pathname = usePathname()

    return (
        <header className="bg-white dark:bg-black fixed top-0 px-4 left-0 w-full flex z-50 transition-all ease-in-out duration-500 ">
            <nav className="flex items-center justify-between mx-auto w-full h-16 ">

                {/* Header logo */}
                <div className="bg-blue-300 w-12 h-12 rounded-full flex items-center justify-center">
                    <Link href="/">
                        <h1 className="text-xl font-bold text-white">PSA</h1>
                    </Link>
                    
                </div>

                <div className="flex flex-row gap-4 h-full ">
                    {/* Toggles */}
                    <div className="flex flex-row items-center gap-3">
                        <DominantHandButton />
                        <DarkmodeButton />
                    </div>

                    {/* Menu for computer */}
                    <ul className="p-0 m-0 h-full hidden items-center md:flex">
                        <li className={`h-full cursor-pointer flex items-center border-b-2 transition-all duration-300 ease-in-out group ${pathname === "/learn" ? "border-black dark:border-white" : "border-transparent hover:border-black dark:hover:border-white"}`}>
                            <Link 
                                className={`h-full flex items-center px-4 text-lg font-medium transition-colors duration-300 ${pathname === "/learn" ? "text-black dark:text-white" : "text-gray-400 group-hover:text-black dark:group-hover:text-white"}`}
                                href="/learn"
                            >
                                Learn
                            </Link>
                        </li>
                        <li className={`h-full cursor-pointer flex items-center border-b-2 transition-all duration-300 ease-in-out group ${pathname === "/tricks" ? "border-black dark:border-white" : "border-transparent hover:border-black dark:hover:border-white"}`}>
                            <Link 
                                className={`h-full flex items-center px-4 text-lg font-medium transition-colors duration-300 ${pathname === "/tricks" ? "text-black dark:text-white" : "text-gray-400 group-hover:text-black dark:group-hover:text-white"}`}
                                href="/tricks"
                            >
                                Tricks
                            </Link>
                        </li>
                    </ul>
                </div>
                

                {/* Menu for mobile */}
                <div 
                    className=" w-12 h-12 md:hidden flex justify-center items-center hover:scale-120 transition-transform ease-in-out duration-500 cursor-pointer text-black dark:text-white "
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}>
                    {isOpen ? 
                        <div className="transition-transform ease-in-out duration-350 rotate-0">
                            <RxCross1 className="text-[35px] font-bold "/>
                        </div>
                        :
                        <div className="transition-transform ease-in-out duration-350 rotate-180">
                            <FiMenu className="text-[35px] font-bold "/>
                        </div>
                    }
                </div>

                
                
                {/* Close menu when clicking outside */}
                {/* {isOpen && (
                    <div
                    className="fixed inset-0 bg-transparent  z-10"
                    onClick={() => setIsOpen(false)}
                    />
                )} */}

                {/* Menu pannel for mobile */}
                <div 
                    className={`fixed top-0 mt-16 right-0 h-full w-full bg-whitePrimary dark:bg-blackPrimary border-t border-gray-300 dark:border-gray-500 z-50 transform transition-all duration-500 ease-in-out ${
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    } `}
                >
                    <ul className="p-0 m-0">
                        <li className="w-full  flex items-center hover:bg-gray-400 animation-all ease-in-out duration-500 justify-center  ">
                            <button className="w-full h-full cursor-pointer py-4" onClick={() => handleNavClick("/learn")}>
                                <h1 className="text-xl font-bold">Learn Pen Spinning</h1>
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Blur effect for bg */}
               
                <div
                    className={`fixed top-16 right-0 h-full w-full transition-[backdrop-filter,opacity] duration-300 ease-in-out pointer-events-none ${isOpen ? 'backdrop-blur-xs opacity-100' : 'backdrop-blur-0 opacity-0'}`} 
                ></div>

            </nav>
        </header>
    )
}

export default Header
