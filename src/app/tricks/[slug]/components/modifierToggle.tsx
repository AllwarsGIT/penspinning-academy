"use client"
import { useState } from "react"

type ModifierToggleProps = {
    value: boolean,
    onChange: (value: boolean)=> void,
    options: [string, string]
}

function ModifierToggle({value, onChange, options}:ModifierToggleProps) {
    const [isActive, setIsActive] = useState(false)

    return (
        <div 
            onClick={() => onChange(!value)}
            className="flex flex-row gap-1 bg-gray-800 p-1 rounded-xl w-fit cursor-pointer"
        >
            <div className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                !value ? "bg-white text-black font-medium" : "text-gray-400"
            }`}>
                {options[0]}
            </div>
            <div className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                value ? "bg-white text-black font-medium" : "text-gray-400"
            }`}>
                {options[1]}
            </div>
        </div>
    )
}

export default ModifierToggle