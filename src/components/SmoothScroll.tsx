"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
const pathname = usePathname()

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

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])
    

    return <>{children}</>
}