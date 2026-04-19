import React from 'react'
import Link from 'next/link'
import { FaDiscord } from 'react-icons/fa'

type AnnouncementProps = {
    title: string
    description: string
    link: string
    linkLabel: string
    icon?: React.ReactNode
    color?: string
    shadowColor?: string
}

function Announcement({ title, description, link, linkLabel, icon, color = '#5865F2', shadowColor = '#4752c499' }: AnnouncementProps) {
    return (
        <div className="flex flex-col rounded-2xl p-5 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 transition-colors ease-in-out duration-500">
            <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white mb-3">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
            <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm transition-all duration-200"
                style={{ 
                    backgroundColor: color,
                    boxShadow: `0 4px 0 0 ${shadowColor}`
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.9)' }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
            >
                {icon}
                {linkLabel}
            </Link>
        </div>
    )
}

export default Announcement