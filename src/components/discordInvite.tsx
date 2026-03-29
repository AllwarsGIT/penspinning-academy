// components/DiscordButton.tsx
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
            className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-lg transition-colors font-bold max-w-100"
        >
            <FaDiscord size={25} />
            {label}
        </a>
    )
}