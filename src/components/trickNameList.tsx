import React from 'react'
import TrickNameCard from "@/components/trickNameCard"
import { Trick, Instance, Modifier } from "@/types/types"



type TrickNameListProps = {
    difficulty?: string
    trickNames: Trick[]
    trickInstances: Instance[]
    modifiers: Modifier[]
}


function TrickNameList({ difficulty, trickNames, trickInstances, modifiers }: TrickNameListProps) {

    const validInstances = trickInstances.filter(i =>
        (i.modifiers.includes("normal") || i.isBase === true) &&
        (!difficulty || i.difficulty === difficulty)
    )

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {trickNames.map(trick => {
                const instanceForTrick = validInstances.find(i => i.idTrickName === trick.slug)

                if (!instanceForTrick) return null

                return (
                    <TrickNameCard
                        key={trick.slug}
                        trickName={trick.name}
                        thumbnail={instanceForTrick.thumbnail || "/defaultThumbnail.jpeg"}
                        badge={difficulty}
                        families={trick.families}
                        modifiers={modifiers}
                        instance={instanceForTrick}
                    />
                )
            })}
        </div>
    )
}

export default TrickNameList