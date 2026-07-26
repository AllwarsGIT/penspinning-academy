"use client"
import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MdFilterList, MdFilterListOff, MdClear } from "react-icons/md"
import TrickSearchList from "./trickSearchList"
import FilterSideBar from "./filterSideBar"
import { Instance, Trick, Modifier } from "@/types/types"
import { Suspense } from "react";
import { useFilteredTricks } from "./../hooks/useFilteredTricks"

type TricksViewerProps = {
    instance: Instance[]
    trick: Trick[]
    modifiers: Modifier[]
}

function ResultsCount({ trick, instance }: { trick: Trick[], instance: Instance[] }) {
    const results = useFilteredTricks(trick, instance)
    return (
        <span className="text-lg dark:text-gray-300 text-gray-800 font-medium">
            {results.length} result{results.length !== 1 ? "s" : ""}
        </span>
    )
}

function TricksViewer({ instance, trick, modifiers }: TricksViewerProps) {
    const [showFilters, setShowFilters] = useState(true)
    const router = useRouter()
    const searchParams = useSearchParams()

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("family")
        params.delete("difficulty")
        params.delete("modifiers")
        router.replace(`/tricks${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false })
    }

    return (
        <div className="w-full min-h-[calc(100vh-64px)]  bg-white dark:bg-black overflow-visible ">
            <div className="max-w-screen-2xl mx-auto py-10 px-5 flex flex-col gap-6">

                <div className={`flex items-center gap-3 sticky top-16 z-15 bg-white dark:bg-black py-3  ${showFilters ? "gap-7" : ""}`}>
                    <div className="flex flex-row gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
                        >
                            {showFilters ? <MdFilterListOff size={18} /> : <MdFilterList size={18} />}
                            {showFilters ? "Hide filters" : "Show filters"}
                        </button>

                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
                        >
                            <MdClear size={18} />
                            Clear filters
                        </button>
                    </div>
                    

                    <Suspense fallback={null}>
                        <ResultsCount trick={trick} instance={instance} />
                    </Suspense>
                </div>

                <div className="flex flex-col md:flex-row gap-6 overflow-visible ">
                    {showFilters && (
                        <Suspense fallback={null}>
                            <FilterSideBar trickNames={trick} trickInstances={instance} modifiers={modifiers} />
                        </Suspense>
                    )}
                    <div className="flex-1">
                        <Suspense fallback={null}>
                            <TrickSearchList
                                trickNames={trick}
                                trickInstances={instance}
                                modifiers={modifiers}
                            />
                        </Suspense>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TricksViewer