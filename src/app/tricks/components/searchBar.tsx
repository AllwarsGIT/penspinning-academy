"use client"
import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { IoSearch, IoClose } from "react-icons/io5"

function SearchBar() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const isOnTricksPage = pathname === "/tricks"
    const [query, setQuery] = useState(isOnTricksPage ? searchParams.get("q") ?? "" : "")

    useEffect(() => {
        const handle = setTimeout(() => {
            if (isOnTricksPage) {
                const params = new URLSearchParams(searchParams.toString())
                if (query) params.set("q", query)
                else params.delete("q")

                router.replace(`/tricks${params.toString() ? `?${params}` : ""}`, { scroll: false })
            } else {
                if (query) {
                    router.push(`/tricks?q=${encodeURIComponent(query)}`)
                }
            }
        }, 200)

        return () => clearTimeout(handle)
    }, [query])

    const clearQuery = () => setQuery("")

    return (
        // "group" marca este div como referencia para que los hijos puedan
        // reaccionar a estados (focus-within) de lo que ocurra DENTRO de él
        <div className="relative w-full max-w-md group">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trick..."
                className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white outline-none transition-all duration-300 ease-in-out focus:border-transparent focus:ring-2 focus:ring-black/70 dark:focus:ring-white/70 focus:shadow-lg [-webkit-tap-highlight-color:transparent]"
            />

            {query && (
                <button
                    type="button"
                    onClick={clearQuery}
                    className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                    <IoClose size={22} />
                </button>
            )}

            {/* group-focus-within: se activa cuando el <input> hermano
                (dentro del mismo "group") tiene el foco, sin que la lupa
                en sí sea focusable ni interactiva */}
            <IoSearch
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors duration-300 pointer-events-none"
            />
        </div>
    )
}

export default SearchBar