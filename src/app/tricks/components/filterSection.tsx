"use client"
import { useState } from "react"
import { IoChevronUp, IoChevronDown } from "react-icons/io5"

type FilterSectionProps = {
    title: string
    children: React.ReactNode
    defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
    // Estado local: solo controla si el bloque está desplegado o no.
    // No va en la URL porque es preferencia de UI, no un filtro que afecte a los resultados.
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full cursor-pointer"
            >
                <h3 className="font-bold uppercase text-sm tracking-widest text-gray-500">
                    {title}
                </h3>
                {isOpen ? <IoChevronUp size={16} /> : <IoChevronDown size={16} />}
            </button>

            {isOpen && (
                <div className="flex flex-col gap-2 mt-3">
                    {children}
                </div>
            )}
        </div>
    )
}

export default FilterSection