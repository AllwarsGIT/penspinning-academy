"use client"
import { useState } from "react"
import { IoChevronUp, IoChevronDown } from "react-icons/io5"

type FilterSectionProps = {
    title: string
    children: React.ReactNode
    defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
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

            <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-2 mt-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterSection