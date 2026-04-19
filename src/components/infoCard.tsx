import React from 'react'
import Link from 'next/link'

type InfoCardProps = {
    number: number
    name: string
    description: string
    color: string
    active: boolean
    slug: string
    trickCount?: number
}

function InfoCard({ number = 0, name = "", description = "", color = "", active = false, slug, trickCount }: InfoCardProps) {
    return (
        <div className="relative rounded-2xl p-6 h-full bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 transition-colors ease-in-out duration-500">
            <div className="flex items-center gap-3 mb-3">
                <h4 className="text-2xl font-bold">{name}</h4>
                {!active && <span className="text-xs text-gray-400 font-medium">Coming soon</span>}
                
            </div>
            {active && trickCount !== undefined && (
                    <p className="text-xs text-gray-400 font-bold">{trickCount} tricks</p>
            )}
            <p className="text-sm pt-4 leading-relaxed text-gray-500 dark:text-gray-400 mb-6">
                {description}
            </p>
            {active && (
                <Link
                    href={`/learn/${slug}`}
                    className="block w-full py-3 rounded-xl font-bold text-white text-lg text-center transition-all duration-200 cursor-pointer"
                    style={{ 
                        backgroundColor: color,
                        boxShadow: `0 4px 0 0 ${color}99`
                    }}
                    onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.9)' }}
                    onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
                >
                    Begin!
                </Link>
            )}
        </div>
    )
}

export default InfoCard