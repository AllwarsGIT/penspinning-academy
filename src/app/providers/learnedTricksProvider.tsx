"use client"
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

type LearnedTricksContextType = {
    isLearned: (trickId: string) => boolean
    toggleLearned: (trickId: string) => void
    learnedCount: number
    mounted: boolean
}

const LearnedTricksContext = createContext<LearnedTricksContextType | null>(null)
const STORAGE_KEY = "psa:learnedTricks"

export function LearnedTricksProvider({ children }: { children: React.ReactNode }) {
    const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set())
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
        // eslint-disable-next-line react-hooks/set-state-in-effect
            if (stored) setLearnedIds(new Set(JSON.parse(stored)))
        } catch {
            // localStorage no disponible (modo privado, SSR raro) o JSON corrupto —
            // arranca vacío en vez de romper la app.
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    const persist = useCallback((next: Set<string>) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
        } catch {
            // Si falla el guardado, el estado en memoria sigue funcionando esta sesión,
            // solo no sobrevive a un refresh.
        }
    }, [])

    const toggleLearned = useCallback((trickId: string) => {
        setLearnedIds(prev => {
            const next = new Set(prev)
            next.has(trickId) ? next.delete(trickId) : next.add(trickId)
            persist(next)
            return next
        })
    }, [persist])

    const isLearned = useCallback((trickId: string) => learnedIds.has(trickId), [learnedIds])

    // learnedCount se deriva de learnedIds.size, no es una variable propia —
    // por eso va como dependencia learnedIds, no learnedCount (que no existe aquí).
    const value = useMemo(
        () => ({ isLearned, toggleLearned, learnedCount: learnedIds.size, mounted }),
        [isLearned, toggleLearned, learnedIds, mounted]
    )

    return (
        <LearnedTricksContext.Provider value={value}>
            {children}
        </LearnedTricksContext.Provider>
    )
}

export function useLearnedTricks() {
    const ctx = useContext(LearnedTricksContext)
    if (!ctx) throw new Error("useLearnedTricks must be used within LearnedTricksProvider")
    return ctx
}