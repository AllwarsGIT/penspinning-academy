import { useSyncExternalStore, useCallback } from "react"

const listeners = new Map<string, Set<() => void>>()

function notify(key: string) {
    listeners.get(key)?.forEach(listener => listener())
}

function subscribe(key: string) {
    return (callback: () => void) => {
        if (!listeners.has(key)) listeners.set(key, new Set())
        listeners.get(key)!.add(callback)
        return () => listeners.get(key)!.delete(callback)
    }
}

// defaultCollapsed=true por defecto: si no hay nada guardado, empieza colapsado
export function usePersistentCollapse(storageKey: string, defaultCollapsed = true) {
    const getSnapshot = useCallback(() => {
        const stored = localStorage.getItem(storageKey)
        if (stored === null) return defaultCollapsed
        return stored === "true"
    }, [storageKey, defaultCollapsed])

    const getServerSnapshot = useCallback(() => defaultCollapsed, [defaultCollapsed])

    const collapsed = useSyncExternalStore(subscribe(storageKey), getSnapshot, getServerSnapshot)

    const setCollapsed = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
        const current = getSnapshot()
        const next = typeof value === "function" ? (value as (prev: boolean) => boolean)(current) : value
        localStorage.setItem(storageKey, String(next))
        notify(storageKey)
    }, [storageKey, getSnapshot])

    return [collapsed, setCollapsed] as const
}