'use client'
import React from 'react'
import { IoHandLeftSharp } from "react-icons/io5";
import { IoHandRight } from "react-icons/io5";
import { useState } from 'react';


function DominantHandButton() {

    const [isOpen, setIsOpen] = useState(false);
    

    return (
        <div 
            className="bg-gray-400 w-18 h-10 rounded-full items-center flex justify-start cursor-pointer hover:scale-110 transition-all ease-in-out duration-350"
            onClick={() => {
                setIsOpen(!isOpen);
            }}>

            {isOpen ? 
                <div className="bg-black w-8 h-8 p-0 mx-1 rounded-full flex justify-center items-center transition-all ease-in-out duration-350 rotate-0">
                    <IoHandRight className="text-[20px] text-white font-bold rotate-20  transition-all ease-in-out duration-350"/>
                </div>
                :
                <div className="bg-white w-8 h-8 p-0 mx-1 rounded-full flex justify-center items-center translate-x-8 transition-all ease-in-out duration-350 rotate-360">
                    <IoHandLeftSharp className="text-[20px] text-black font-bold -rotate-20 transition-all ease-in-out duration-350"/>
                </div>
            }
        </div>
    )
}

export default DominantHandButton
