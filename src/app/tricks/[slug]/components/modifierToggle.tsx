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
            className="flex flex-row gap-1 bg-white dark:bg-black p-1 my-2 rounded-xl w-fit cursor-pointer transition-colors duration-500 ease-in-out "
        >
            <button className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ease-in-out ${
                !isActive ? "bg-gray-200 text-black" : "text-gray-400"
            }`}>
                {options[0]}
            </button>
            <button className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ease-in-out ${
                isActive ? "bg-gray-200 text-black" : "text-gray-400"
            }`}>
                {options[1]}
            </button>
        </div>
    )
}

export default ModifierToggle