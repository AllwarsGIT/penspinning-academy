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
    badge?: string
    families: string[],
    modifiers: Modifier[],
    instance: Instance
}

function TrickNameCard({ trickName="", thumbnail="", badge="", families=[""], modifiers=[], instance }: TrickNameCardProps) {
    
    const { isLeftHanded } = useDominantHand()
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const check = () => setIsDark(document.documentElement.classList.contains('dark'))
        check()
        const observer = new MutationObserver(check)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    }, [])

    const shadowColor = isDark ? '#3f3f46' : '#d1d5db' // zinc-700 : gray-200

    const extraModifiers = instance.modifiers.filter(m => m !== "normal")
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
            className="w-full rounded-xl hover:-translate-y-1 overflow-hidden cursor-pointer group transition-all duration-200 ease-in-out"
            style={{ boxShadow: '0 0 0 0 transparent' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 0 0 ${shadowColor}` }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent' }}
            scroll={false}
        >
            <div className="w-full aspect-video relative overflow-hidden">
                {thumbnail ? (
                    <Image 
                        src={thumbnail} 
                        alt={trickName}
                        style={{ transform: isLeftHanded ? 'none' : 'scaleX(-1)' }}
                        fill
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                )}
            </div>
            <div className="p-3 flex flex-col gap-2 bg-whitePrimary dark:bg-blackPrimary transition-colors duration-500 ease-in-out">
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