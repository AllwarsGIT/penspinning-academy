import React from 'react'

type InfoCardProps = {
    number: number
    name: string,
    description: string,
    color: string,
    active: boolean
    onClick?: () => void
}

function InfoCard({ number=0 ,name="", description="", color="", active=false, onClick  }: InfoCardProps) {
    return (
        <div 
            className={`group relative rounded-xl p-6 transition-all duration-500 h-full ${active ? 'cursor-pointer' : ''}`}
            onClick={onClick}
            style={{ 
                border: active ? `1px solid ${color}` : `1px solid ${color}50`,
                backgroundColor: `${color}15`,
            }}
            onMouseEnter={e => { if (active) e.currentTarget.style.backgroundColor = `${color}30` }}
            onMouseLeave={e => { if (active) e.currentTarget.style.backgroundColor = `${color}15` }}
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
                {active ? '' :
                 <h5 className="text-sm text-gray-500">
                    - Coming soon
                </h5> }
                
            </div>
            <p className={`text-sm leading-relaxed  ${active ? 'text-gray-800 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                {description}
            </p>
        </div>
    )
}

export default InfoCard
