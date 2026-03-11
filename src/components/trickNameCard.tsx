import React from 'react'
import Link from "next/link"
import Image from "next/image"

type TrickNameCardProps = {
    title: string,
    thumbnail: string,
    href: string,
    badge?: string
}

const difficultyColor: Record<string, string> = {
    fundamental: "#3b82f6",
    basic: "#22c55e",
    intermediate: "#eab308",
    advanced: "#f97316",
    expert: "#ef4444"
}

function TrickNameCard({ title="", thumbnail="", href="", badge="" }: TrickNameCardProps) {
    const color = badge ? difficultyColor[badge] : undefined;

    return (
        <Link href={href} className="w-full rounded-xl overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="w-full aspect-video">
                {thumbnail ? (
                    <Image 
                        src={thumbnail} 
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
                )}
                <div className="p-3 flex flex-col gap-2 bg-whitePrimary dark:bg-blackPrimary">
                    <h2 className="font-semibold ">
                        {title}
                    </h2>
                    {badge && (
                        <span 
                            className="text-xs uppercase tracking-widest font-mono w-fit px-2 py-0.5 rounded-full"
                            style={{ 
                                color: color,
                                backgroundColor: `${color}20`,
                                border: `1px solid ${color}40`
                            }}
                        >
                            {badge}
                        </span>
                    )}
                </div>
            </div>
            
        </Link>
    )
}

export default TrickNameCard

