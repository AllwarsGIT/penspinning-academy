import React from 'react'
import { FaXTwitter, FaInstagram, FaYoutube, FaDiscord, FaGlobe } from 'react-icons/fa6'

interface EventProps {
  title: string
  description: string
  twitter?: string
  instagram?: string
  youtube?: string
  discord?: string
  web?: string
}

const links = [
  { key: 'twitter',   label: 'Twitter / X', icon: <FaXTwitter size={14} /> },
  { key: 'instagram', label: 'Instagram',   icon: <FaInstagram size={14} /> },
  { key: 'youtube',   label: 'YouTube',     icon: <FaYoutube size={14} /> },
  { key: 'discord',   label: 'Discord',     icon: <FaDiscord size={14} /> },
  { key: 'web',       label: 'Web',         icon: <FaGlobe size={14} /> },
] as const

function Event({ title, description, twitter, instagram, youtube, discord, web }: EventProps) {
  const urls = { twitter, instagram, youtube, discord, web }
  const activeLinks = links.filter(l => urls[l.key])

  return (
    <div className="flex flex-col w-full rounded-2xl p-5  bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 transition-colors ease-in-out duration-500">
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
          {title}
        </h3>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 justify-self-center">{description}</p>

      {activeLinks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeLinks.map(({ key, label, icon }) => (
            <a
              key={key}
              href={urls[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 transition-colors ease-in-out duration-500 hover:border-gray-400 hover:text-black dark:hover:border-zinc-500 dark:hover:text-white"
            >
              {icon}
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default Event