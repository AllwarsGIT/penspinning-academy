"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Trick, Instance, Modifier } from "@/types/types"
import FilterSection from "./filterSection"

type FilterSidebarProps = {
    trickNames: Trick[]
    trickInstances: Instance[]
    modifiers: Modifier[]
}

function FilterSidebar({ trickNames, trickInstances, modifiers }: FilterSidebarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const activeFamilies = searchParams.get("family")?.split(",").filter(Boolean) ?? []
    const activeDifficulties = searchParams.get("difficulty")?.split(",").filter(Boolean) ?? []
    const activeModifiers = searchParams.get("modifiers")?.split(",").filter(Boolean) ?? []

    const familyCounts = trickNames.reduce<Record<string, number>>((acc, trick) => {
        trick.families.forEach(f => {
            acc[f] = (acc[f] ?? 0) + 1
        })
        return acc
    }, {})

    const difficultyCounts = trickInstances
        .filter(i => i.modifiers.includes("normal"))
        .reduce<Record<string, number>>((acc, i) => {
            acc[i.difficulty] = (acc[i.difficulty] ?? 0) + 1
            return acc
        }, {})

    // Cuántas instances usan cada modifier — "normal" queda fuera porque es
    // el estado base (sin modificar), no algo que tenga sentido filtrar
    const modifierCounts = trickInstances.reduce<Record<string, number>>((acc, i) => {
        i.modifiers.forEach(m => {
            if (m === "normal") return
            acc[m] = (acc[m] ?? 0) + 1
        })
        return acc
    }, {})

    const toggleFamily = (family: string) => {
        const newFamilies = activeFamilies.includes(family)
            ? activeFamilies.filter(f => f !== family)
            : [...activeFamilies, family]

        const params = new URLSearchParams(searchParams.toString())
        if (newFamilies.length > 0) params.set("family", newFamilies.join(","))
        else params.delete("family")

        router.replace(`/tricks?${params.toString()}`, { scroll: false })
    }

    const toggleDifficulty = (difficulty: string) => {
        const newDifficulties = activeDifficulties.includes(difficulty)
            ? activeDifficulties.filter(d => d !== difficulty)
            : [...activeDifficulties, difficulty]

        const params = new URLSearchParams(searchParams.toString())
        if (newDifficulties.length > 0) params.set("difficulty", newDifficulties.join(","))
        else params.delete("difficulty")

        router.replace(`/tricks?${params.toString()}`, { scroll: false })
    }

    const toggleModifier = (modifierId: string) => {
        const newModifiers = activeModifiers.includes(modifierId)
            ? activeModifiers.filter(m => m !== modifierId)
            : [...activeModifiers, modifierId]

        const params = new URLSearchParams(searchParams.toString())
        if (newModifiers.length > 0) params.set("modifiers", newModifiers.join(","))
        else params.delete("modifiers")

        router.replace(`/tricks?${params.toString()}`, { scroll: false })
    }

    return (
        <aside className="w-full md:w-64 shrink-0">
            <FilterSection title="Difficulty">
                {Object.entries(difficultyCounts).map(([difficulty, count]) => (
                    <label key={difficulty} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                            type="checkbox"
                            checked={activeDifficulties.includes(difficulty)}
                            onChange={() => toggleDifficulty(difficulty)}
                            className="cursor-pointer"
                        />
                        <span className="capitalize">{difficulty}</span>
                        <span className="text-gray-400">({count})</span>
                    </label>
                ))}
            </FilterSection>
            
            <FilterSection title="Family">
                {Object.entries(familyCounts).map(([family, count]) => (
                    <label key={family} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                            type="checkbox"
                            checked={activeFamilies.includes(family)}
                            onChange={() => toggleFamily(family)}
                            className="cursor-pointer"
                        />
                        <span className="capitalize">{family}</span>
                        <span className="text-gray-400">({count})</span>
                    </label>
                ))}
            </FilterSection>

            <FilterSection title="Modifiers">
                {Object.entries(modifierCounts).map(([modifierId, count]) => {
                    const modDef = modifiers.find(m => m.id === modifierId)
                    return (
                        <label key={modifierId} className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                                type="checkbox"
                                checked={activeModifiers.includes(modifierId)}
                                onChange={() => toggleModifier(modifierId)}
                                className="cursor-pointer"
                            />
                            <span>{modDef?.name ?? modifierId}</span>
                            <span className="text-gray-400">({count})</span>
                        </label>
                    )
                })}
            </FilterSection>
        </aside>
    )
}

export default FilterSidebar