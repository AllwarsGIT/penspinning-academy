"use client"
import React, { useState, useEffect } from 'react'
import TrickNameCard from "@/components/trickNameCard"
import { Trick, Instance, Modifier } from "@/types/types"

type ReverseListProps = {
    difficulty?: string
    trickNames: Trick[]
    trickInstances: Instance[]
    modifiers: Modifier[]
}

function TrickNameListReverse({ difficulty, trickNames, trickInstances, modifiers }: ReverseListProps) {
    const [allLoaded, setAllLoaded] = useState(false)

    const validInstances = trickInstances.filter(i =>
        i.modifiers.includes("reverse") &&
        (!difficulty || i.difficulty === difficulty)
    )

    const visibleTricks = trickNames
        .map(trick => ({ trick, instance: validInstances.find(i => i.idTrickName === trick.slug) }))
        .filter(({ instance }) => !!instance)

    useEffect(() => {
        if (visibleTricks.length === 0) return
        const promises = visibleTricks.map(({ instance, trick }) => {
            const baseInstance = trickInstances.find(i =>
                i.idTrickName === trick.slug && i.modifiers.includes("normal")
            )
            return new Promise<void>((resolve) => {
                const thumbnail = baseInstance?.thumbnail || instance!.thumbnail
                if (!thumbnail) return resolve()
                const img = new window.Image()
                img.src = thumbnail
                img.onload = () => resolve()
                img.onerror = () => resolve()
            })
        })
        Promise.all(promises).then(() => setAllLoaded(true))
    }, [])

    const skeletonCount = visibleTricks.length || 4

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {!allLoaded
                ? Array.from({ length: skeletonCount }).map((_, i) => (
                    <div key={i} className="w-full rounded-xl overflow-hidden animate-pulse">
                        <div className="w-full aspect-video bg-gray-200 dark:bg-zinc-800" />
                        <div className="p-3 flex flex-col gap-2 bg-whitePrimary dark:bg-blackPrimary">
                            <div className="h-4 w-2/3 bg-gray-200 dark:bg-zinc-800 rounded" />
                            <div className="flex flex-row justify-between">
                                <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded" />
                                <div className="h-3 w-12 bg-gray-200 dark:bg-zinc-800 rounded" />
                            </div>
                        </div>
                    </div>
                ))
                : visibleTricks.map(({ trick, instance }) => {
                    const baseInstance = trickInstances.find(i =>
                        i.idTrickName === trick.slug && i.modifiers.includes("normal")
                    )
                    return (
                        <TrickNameCard
                            key={`${trick.slug}-reverse`}
                            trickName={trick.name}
                            thumbnail={baseInstance?.thumbnail || instance!.thumbnail || "/defaultThumbnail.jpeg"}
                            badge={difficulty}
                            families={trick.families}
                            modifiers={modifiers}
                            instance={instance!}
                        />
                    )
                })
            }
        </div>
    )
}

export default TrickNameListReverse