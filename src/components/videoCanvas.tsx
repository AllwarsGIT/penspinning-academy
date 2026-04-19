"use client"
import { useEffect, useRef } from "react"

type VideoCanvasProps = {
    src: string
    className?: string
}

export default function VideoCanvas({ src, className }: VideoCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const video = videoRef.current
        if (!canvas || !video) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let rafId: number

        const draw = () => {
            if (video.readyState >= 2) {
                canvas.width = canvas.offsetWidth
                canvas.height = canvas.offsetHeight
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            }
            rafId = requestAnimationFrame(draw)
        }

        video.addEventListener("canplay", () => {
            video.play()
            rafId = requestAnimationFrame(draw)
        })

        return () => {
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <>
            <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                preload="auto"
                className="hidden"
            />
            <canvas
                ref={canvasRef}
                className={className}
                // style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
        </>
    )
}