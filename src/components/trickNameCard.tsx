import React from 'react'
import { useDominantHand } from "@/app/providers/dominantHandProvider"

import Link from "next/link"
import Image from "next/image"
import DifficultyBadge from "@/components/difficultyBadge"
import FamilyBadge from './familyBadge'

type TrickNameCardProps = {
    title: string,
    thumbnail: string,
    href: string,
    badge?: string
    families: string[]
}


function TrickNameCard({ title="", thumbnail="", href="", badge="", families=[""] }: TrickNameCardProps) {
    const { isLeftHanded } = useDominantHand()

    return (
        <Link 
            href={href} 
            className="w-full rounded-xl overflow-hidden cursor-pointer group hover:-translate-y-3 transition-all duration-300 ease-in-out"
            scroll={false}>
            <div className="w-full aspect-video relative overflow-hidden">
                {thumbnail ? (
                    <Image 
                        src={thumbnail} 
                        alt={title}
                        style={{transform:isLeftHanded ? 'none' : 'scaleX(-1)'}}
                        fill
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                )}
                
            </div>
            <div className="p-3 flex flex-col gap-2 bg-whitePrimary dark:bg-blackPrimary transition-colors duration-500 ease-in-out">
                    <h2 className="font-semibold ">
                        {title}
                    </h2>
                    <div className="flex flex-row justify-between">
                        <DifficultyBadge badge={badge}/>
                        <FamilyBadge families={families} />
                    </div>
                    
                    
            </div>
        </Link>
    )
}

export default TrickNameCard

