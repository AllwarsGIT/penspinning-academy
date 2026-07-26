"use client"
import { useSearchParams } from "next/navigation"
import { Trick, Instance } from "@/types/types"

export function useFilteredTricks(trickNames: Trick[], trickInstances: Instance[]) {
    const searchParams = useSearchParams()
    const q = (searchParams.get("q") ?? "").toLowerCase().trim()
    const activeFamilies = searchParams.get("family")?.split(",").filter(Boolean) ?? []
    const activeDifficulties = searchParams.get("difficulty")?.split(",").filter(Boolean) ?? []
    const activeModifiers = searchParams.get("modifiers")?.split(",").filter(Boolean) ?? []

    const getBaseKey = (idTrickName: string, modifiers: string[]) =>
        [idTrickName, ...modifiers.filter(m => m !== "reverse").sort()].join("|")

    const baseThumbnails = trickInstances.reduce<Record<string, { thumbnail: string, thumbnailHand?: "left" | "right" }>>((acc, i) => {
        if (!i.modifiers.includes("reverse") && i.thumbnail) {
            const key = getBaseKey(i.idTrickName, i.modifiers)
            acc[key] = { thumbnail: i.thumbnail, thumbnailHand: i.thumbnailHand }
        }
        return acc
    }, {})

    const results = trickInstances
        .map(instance => {
            const key = getBaseKey(instance.idTrickName, instance.modifiers)
            const trueBaseKey = getBaseKey(instance.idTrickName, [])
            const baseThumb = baseThumbnails[key] ?? baseThumbnails[trueBaseKey]
            return {
                trick: trickNames.find(t => t.slug === instance.idTrickName),
                instance,
                baseThumb
            }
        })
        .filter(({ trick, instance }) => {
            if (!trick) return false
            if (q && !trick.name.toLowerCase().includes(q)) return false
            if (activeFamilies.length > 0 && !activeFamilies.some(f => trick.families.includes(f))) return false
            if (activeDifficulties.length > 0 && !activeDifficulties.includes(instance.difficulty)) return false
            if (activeModifiers.length > 0 && !activeModifiers.some(m => instance.modifiers.includes(m))) return false
            return true
        })

    return results
}