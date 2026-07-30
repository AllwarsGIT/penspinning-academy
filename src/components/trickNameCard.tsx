"use client"
import React, { useEffect, useState } from 'react'
import { useDominantHand } from "@/app/providers/dominantHandProvider"
import Link from "next/link"
import Image from "next/image"
import DifficultyBadge from "@/components/difficultyBadge"
import FamilyBadge from './familyBadge'
import { Modifier, Instance } from '@/types/types'
import { modifierColor } from "@/app/constants/modifiers"

type TrickNameCardProps = {
    trickName: string,
    thumbnail: string,
    thumbnailHand?: "left" | "right",
    badge?: string
    families: string[],
    modifiers: Modifier[],
    instance: Instance,
    variant?: "grid" | "list"
}

function TrickNameCard({ trickName="", thumbnail="", thumbnailHand="left", badge="", families=[""], modifiers=[], instance, variant = "grid" }: TrickNameCardProps) {

    const { isLeftHanded } = useDominantHand()
    const [isDark, setIsDark] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    useEffect(() => {
        const check = () => setIsDark(document.documentElement.classList.contains('dark'))
        check()
        const observer = new MutationObserver(check)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])

    const shadowColor = isDark ? '#3f3f46' : '#d1d5db'

    const viewerHand = isLeftHanded ? "left" : "right"
    const needsMirror = thumbnailHand !== viewerHand

    const extraModifiers = instance.modifiers
    const href = extraModifiers.length > 0
        ? `/tricks/${instance.idTrickName}?modifiers=${extraModifiers.join(",")}`
        : `/tricks/${instance.idTrickName}`
    const prefixMods = instance.modifiers
        .map(id => modifiers.find(m => m.id === id))
        .filter(m => m?.position === "prefix")
    const suffixMods = instance.modifiers
        .map(id => modifiers.find(m => m.id === id))
        .filter(m => m?.position === "suffix")

    const thumbnailNode = (
        <div className={variant === "list"
            ? "w-32 sm:w-40 aspect-video relative overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0 rounded-md"
            : "w-full aspect-video relative overflow-hidden bg-gray-200 dark:bg-gray-800"
        }>
            {thumbnail && !isImageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-zinc-700" />
            )}
            {thumbnail ? (
                <Image
                    src={thumbnail}
                    alt={trickName}
                    style={{ transform: needsMirror ? 'scaleX(-1)' : 'none' }}
                    fill
                    unoptimized
                    className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    loading="eager"
                    onLoad={() => setIsImageLoaded(true)}
                />
            ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
            )}
        </div>
    )

    const nameNode = (
        <h2 className="font-semibold flex flex-row flex-wrap gap-1">
            {prefixMods.map(m => (
                <span key={m!.id} style={{ color: modifierColor[m!.id] }}>
                    [{m!.name}]
                </span>
            ))}
            <span>{trickName}</span>
            {suffixMods.map(m => (
                <span key={m!.id} style={{ color: modifierColor[m!.id] }}>
                    [{m!.name}]
                </span>
            ))}
        </h2>
    )

    if (variant === "list") {
        return (
            <Link
                href={href}
                className="w-full rounded-md cursor-pointer group transition-all duration-200 ease-in-out flex flex-row items-center justify-between gap-3 px-4 py-3 bg-whitePrimary dark:bg-blackPrimary hover:bg-gray-200 dark:hover:bg-zinc-800 "
                scroll={false}
            >
                {nameNode}
                <div className="flex flex-row items-center gap-2 shrink-0">
                    <DifficultyBadge badge={badge}/>
                    <FamilyBadge families={families} />
                </div>
            </Link>
        )
    }

    return (
        <Link
            href={href}
            className="w-full rounded-md overflow-hidden cursor-pointer group transition-all duration-200 ease-in-out"
            scroll={false}
        >
            {thumbnailNode}
            <div className="p-3 flex flex-col gap-2 bg-whitePrimary dark:bg-blackPrimary group-hover:bg-gray-200 dark:group-hover:bg-zinc-800 transition-colors duration-200 ease-in-out">
                {nameNode}
                <div className="flex flex-row justify-between">
                    <DifficultyBadge badge={badge}/>
                    <div className="flex flex-row">
                        <FamilyBadge families={families} />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TrickNameCard