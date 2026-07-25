"use client"
import { useSearchParams } from "next/navigation"
import TrickNameCard from "@/components/trickNameCard"
import { Trick, Instance, Modifier } from "@/types/types"

type TrickSearchListProps = {
    trickNames: Trick[]
    trickInstances: Instance[]
    modifiers: Modifier[]
}

function TrickSearchList({ trickNames, trickInstances, modifiers }: TrickSearchListProps) {
    const searchParams = useSearchParams()
    const q = (searchParams.get("q") ?? "").toLowerCase().trim()
    const activeFamilies = searchParams.get("family")?.split(",").filter(Boolean) ?? []
    const activeDifficulties = searchParams.get("difficulty")?.split(",").filter(Boolean) ?? []
    const activeModifiers = searchParams.get("modifiers")?.split(",").filter(Boolean) ?? []

    const baseThumbnails = trickInstances.reduce<Record<string, { thumbnail: string, thumbnailHand?: "left" | "right" }>>((acc, i) => {
        if (i.modifiers.includes("normal")) {
            acc[i.idTrickName] = { thumbnail: i.thumbnail, thumbnailHand: i.thumbnailHand }
        }
        return acc
    }, {})

    const results = trickInstances
        .map(instance => ({
            trick: trickNames.find(t => t.slug === instance.idTrickName),
            instance,
            baseThumb: baseThumbnails[instance.idTrickName]
        }))
        .filter(({ trick, instance }) => {
            if (!trick) return false
            if (q && !trick.name.toLowerCase().includes(q)) return false
            // Si hay familias activas, el trick tiene que pertenecer a AL MENOS una
            if (activeFamilies.length > 0 && !activeFamilies.some(f => trick.families.includes(f))) return false
            if (activeDifficulties.length > 0 && !activeDifficulties.includes(instance.difficulty)) return false
            if (activeModifiers.length > 0 && !activeModifiers.some(m => instance.modifiers.includes(m))) return false
            return true
        })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center">No se encontraron trucos.</p>
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