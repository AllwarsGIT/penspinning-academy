"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Trick, Instance, Modifier } from "@/types/types"
import FilterSection from "./filterSection"
import { useLearnedTricks } from "@/app/providers/learnedTricksProvider"

type FilterSidebarProps = {
    trickNames: Trick[]
    trickInstances: Instance[]
    modifiers: Modifier[]
}

const LEARNED = "learned"
const NOT_LEARNED = "not_learned"
const REGULAR_MODIFIER = "__regular__"

type FilterKey = "progress" | "difficulty" | "family" | "modifiers"

const FILTER_STORAGE_KEY = "tricks-filter-open-state"

const DEFAULT_OPEN_FILTERS: Record<FilterKey, boolean> = {
    progress: true,
    difficulty: true,
    family: true,
    modifiers: true,
}

function FilterSidebar({
    trickNames,
    trickInstances,
    modifiers,
}: FilterSidebarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { isLearned, mounted } = useLearnedTricks()

    const [openFilters, setOpenFilters] =
        useState<Record<FilterKey, boolean>>(() => {
            const saved = localStorage.getItem(FILTER_STORAGE_KEY)

            if (!saved) return DEFAULT_OPEN_FILTERS

            try {
                const parsed = JSON.parse(saved)

                return {
                    ...DEFAULT_OPEN_FILTERS,
                    ...parsed,
                }
            } catch {
                localStorage.removeItem(FILTER_STORAGE_KEY)
                return DEFAULT_OPEN_FILTERS
            }
        })

    const toggleFilter = (filter: FilterKey) => {
        setOpenFilters(prev => {
            const next = {
                ...prev,
                [filter]: !prev[filter],
            }

            localStorage.setItem(
                FILTER_STORAGE_KEY,
                JSON.stringify(next)
            )

            return next
        })
    }

    const activeFamilies =
        searchParams.get("family")?.split(",").filter(Boolean) ?? []

    const activeDifficulties =
        searchParams.get("difficulty")?.split(",").filter(Boolean) ?? []

    const activeModifiers =
        searchParams.get("modifiers")?.split(",").filter(Boolean) ?? []

    const activeLearned =
        searchParams.get("learned")?.split(",").filter(Boolean) ?? []

    const q = (searchParams.get("q") ?? "").toLowerCase().trim()

    const trickMap = new Map(
        trickNames.map(trick => [trick.slug, trick])
    )

    const getInstanceId = (instance: Instance) =>
        instance.modifiers.length > 0
            ? `${instance.idTrickName}:${[...instance.modifiers]
                  .sort()
                  .join(",")}`
            : instance.idTrickName

    const matchesCurrentFilters = (
        trick: Trick,
        instance: Instance,
        options: {
            excludeFamily?: boolean
            excludeDifficulty?: boolean
            excludeModifier?: boolean
            excludeLearned?: boolean
        } = {}
    ) => {
        if (q && !trick.name.toLowerCase().includes(q)) {
            return false
        }

        if (
            !options.excludeFamily &&
            activeFamilies.length > 0 &&
            !activeFamilies.some(f =>
                trick.families.includes(f)
            )
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

        if (
            !options.excludeLearned &&
            activeLearned.length > 0 &&
            mounted
        ) {
            const learned = isLearned(getInstanceId(instance))

            const matchesLearned = activeLearned.some(l =>
                l === LEARNED ? learned : !learned
            )

            if (!matchesLearned) {
                return false
            }
        }

        return true
    }

    const familyCounts = trickNames.reduce<Record<string, number>>(
        (acc, trick) => {
            trick.families.forEach(family => {
                const hasVisibleMatch = trickInstances.some(instance => {
                    if (instance.idTrickName !== trick.slug) {
                        return false
                    }

                    return (
                        matchesCurrentFilters(
                            trick,
                            instance,
                            { excludeFamily: true }
                        ) &&
                        trick.families.includes(family)
                    )
                })

                if (hasVisibleMatch) {
                    acc[family] = (acc[family] ?? 0) + 1
                }
            })

            return acc
        },
        {}
    )

    const difficultyCounts = trickInstances.reduce<Record<string, number>>(
        (acc, instance) => {
            const trick = trickMap.get(instance.idTrickName)

            if (!trick) {
                return acc
            }

            if (
                matchesCurrentFilters(
                    trick,
                    instance,
                    { excludeDifficulty: true }
                )
            ) {
                acc[instance.difficulty] =
                    (acc[instance.difficulty] ?? 0) + 1
            }

            return acc
        },
        {}
    )

    const modifierCounts = trickInstances.reduce<Record<string, number>>(
        (acc, instance) => {
            const trick = trickMap.get(instance.idTrickName)

            if (!trick) {
                return acc
            }

            if (
                !matchesCurrentFilters(
                    trick,
                    instance,
                    { excludeModifier: true }
                )
            ) {
                return acc
            }

            if (instance.modifiers.length === 0) {
                acc[REGULAR_MODIFIER] =
                    (acc[REGULAR_MODIFIER] ?? 0) + 1
            } else {
                instance.modifiers.forEach(modifierId => {
                    acc[modifierId] =
                        (acc[modifierId] ?? 0) + 1
                })
            }

            return acc
        },
        {}
    )

    const learnedCounts = trickInstances.reduce<Record<string, number>>(
        (acc, instance) => {
            const trick = trickMap.get(instance.idTrickName)

            if (!trick) {
                return acc
            }

            if (
                !matchesCurrentFilters(
                    trick,
                    instance,
                    { excludeLearned: true }
                )
            ) {
                return acc
            }

            const key =
                mounted &&
                isLearned(getInstanceId(instance))
                    ? LEARNED
                    : NOT_LEARNED

            acc[key] = (acc[key] ?? 0) + 1

            return acc
        },
        {}
    )

    const updateParams = (key: string, values: string[]) => {
        const params = new URLSearchParams(
            searchParams.toString()
        )

        if (values.length > 0) {
            params.set(key, values.join(","))
        } else {
            params.delete(key)
        }

        router.replace(
            `/tricks?${params.toString()}`,
            { scroll: false }
        )
    }

    const toggleFamily = (family: string) => {
        const newFamilies = activeFamilies.includes(family)
            ? activeFamilies.filter(f => f !== family)
            : [...activeFamilies, family]

        updateParams("family", newFamilies)
    }

    const toggleDifficulty = (difficulty: string) => {
        const newDifficulties =
            activeDifficulties.includes(difficulty)
                ? activeDifficulties.filter(
                      d => d !== difficulty
                  )
                : [...activeDifficulties, difficulty]

        updateParams("difficulty", newDifficulties)
    }

    const toggleModifier = (modifierId: string) => {
        const newModifiers =
            activeModifiers.includes(modifierId)
                ? activeModifiers.filter(
                      m => m !== modifierId
                  )
                : [...activeModifiers, modifierId]

        updateParams("modifiers", newModifiers)
    }

    const toggleLearned = (value: string) => {
        const newLearned =
            activeLearned.includes(value)
                ? activeLearned.filter(
                      l => l !== value
                  )
                : [...activeLearned, value]

        updateParams("learned", newLearned)
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
            ...activeFamilies,
        ]),
    ].sort((a, b) => a.localeCompare(b))

    const difficultyOptions = [
        ...new Set([
            ...trickInstances.map(
                instance => instance.difficulty
            ),
            ...activeDifficulties,
        ]),
    ]

    const modifierOptions = [
        ...new Set([
            REGULAR_MODIFIER,
            ...modifiers.map(m => m.id),
            ...activeModifiers,
        ]),
    ].sort((a, b) => {
        const labelA =
            modifiers.find(
                modifier => modifier.id === a
            )?.name ?? a

        const labelB =
            modifiers.find(
                modifier => modifier.id === b
            )?.name ?? b

        return labelA.localeCompare(labelB)
    })

    const renderFilterOption = (
        value: string,
        isActive: boolean,
        count: number,
        label: string,
        onToggle: () => void
    ) => {
        const disabled = count === 0 && !isActive

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
                    className={
                        disabled
                            ? "text-gray-400 dark:text-gray-500"
                            : ""
                    }
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
        <aside className="w-full md:w-64 shrink-0 sticky top-31 self-start h-fit z-40 bg-white dark:bg-black">

            <FilterSection
                title="Progress"
                isOpen={openFilters.progress}
                onToggle={() => toggleFilter("progress")}
            >
                {renderFilterOption(
                    LEARNED,
                    activeLearned.includes(LEARNED),
                    learnedCounts[LEARNED] ?? 0,
                    "Completed",
                    () => toggleLearned(LEARNED)
                )}

                {renderFilterOption(
                    NOT_LEARNED,
                    activeLearned.includes(NOT_LEARNED),
                    learnedCounts[NOT_LEARNED] ?? 0,
                    "Not completed",
                    () => toggleLearned(NOT_LEARNED)
                )}
            </FilterSection>

            <FilterSection
                title="Difficulty"
                isOpen={openFilters.difficulty}
                onToggle={() => toggleFilter("difficulty")}
            >
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

            <FilterSection
                title="Family"
                isOpen={openFilters.family}
                onToggle={() => toggleFilter("family")}
            >
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

            <FilterSection
                title="Modifiers"
                isOpen={openFilters.modifiers}
                onToggle={() => toggleFilter("modifiers")}
            >
                <div
                    data-lenis-prevent
                    className="max-h-64 overflow-y-auto pr-1 flex flex-col gap-1"
                >
                    {modifierOptions.map(modifierId => {
                        const label =
                            modifierId === REGULAR_MODIFIER
                                ? "Unmodified"
                                : modifiers.find(
                                      m => m.id === modifierId
                                  )?.name ?? modifierId

                        return renderFilterOption(
                            modifierId,
                            activeModifiers.includes(
                                modifierId
                            ),
                            modifierCounts[
                                modifierId
                            ] ?? 0,
                            label,
                            () =>
                                toggleModifier(
                                    modifierId
                                )
                        )
                    })}
                </div>
            </FilterSection>

        </aside>
    )
}

export default FilterSidebar