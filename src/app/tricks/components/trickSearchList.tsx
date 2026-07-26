"use client"
import TrickNameCard from "@/components/trickNameCard"
import { Trick, Instance, Modifier } from "@/types/types"
import { useFilteredTricks } from "./../hooks/useFilteredTricks"

type TrickSearchListProps = {
    trickNames: Trick[]
    trickInstances: Instance[]
    modifiers: Modifier[]
}

function TrickSearchList({ trickNames, trickInstances, modifiers }: TrickSearchListProps) {
    const results = useFilteredTricks(trickNames, trickInstances)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center">No tricks found.</p>
            ) : (
                results.map(({ trick, instance, baseThumb }, i) => (
                    <TrickNameCard
                        key={`${trick!.slug}-${instance.modifiers.join("-")}-${i}`}
                        trickName={trick!.name}
                        thumbnail={baseThumb?.thumbnail || "/defaultThumbnail.jpeg"}
                        thumbnailHand={baseThumb?.thumbnailHand ?? "left"}
                        badge={instance.difficulty}
                        families={trick!.families}
                        modifiers={modifiers}
                        instance={instance}
                    />
                ))
            )}
        </div>
    )
}

export default TrickSearchList