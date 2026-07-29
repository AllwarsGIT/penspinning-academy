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
    thumbnailHand?: "left" | "right", // mano de quien grabó/aportó el thumbnail — por defecto "left"
    badge?: string
    families: string[],
    modifiers: Modifier[],
    instance: Instance
}

function TrickNameCard({ trickName="", thumbnail="", thumbnailHand="left", badge="", families=[""], modifiers=[], instance }: TrickNameCardProps) {
    
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

    const shadowColor = isDark ? '#3f3f46' : '#d1d5db' // zinc-700 : gray-200

    // Misma lógica que en VideoPlayer: se refleja solo si la mano de origen no coincide con la del viewer
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

    return (
        <Link 
            href={href} 
            className="w-full rounded-md overflow-hidden cursor-pointer group transition-all duration-200 ease-in-out"
            scroll={false}
        >
            <div className="w-full aspect-video relative overflow-hidden bg-gray-200 dark:bg-gray-800">
                {/* Template/skeleton — visible hasta que el thumbnail termina de cargar */}
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
            <div className="p-3 flex flex-col gap-2 bg-whitePrimary dark:bg-blackPrimary group-hover:bg-gray-200 dark:group-hover:bg-zinc-800 transition-colors duration-200 ease-in-out">
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