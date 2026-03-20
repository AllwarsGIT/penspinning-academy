import React from 'react'
import Link from "next/link"
import Image from "next/image"
import DifficultyBadge from "@/components/difficultyBadge"

type TrickNameCardProps = {
    title: string,
    thumbnail: string,
    href: string,
    badge?: string
}


function TrickNameCard({ title="", thumbnail="", href="", badge="" }: TrickNameCardProps) {

    return (
        <Link href={href} className="w-full rounded-xl overflow-hidden cursor-pointer group hover:-translate-y-3 transition-all duration-300 ease-in-out">
            <div className="w-full aspect-video relative overflow-hidden">
                {thumbnail ? (
                    <Image 
                        src={thumbnail} 
                        alt={title}
                        fill
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                )}
                
            </div>
            <div className="p-3 flex flex-col gap-2 bg-whitePrimary dark:bg-blackPrimary">
                    <h2 className="font-semibold ">
                        {title}
                    </h2>
                    <DifficultyBadge badge={badge}/>
                    
            </div>
            
        </Link>
    )
}

export default TrickNameCard

