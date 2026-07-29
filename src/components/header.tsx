"use client"
import React from 'react'
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
import { useRouter, usePathname } from "next/navigation"
import LogoSrc from "../../public/logo.svg"
import Image from "next/image"
import DarkmodeButton from './darkmodeButton';
import DominantHandButton from './dominantHandButton';
import Link from 'next/link';
import SearchBar from '@/app/tricks/components/searchBar';
import DonateButton from './donateButton';
import { Suspense } from 'react';

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
        <header className="bg-white dark:bg-black fixed top-0 px-4 left-0 w-full flex z-50 transition-all ease-in-out duration-500 border-b border-gray-300 dark:border-gray-700">
            <nav className="relative flex items-center justify-between mx-auto w-full h-16">

                {/* Izquierda: logo + links desktop */}
                <div className="flex items-center h-full">
                    <div className="w-16 h-full rounded-full flex items-center justify-center hover:scale-125 transition-all duration-500 ease-in-out">
                        <Link href="/">
                            <Image src={LogoSrc} width={70} height={70} alt="Logo" className="dark:invert"/>
                        </Link>
                    </div>

                    {/* Links solo en desktop */}
                    <ul className="p-0 m-0 h-full hidden items-center md:flex">
                        {/* <li className={`h-full cursor-pointer flex items-center border-b-2 transition-all duration-300 ease-in-out group ${pathname === "/learn" ? "border-black dark:border-white" : "border-transparent hover:border-black dark:hover:border-white"}`}>
                            <Link
                                className={`h-full flex items-center px-4 text-lg font-medium transition-colors duration-300 ${pathname === "/learn" ? "text-black dark:text-white" : "text-gray-400 group-hover:text-black dark:group-hover:text-white"}`}
                                href="/learn"
                            >
                                Learn
                            </Link>
                        </li> */}
                        <li className={`h-full cursor-pointer flex items-center border-b-2 transition-all duration-300 ease-in-out group ${pathname === "/tricks" ? "border-black dark:border-white" : "border-transparent hover:border-black dark:hover:border-white"}`}>
                            <Link
                                className={`h-full flex items-center px-4 text-lg font-medium transition-colors duration-300 ${pathname === "/tricks" ? "text-black dark:text-white" : "text-gray-400 group-hover:text-black dark:group-hover:text-white"}`}
                                href="/tricks"
                            >
                                Tricks
                            </Link>
                        </li>
                        <li className={`h-full cursor-pointer flex items-center border-b-2 transition-all duration-300 ease-in-out group ${pathname === "/community" ? "border-black dark:border-white" : "border-transparent hover:border-black dark:hover:border-white"}`}>
                            <Link
                                className={`h-full flex items-center px-4 text-lg font-medium transition-colors duration-300 ${pathname === "/community" ? "text-black dark:text-white" : "text-gray-400 group-hover:text-black dark:group-hover:text-white"}`}
                                href="/community"
                            >
                                Community
                            </Link>
                        </li>
                        
                    </ul>
                </div>

                {/* Derecha: SearchBar + toggles en desktop / burger en móvil */}
                <div className="flex-1 flex justify-center md:justify-end items-center gap-3">

                    {/* SearchBar solo en desktop */}

                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="w-[clamp(10rem,20vw,20rem)]">
                            <Suspense fallback={null}>
                                <SearchBar />

                            </Suspense>
                        </div>
                    </div>

                    {/* Searchbar para movil */}
                    <div className="absolute left-1/2 -translate-x-1/2 md:hidden w-50">
                        <Suspense fallback={null}>
                            <SearchBar />
                        </Suspense>
                    </div>

                    {/* Toggles solo en desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* <DonateButton /> */}
                        <DominantHandButton />
                        <DarkmodeButton />
                    </div>

                    {/* Burger solo en móvil */}
                    <div
                        className="w-12 h-12 md:hidden flex justify-center items-center ml-auto hover:scale-120 transition-transform ease-in-out duration-500 cursor-pointer text-black dark:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <div className="transition-transform ease-in-out duration-350 rotate-0">
                                <RxCross1 className="text-[35px] font-bold" />
                            </div>
                        ) : (
                            <div className="transition-transform ease-in-out duration-350 rotate-180">
                                <FiMenu className="text-[35px] font-bold" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu panel for mobile */}
                <div
                    className={`fixed top-16 right-0 h-[calc(100%-64px)] w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-500 ease-in-out flex flex-col justify-between ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <ul className=" py-4">

                        {/* <li>
                            <button
                                onClick={() => handleNavClick("/learn")}
                                className="w-full py-5 flex items-center justify-center text-center text-lg font-semibold hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors duration-300"
                            >
                                Learn
                            </button>
                        </li> */}
                        <li>
                            <button
                                onClick={() => handleNavClick("/tricks")}
                                className="w-full py-5 flex items-center justify-center text-center text-lg font-semibold hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors duration-300"
                            >
                                Tricks
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => handleNavClick("/community")}
                                className="w-full py-5 flex items-center justify-center text-center text-lg font-semibold hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors duration-300"
                            >
                                Community
                            </button>
                        </li>

                        

                    </ul>

                    <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-5">
                        <div className="flex items-center justify-center gap-8">
                            <DominantHandButton />
                            <DarkmodeButton />
                        </div>
                    </div>
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