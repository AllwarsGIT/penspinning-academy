"use client"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Trick, Instance } from "@/types/types"
import { useLearnedTricks } from "@/app/providers/learnedTricksProvider"

const LEARNED = "learned"
const NOT_LEARNED = "not_learned"

export function useFilteredTricks(trickNames: Trick[], trickInstances: Instance[]) {
    const searchParams = useSearchParams()
    const { isLearned, mounted } = useLearnedTricks()

    const q = (searchParams.get("q") ?? "").toLowerCase().trim()
    const activeFamilies = searchParams.get("family")?.split(",").filter(Boolean) ?? []
    const activeDifficulties = searchParams.get("difficulty")?.split(",").filter(Boolean) ?? []
    const activeModifiers = searchParams.get("modifiers")?.split(",").filter(Boolean) ?? []
    const activeLearned = searchParams.get("learned")?.split(",").filter(Boolean) ?? []
    const REGULAR_MODIFIER = "__regular__"

    const trickMap = useMemo(
        () => new Map(trickNames.map(trick => [trick.slug, trick])),
        [trickNames]
    )

    const getInstanceId = (instance: Instance) =>
        instance.modifiers.length > 0
            ? `${instance.idTrickName}:${[...instance.modifiers].sort().join(",")}`
            : instance.idTrickName

    const getBaseKey = (idTrickName: string, modifiers: string[]) =>
        [idTrickName, ...modifiers.filter(m => m !== "reverse").sort()].join("|")

    const baseThumbnails = useMemo(() => {
        return trickInstances.reduce<Record<string, { thumbnail: string, thumbnailHand?: "left" | "right" }>>((acc, i) => {
            if (!i.modifiers.includes("reverse") && i.thumbnail) {
                const key = getBaseKey(i.idTrickName, i.modifiers)
                acc[key] = { thumbnail: i.thumbnail, thumbnailHand: i.thumbnailHand }
            }
            return acc
        }, {})
    }, [trickInstances])

    return useMemo(() => {
        return trickInstances
            .map(instance => {
                const key = getBaseKey(instance.idTrickName, instance.modifiers)
                const trueBaseKey = getBaseKey(instance.idTrickName, [])
                const baseThumb = baseThumbnails[key] ?? baseThumbnails[trueBaseKey]

                return {
                    trick: trickMap.get(instance.idTrickName),
                    instance,
                    baseThumb
                }
            })
            .filter(({ trick, instance }) => {
                if (!trick) return false
                if (q && !trick.name.toLowerCase().includes(q)) return false
                if (activeFamilies.length > 0 && !activeFamilies.some(f => trick.families.includes(f))) return false
                if (activeDifficulties.length > 0 && !activeDifficulties.includes(instance.difficulty)) return false
                if (
                    activeModifiers.length > 0 &&
                    !activeModifiers.some(m =>
                        m === REGULAR_MODIFIER
                            ? instance.modifiers.length === 0
                            : instance.modifiers.includes(m)
                    )
                ) {
                    return false
                }
                if (activeLearned.length > 0 && mounted) {
                    const learned = isLearned(getInstanceId(instance))
                    const matchesLearned = activeLearned.some(l =>
                        l === LEARNED ? learned : !learned
                    )
                    if (!matchesLearned) return false
                }
                return true
            })
    }, [activeDifficulties, activeFamilies, activeLearned, activeModifiers, baseThumbnails, isLearned, mounted, q, trickInstances, trickMap])
}