"use client"
import { createContext, useContext, useState, useEffect } from "react"

type DominantHandContextType = {
    isLeftHanded: boolean
    toggleHand: () => void
}

const DominantHandContext = createContext<DominantHandContextType>({
    isLeftHanded: false,
    toggleHand: () => {}
})

export function DominantHandProvider({ children }: { children: React.ReactNode }) {
    const [isLeftHanded, setIsLeftHanded] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("dominantHand")
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (saved) setIsLeftHanded(saved === "left")
    }, [])

    const toggleHand = () => {
        setIsLeftHanded(prev => {
            const newValue = !prev
            localStorage.setItem("dominantHand", newValue ? "left" : "right")
            return newValue
        })
    }

    return (
        <DominantHandContext.Provider value={{ isLeftHanded, toggleHand }}>
            {children}
        </DominantHandContext.Provider>
    )
}

export const useDominantHand = () => useContext(DominantHandContext)