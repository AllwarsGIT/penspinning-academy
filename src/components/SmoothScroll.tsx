// "use client"

// import { useEffect, useRef } from "react"
// import { usePathname } from "next/navigation"
// import Lenis from "lenis"

// export default function SmoothScroll({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname()
//   const lenisRef = useRef<Lenis | null>(null)
//   const rafRef = useRef<number | null>(null)

//   useEffect(() => {
//     window.scrollTo({ top: 0, left: 0, behavior: "auto" })
//     lenisRef.current?.scrollTo(0, { immediate: true })
//   }, [pathname])

//   useEffect(() => {
//     const handlePopState = () => {
//       window.scrollTo({ top: 0, left: 0, behavior: "auto" })
//       lenisRef.current?.scrollTo(0, { immediate: true })
//     }

//     window.addEventListener("popstate", handlePopState)
//     return () => window.removeEventListener("popstate", handlePopState)
//   }, [])

//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.1,
//       smoothWheel: true,
//       wheelMultiplier: 1,
//       touchMultiplier: 1.2,
//       lerp: 0.08,
//     })

//     lenisRef.current = lenis

//     const raf = (time: number) => {
//       lenis.raf(time)
//       rafRef.current = requestAnimationFrame(raf)
//     }

//     rafRef.current = requestAnimationFrame(raf)

//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current)
//       lenis.destroy()
//       lenisRef.current = null
//     }
//   }, [])

//   return <>{children}</>
// }