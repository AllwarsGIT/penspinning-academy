import React from 'react'

type DifficultyBadgeProps = {
    badge?: string

}

const difficultyColor: Record<string, string> = {
    fundamental: "#3b82f6",
    beginner: "#22c55e",
    intermediate: "#eab308",
    advanced: "#f97316",
    expert: "#8b5cf6"
}

function DifficultyBadge({ badge="" }:DifficultyBadgeProps) {
    const color = badge ? difficultyColor[badge] : undefined;


    return (
        <>
           {badge && (
                <span 
                    className="text-xs uppercase tracking-widest font-mono w-fit px-2 py-0.5 rounded-full"
                    style={{ 
                        color: color,
                        backgroundColor: `${color}20`,
                        border: `1px solid ${color}90`
                    }}
                >
                    {badge}
                </span>
            )} 
        </>
    )
}

export default DifficultyBadge
