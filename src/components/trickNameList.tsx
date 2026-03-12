import React from 'react'
import data from "@/data/trickDatabase.json"
import TrickNameCard from "@/components/trickNameCard"

type TrickNameListProps ={
    difficulty?: string
}

function TrickNameList({ difficulty }: TrickNameListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {data.trickName.map((trick: typeof data.trickName[number]) => {
                const baseInstance = data.trickInstance.find(i =>
                    i.idTrickName === trick.id &&
                    i.modifiers.includes("normal") &&
                    i.difficulty === difficulty
                )
                if (!baseInstance) return null
                return (
                    <TrickNameCard
                        key={trick.id}
                        href={`/tricks/${trick.slug}`}
                        title={trick.name}
                        thumbnail=""
                        badge={difficulty}
                    />
                )
            })}
        </div>
        
    )
}

export default TrickNameList
