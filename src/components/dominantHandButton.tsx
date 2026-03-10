'use client'
import React, { useState, useEffect } from 'react'
import { IoHandLeftSharp } from "react-icons/io5"
import { IoHandRight } from "react-icons/io5"

function DominantHandButton() {
    const [isRight, setIsRight] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => setShowMessage(false), 500)
            return () => clearTimeout(timer)
        }
    }, [showMessage])

    const handleClick = () => {
        if (showMessage) return
        setIsRight(!isRight)
        setMessage(!isRight ? "Left handed" : "Right handed")
        setShowMessage(true)
    }

    return (
        <div className="relative">
            <div 
                className="bg-gray-400 w-18 h-10 rounded-full items-center flex justify-start cursor-pointer hover:scale-110 transition-all ease-in-out duration-350"
                onClick={handleClick}
            >
                {isRight ? 
                    <div className="bg-black w-8 h-8 p-0 mx-1 rounded-full flex justify-center items-center transition-all ease-in-out duration-350 rotate-0">
                        <IoHandRight className="text-[20px] text-white font-bold rotate-20 transition-all ease-in-out duration-350"/>
                    </div>
                    :
                    <div className="bg-white w-8 h-8 p-0 mx-1 rounded-full flex justify-center items-center translate-x-8 transition-all ease-in-out duration-350 rotate-360">
                        <IoHandLeftSharp className="text-[20px] text-black font-bold -rotate-20 transition-all ease-in-out duration-350"/>
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
export default DominantHandButton