"use client"
type ModifierToggleProps = {
    modifierId: string,
    isActive: boolean,
    onToggle: (id: string) => void
    options: [string, string]
    disabled?: boolean
}
function ModifierToggle({ modifierId, isActive, onToggle, options, disabled=false }: ModifierToggleProps) {
    console.log(modifierId, disabled)
    return (
        
        <div 
            onClick={() => !disabled && onToggle(modifierId)}
            className={`flex flex-row gap-1 bg-white dark:bg-black p-1 my-2 rounded-xl w-fit transition-colors duration-500 ease-in-out ${
                disabled ? "opacity-40 [&_*]:cursor-not-allowed cursor-not-allowed" : "[&_*]:cursor-pointer cursor-pointer "
            }`}
        >
            <button disabled={disabled} className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ease-in-out ${
                !isActive ? "bg-gray-200 text-black" : "text-gray-400"
            }`}>
                {options[0]}
            </button>
            <button disabled={disabled} className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ease-in-out ${
                isActive ? "bg-gray-200 text-black" : "text-gray-400"
            }`}>
                {options[1]}
            </button>
        </div>
    )
}
export default ModifierToggle