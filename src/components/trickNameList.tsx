import React from 'react'
import TrickNameCard from "@/components/trickNameCard"
import { Trick, Instance, Modifier } from "@/types/types"



type TrickNameListProps = {
    difficulty?: string
    trickNames: Trick[]
    trickInstances: Instance[]
}


function TrickNameList({ difficulty, trickNames, trickInstances }: TrickNameListProps) {

    const validInstances = trickInstances.filter(i =>
        i.modifiers.includes("normal") &&
        (!difficulty || i.difficulty === difficulty)
    )

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {trickNames.map(trick => {
                const hasInstance = validInstances.some(i =>
                    i.idTrickName === trick.slug  // o trick.id según cómo relaciones
                )

                if (!hasInstance) return null

                return (
                    <TrickNameCard
                        key={trick.slug} // mejor usar slug único
                        href={`/tricks/${trick.slug}`}
                        title={trick.name}
                        thumbnail="/learnPortraitUpscaled.jpeg"
                        badge={difficulty}
                        families={trick.families}
                    />
                )
            })}
        </div>
    )
}

export default TrickNameList