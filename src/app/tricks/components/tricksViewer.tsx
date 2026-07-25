"use client"
import React, { useState } from "react"
import { MdFilterList, MdFilterListOff } from "react-icons/md"
import TrickSearchList from "./trickSearchList"
import SearchBar from "./searchBar"
import FilterSideBar from "./filterSideBar"
import { Instance, Trick, Modifier } from "@/types/types"
import { Suspense } from "react";

type TricksViewerProps = {
    instance: Instance[]
    trick: Trick[]
    modifiers: Modifier[]
}

function TricksViewer({ instance, trick, modifiers }: TricksViewerProps) {
    const [showFilters, setShowFilters] = useState(true)

    return (
        <div className="w-full min-h-[calc(100vh-64px)] mt-16 bg-whitePrimary dark:bg-black">
            <div className="max-w-screen-2xl mx-auto py-10 px-5 flex flex-col gap-6">

                {/* Barra superior: siempre primera, sea cual sea el layout de abajo */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                        {showFilters ? <MdFilterListOff size={18} /> : <MdFilterList size={18} />}
                        {showFilters ? "Hide filters" : "Show filters"}
                    </button>
                    
                </div>

                {/* Debajo: sidebar (si está visible) + grid, en columna en móvil / fila en desktop */}
                <div className="flex flex-col md:flex-row gap-6">
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