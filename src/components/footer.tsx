import React from 'react'
import { SiKofi } from "react-icons/si";

function Footer() {
    return (
        <footer className="w-full px-8 py-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-colors duration-500">
            <div className="max-w-400 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center md:items-start gap-1 flex-1">
                    <span className="font-bold text-sm">PSA</span>
                    <span className="text-xs text-gray-400">
                        <strong className="text-black dark:text-white">P</strong>en <strong className="text-black dark:text-white">S</strong>pinning <strong className="text-black dark:text-white">A</strong>cademy
                    </span>
                    <a
                        href="https://ko-fi.com/allwars"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row group items-center py-2.5 text-xs gap-1 text-gray-500 hover:gap-3 hover:text-gray-300 font-medium rounded-lg  transition-all duration-500 ease-in-out"
                        >
                        <SiKofi size={30} className="text-[#FF5E5B] opacity-80 group-hover:opacity-100 group-hover:scale-125  transition-all duration-500 ease-in-out" /> If you enjoy this website, buy me a coffee!
                    </a>
                                        
                </div>
                
                <span className="text-sm text-gray-500 justify-self-center">© 2026 Álvaro Sánchez</span>


            </div>
        </footer>
    )
}

export default Footer