"use client"

import { useEffect, useState } from "react"
import TrickNameCard from "@/components/trickNameCard"
import { Trick, Instance, Modifier } from "@/types/types"
import { useFilteredTricks } from "./../hooks/useFilteredTricks"

type TrickSearchListProps = {
    trickNames: Trick[]
    trickInstances: Instance[]
    modifiers: Modifier[]
    viewMode?: "grid" | "list"
}

function TrickCardSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
    if (viewMode === "list") {
        return (
            <div className="flex items-center gap-4 h-[88px] rounded-xl border border-gray-800 bg-black p-3 animate-pulse">
                <div className="w-20 h-14 rounded-lg bg-gray-800 shrink-0" />

                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 w-40 rounded bg-gray-800" />
                    <div className="h-3 w-24 rounded bg-gray-900" />
                </div>

                <div className="h-6 w-16 rounded bg-gray-800" />
            </div>
        )
    }

    return (
        <div className="rounded-xl border border-gray-800 bg-black overflow-hidden animate-pulse">
            <div className="aspect-video w-full bg-gray-800" />

            <div className="flex flex-col gap-3 p-4">
                <div className="h-4 w-3/4 rounded bg-gray-800" />

                <div className="h-3 w-1/2 rounded bg-gray-900" />

                <div className="h-6 w-16 rounded bg-gray-800" />
            </div>
        </div>
    )
}

function TrickSearchList({
    trickNames,
    trickInstances,
    modifiers,
    viewMode = "grid",
}: TrickSearchListProps) {
    const results = useFilteredTricks(trickNames, trickInstances)

    const [isInitialLoading, setIsInitialLoading] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsInitialLoading(false)
        }, 100)

        return () => clearTimeout(timeout)
    }, [])

    const containerClass =
        viewMode === "list"
            ? "flex flex-col gap-2"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"

    const skeletonCount = viewMode === "list" ? 8 : 12

    if (isInitialLoading) {
        return (
            <div className={containerClass}>
                {Array.from({ length: skeletonCount }).map((_, index) => (
                    <TrickCardSkeleton
                        key={index}
                        viewMode={viewMode}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className={containerClass}>
            {results.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center py-10">
                    No tricks found.
                </p>
            ) : (
                results.map(({ trick, instance, baseThumb }) => (
                    <TrickNameCard
                        key={`${instance.idTrickName}-${instance.modifiers.join("-")}`}
                        trickName={trick!.name}
                        thumbnail={
                            baseThumb?.thumbnail ||
                            "/defaultThumbnail.jpeg"
                        }
                        thumbnailHand={
                            baseThumb?.thumbnailHand ?? "left"
                        }
                        badge={instance.difficulty}
                        families={trick!.families}
                        modifiers={modifiers}
                        instance={instance}
                        variant={viewMode}
                    />
                ))
            )}
        </div>
    )
}

export default TrickSearchList