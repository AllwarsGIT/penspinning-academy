// components/DiscordButton.tsx
"use  client"
import { FaDiscord } from "react-icons/fa"

type DiscordButtonProps = {
    inviteCode: string
    label?: string
}

export default function DiscordButton({ inviteCode, label = "Join our Discord" }: DiscordButtonProps) {
    return (
        <a
            href={`https://discord.gg/${inviteCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-white rounded-xl font-bold transition-all duration-200"
            style={{ 
                backgroundColor: '#5865F2',
                boxShadow: '0 4px 0 0 #4752c4'
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.9)' }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
        >
            <FaDiscord size={25} />
            {label}
        </a>
    )
}