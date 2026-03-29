"use client"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"

declare global {
    interface Window { __lenis: Lenis }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    useEffect(() => {
        const handlePopState = () => window.scrollTo(0, 0)
        window.addEventListener("popstate", handlePopState)
        return () => window.removeEventListener("popstate", handlePopState)
    }, [])

    useEffect(() => {
        const lenis = new Lenis()
        lenisRef.current = lenis
        window.__lenis = lenis

        console.log("Lenis iniciado:", window.__lenis) // comprueba que se inicia

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        return () => {
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    return <>{children}</>
}