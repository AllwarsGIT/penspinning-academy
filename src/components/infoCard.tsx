import React from 'react'

type InfoCardProps = {
    number: number
    name: string,
    description: string,
    color: string
}

function InfoCard({ number=0 ,name="", description="", color="" }: InfoCardProps) {
    return (
        <div 
            className="group relative rounded-xl p-6 transition-all duration-500"
            style={{ 
                border: `1px solid ${color}40`,
                backgroundColor: `${color}15`,
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `${color}`}
            onMouseLeave={e => e.currentTarget.style.borderColor = `${color}40`}
        >
            <div className="flex items-center gap-4 mb-3">
                <span 
                    className="font-mono text-2xl"
                    style={{ color: color }}
                >
                    {number}
                </span>
                <h4 className="text-xl ">
                    {name}
                </h4>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
                {description}
            </p>
        </div>
    )
}

export default InfoCard
