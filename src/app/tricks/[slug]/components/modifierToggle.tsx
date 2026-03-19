"use client"

type ModifierToggleProps = {
    modifierId: string,
    isActive: boolean,
    onToggle: (id: string) => void
    options: [string, string]
}

function ModifierToggle({ modifierId, isActive, onToggle, options }: ModifierToggleProps) {
    return (
        <div 
            onClick={() => onToggle(modifierId)}
            className="flex flex-row gap-1 bg-gray-800 p-1 rounded-xl w-fit cursor-pointer"
        >
            <div className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                !isActive ? "bg-white text-black font-medium" : "text-gray-400"
            }`}>
                {options[0]}
            </div>
            <div className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                isActive ? "bg-white text-black font-medium" : "text-gray-400"
            }`}>
                {options[1]}
            </div>
        </div>
    )
}

export default ModifierToggle