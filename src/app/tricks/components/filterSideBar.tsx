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
    const REGULAR_MODIFIER = "__regular__"

    const activeFamilies = searchParams.get("family")?.split(",").filter(Boolean) ?? []
    const activeDifficulties = searchParams.get("difficulty")?.split(",").filter(Boolean) ?? []
    const activeModifiers = searchParams.get("modifiers")?.split(",").filter(Boolean) ?? []
    const q = (searchParams.get("q") ?? "").toLowerCase().trim()

    const trickMap = new Map(trickNames.map(trick => [trick.slug, trick]))

    const matchesCurrentFilters = (
        trick: Trick,
        instance: Instance,
        options: {
            excludeFamily?: boolean
            excludeDifficulty?: boolean
            excludeModifier?: boolean
        } = {}
    ) => {
        if (q && !trick.name.toLowerCase().includes(q)) return false

        if (
            !options.excludeFamily &&
            activeFamilies.length > 0 &&
            !activeFamilies.some(f => trick.families.includes(f))
        ) {
            return false
        }

        if (
            !options.excludeDifficulty &&
            activeDifficulties.length > 0 &&
            !activeDifficulties.includes(instance.difficulty)
        ) {
            return false
        }

        if (
            !options.excludeModifier &&
            activeModifiers.length > 0 &&
            !activeModifiers.some(m =>
                m === REGULAR_MODIFIER
                    ? instance.modifiers.length === 0
                    : instance.modifiers.includes(m)
            )
        ) {
            return false
        }

        return true
    }

    const familyCounts = trickNames.reduce<Record<string, number>>((acc, trick) => {
        trick.families.forEach(family => {
            const hasVisibleMatch = trickInstances.some(instance => {
                if (instance.idTrickName !== trick.slug) return false

                return (
                    matchesCurrentFilters(trick, instance, { excludeFamily: true }) &&
                    trick.families.includes(family)
                )
            })

            if (hasVisibleMatch) {
                acc[family] = (acc[family] ?? 0) + 1
            }
        })

        return acc
    }, {})

    const difficultyCounts = trickInstances.reduce<Record<string, number>>((acc, instance) => {
        const trick = trickMap.get(instance.idTrickName)
        if (!trick) return acc

        if (matchesCurrentFilters(trick, instance, { excludeDifficulty: true })) {
            acc[instance.difficulty] = (acc[instance.difficulty] ?? 0) + 1
        }

        return acc
    }, {})

    const modifierCounts = trickInstances.reduce<Record<string, number>>((acc, instance) => {
        const trick = trickMap.get(instance.idTrickName)
        if (!trick) return acc

        if (!matchesCurrentFilters(trick, instance, { excludeModifier: true })) {
            return acc
        }

        if (instance.modifiers.length === 0) {
            acc[REGULAR_MODIFIER] = (acc[REGULAR_MODIFIER] ?? 0) + 1
        } else {
            instance.modifiers.forEach(modifierId => {
                acc[modifierId] = (acc[modifierId] ?? 0) + 1
            })
        }

        return acc
    }, {})

    const toggleFamily = (family: string) => {
        const newFamilies = activeFamilies.includes(family)
            ? activeFamilies.filter(f => f !== family)
            : [...activeFamilies, family]

        const params = new URLSearchParams(searchParams.toString())

        if (newFamilies.length > 0) {
            params.set("family", newFamilies.join(","))
        } else {
            params.delete("family")
        }

        router.replace(`/tricks?${params.toString()}`, { scroll: false })
    }

    const toggleDifficulty = (difficulty: string) => {
        const newDifficulties = activeDifficulties.includes(difficulty)
            ? activeDifficulties.filter(d => d !== difficulty)
            : [...activeDifficulties, difficulty]

        const params = new URLSearchParams(searchParams.toString())

        if (newDifficulties.length > 0) {
            params.set("difficulty", newDifficulties.join(","))
        } else {
            params.delete("difficulty")
        }

        router.replace(`/tricks?${params.toString()}`, { scroll: false })
    }

    const toggleModifier = (modifierId: string) => {
        const newModifiers = activeModifiers.includes(modifierId)
            ? activeModifiers.filter(m => m !== modifierId)
            : [...activeModifiers, modifierId]

        const params = new URLSearchParams(searchParams.toString())

        if (newModifiers.length > 0) {
            params.set("modifiers", newModifiers.join(","))
        } else {
            params.delete("modifiers")
        }

        router.replace(`/tricks?${params.toString()}`, { scroll: false })
    }

    const countClassName = (count: number) => {
        if (count === 0) {
            return "text-gray-400 dark:text-gray-500"
        }

        return q
            ? "text-blue-500 dark:text-blue-400"
            : "text-gray-400"
    }

    const familyOptions = [
        ...new Set([
            ...trickNames.flatMap(trick => trick.families),
            ...activeFamilies
        ])
    ].sort((a, b) => a.localeCompare(b))

    const difficultyOptions = [
        ...new Set([
            ...trickInstances.map(instance => instance.difficulty),
            ...activeDifficulties
        ])
    ]

    const modifierOptions = [
    ...new Set([
        REGULAR_MODIFIER,
        ...modifiers.map(m => m.id),
        ...activeModifiers
    ])
    ].sort((a, b) => {
        const labelA = modifiers.find(modifier => modifier.id === a)?.name ?? a
        const labelB = modifiers.find(modifier => modifier.id === b)?.name ?? b
        return labelA.localeCompare(labelB)
    })

    const renderFilterOption = (
        value: string,
        isActive: boolean,
        count: number,
        label: string,
        onToggle: () => void
    ) => {
        const disabled = count === 0

        return (
            <label
                key={value}
                className={`flex items-center gap-2 text-sm ${
                    disabled
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                }`}
            >
                <input
                    type="checkbox"
                    checked={isActive}
                    disabled={disabled}
                    onChange={onToggle}
                    className="cursor-pointer disabled:cursor-not-allowed"
                />

                <span
                    className={`capitalize ${
                        disabled
                            ? "text-gray-400 dark:text-gray-500"
                            : ""
                    }`}
                >
                    {label}
                </span>

                <span className={countClassName(count)}>
                    ({count})
                </span>
            </label>
        )
    }

    return (
        <aside className="w-full md:w-64 shrink-0 sticky top-31 self-start h-fit max-h-[calc(100vh-64px)] overflow-y-auto z-10 bg-white dark:bg-black">
            <FilterSection title="Difficulty">
                {difficultyOptions.map(difficulty =>
                    renderFilterOption(
                        difficulty,
                        activeDifficulties.includes(difficulty),
                        difficultyCounts[difficulty] ?? 0,
                        difficulty,
                        () => toggleDifficulty(difficulty)
                    )
                )}
            </FilterSection>

            <FilterSection title="Family">
                {familyOptions.map(family =>
                    renderFilterOption(
                        family,
                        activeFamilies.includes(family),
                        familyCounts[family] ?? 0,
                        family,
                        () => toggleFamily(family)
                    )
                )}
            </FilterSection>

            <FilterSection title="Modifiers">
                {modifierOptions.map(modifierId => {
                    const label =
                        modifierId === REGULAR_MODIFIER
                            ? "Unmodified"
                            : modifiers.find(m => m.id === modifierId)?.name ?? modifierId

                    return renderFilterOption(
                        modifierId,
                        activeModifiers.includes(modifierId),
                        modifierCounts[modifierId] ?? 0,
                        label,
                        () => toggleModifier(modifierId)
                    )
                })}
            </FilterSection>
        </aside>
    )
}

export default FilterSidebar