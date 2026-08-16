"use client"

type ModifierButtonProps = {
    modifierId: string
    name: string
    color: string
    isActive: boolean
    onToggle: (id: string) => void
    disabled?: boolean
}

function ModifierButton({ modifierId, name, color, isActive, onToggle, disabled = false }: ModifierButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onToggle(modifierId)}
            style={
                !disabled && isActive
                    ? { borderColor: color, backgroundColor: `${color}22`, color }
                    : undefined
            }
            className={`flex items-center gap-2 px-3 py-2 rounded-full border font-bold text-sm transition-all duration-200 ease-in-out ${
                disabled
                    ? "opacity-30 cursor-not-allowed border-transparent bg-gray-100 dark:bg-gray-900 text-gray-400"
                    : isActive
                        ? "cursor-pointer shadow-sm"
                        : "cursor-pointer border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-700 dark:text-gray-300 hover:border-gray-500 dark:hover:border-gray-400 hover:text-black dark:hover:text-white"
            }`}
        >
          
            {name}
        </button>
    )
}

export default ModifierButton