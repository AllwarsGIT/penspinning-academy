import React from 'react'
import Link from 'next/link'
import { FaDiscord } from 'react-icons/fa'

type AnnouncementProps = {
    title: string
    description: string
    buttons: {
        link: string
        linkLabel: string
        icon?: React.ReactNode
        color?: string
        shadowColor?: string
    }[]
}

function Announcement({ title, description, buttons }: AnnouncementProps) {

    return (
        <div className="flex flex-col w-full rounded-2xl p-5 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 transition-colors ease-in-out duration-500">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-3">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
            <div className="flex flex-row gap-2">
                {buttons.map((btn, i) => (
                    <Link
                        key={i}
                        href={btn.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm transition-all duration-200"
                        style={{ 
                            backgroundColor: btn.color ?? '#5865F2',
                            boxShadow: `0 4px 0 0 ${btn.shadowColor ?? '#4752c499'}`
                        }}
                        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.9)' }}
                        onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
                    >
                        {btn.icon}
                        {btn.linkLabel}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Announcement