"use client"
import React from 'react'
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
import DarkmodeButton from './darkmodeButton';
import DominantHandButton from './dominantHandButton';

function Header () {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white dark:bg-black fixed top-0 px-4 left-0 w-full flex z-10 transition-all ease-in-out duration-500 ">
            <nav className="flex items-center justify-between w-full h-16 ">

                {/* Header logo */}
                <div className="bg-blue-300 w-12 h-12 rounded-full flex items-center justify-center">
                    
                </div>

                {/* Toggles */}
                <div className="flex flex-row items-center gap-3">
                    <DominantHandButton />
                    <DarkmodeButton />
                </div>

                {/* Menu for mobile */}
                <div 
                    className=" w-12 h-12  flex justify-center items-center hover:scale-120 transition-transform ease-in-out duration-500 cursor-pointer text-black dark:text-white "
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
                    className={`fixed top-0 mt-16 right-0 h-full w-full bg-whitePrimary dark:bg-blackPrimary border-t border-gray-300 dark:border-gray-500 z-10 transform transition-all duration-500 ease-in-out ${
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    } `}
                >
                    <ul>
                        <li className="pt-4 pb-3 flex items-center justify-end mx-5">
                           
                        </li>
                    </ul>
                </div>

                {/* Blur effect for bg */}
                <div
                    className={`fixed top-16 right-0 h-full w-full block opacity-0`}
                    style={{
                        backdropFilter: isOpen ? "blur(4px)" : "blur(0px)",
                        transition: "backdrop-filter 0.2s ease, opacity 0.2s ease",
                        opacity: isOpen ? 1 : 0,
                    }}
                ></div>

            </nav>
        </header>
    )
}

export default Header
