"use client"
import { useRef, useState, useEffect } from "react"
import { IoIosPause, IoIosPlay } from "react-icons/io"
import { MdFullscreen, MdFullscreenExit } from "react-icons/md"
import { TbFrame} from "react-icons/tb"
import { RiPlayMiniFill, RiPlayReverseFill  } from "react-icons/ri";
import { useDominantHand } from "@/app/providers/dominantHandProvider"
import VideoInfoTooltip from "./VideoInfoTooltip"

type VideoPlayerProps = {
    url: string
    recordedHand?: "left" | "right" // mano de quien grabó el vídeo — por defecto "left"
    fps?: number // fps del vídeo, usado para calcular la duración de un frame en modo frame-by-frame
}

export default function VideoPlayer({ url, recordedHand = "left", fps = 30 }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)

    const { isLeftHanded } = useDominantHand()

    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [speed, setSpeed] = useState(1)

    const frameDuration = 1 / fps

    // La mano del viewer determina si hace falta espejar este vídeo concreto
    const viewerHand = isLeftHanded ? "left" : "right"
    const needsMirror = recordedHand !== viewerHand

    useEffect(() => {
        if (!videoRef.current) return

        videoRef.current.style.transform = needsMirror ? "scaleX(-1)" : "none"
        videoRef.current.style.transformOrigin = "center center"
    }, [needsMirror, url])

    // Limpia el drag si el ratón sale de la ventana o suelta en cualquier sitio
    useEffect(() => {
        const stopDragging = () => { isDragging.current = false }
        window.addEventListener("mouseup", stopDragging)
        document.addEventListener("mouseleave", stopDragging)
        return () => {
            window.removeEventListener("mouseup", stopDragging)
            document.removeEventListener("mouseleave", stopDragging)
        }
    }, [])

    const togglePlay = () => {
        if (!videoRef.current) return

        const video = videoRef.current

        if (!video.paused) {
            video.pause()
            setIsPlaying(false)
        } else {
            // Si el vídeo terminó, volver al inicio
            if (video.ended || video.currentTime >= video.duration) {
                video.currentTime = 0
                setProgress(0)
            }

            video.play()
            setIsPlaying(true)
        }
    }
    const setPlaybackSpeed = (newSpeed: number) => {
        if (!videoRef.current) return
        videoRef.current.playbackRate = newSpeed
        setSpeed(newSpeed)
    }

    const handleTimeUpdate = () => {
        if (!videoRef.current || isDragging.current) return
        const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100
        setProgress(percent)
    }

    const seekToPercent = (clientX: number) => {
        if (!videoRef.current || !progressRef.current) return

        const rect = progressRef.current.getBoundingClientRect()
        const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)

        const video = videoRef.current

        video.currentTime = percent * video.duration

        // Fuerza la actualización del frame en iOS/Android
        if (video.paused) {
            video.pause()
        }

        setProgress(percent * 100)
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        isDragging.current = true
        seekToPercent(e.clientX)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging.current) return
        seekToPercent(e.clientX)
    }

    // Touch support
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        isDragging.current = true
        seekToPercent(e.touches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging.current) return
        seekToPercent(e.touches[0].clientX)
    }

    const handleTouchEnd = () => {
        isDragging.current = false
    }

    const handleFullscreen = async () => {
        if (!containerRef.current) return

        if (document.fullscreenElement) {
            await document.exitFullscreen()
        } else {
            await containerRef.current.requestFullscreen()
        }
    }
    

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    useEffect(() => {
        const syncFullscreen = () => {
            setIsFullscreen(containerRef.current === document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", syncFullscreen)

        return () => {
            document.removeEventListener("fullscreenchange", syncFullscreen)
        }
    }, [])

    const stepFrame = (direction: 1 | -1) => {
        if (!videoRef.current) return
        if (!videoRef.current.paused) {
            videoRef.current.pause()
            setIsPlaying(false)
        }
        const duration = videoRef.current.duration || 0
        const nextTime = Math.min(
            Math.max(videoRef.current.currentTime + direction * frameDuration, 0),
            duration
        )
        videoRef.current.currentTime = nextTime
        setProgress(duration ? (nextTime / duration) * 100 : 0)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // No interceptar si el usuario está escribiendo
            const target = e.target as HTMLElement
            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable
            ) {
                return
            }

            switch (e.key) {
                case " ":
                    e.preventDefault()
                    togglePlay()
                    break

                case "f":
                case "F":
                    e.preventDefault()
                    handleFullscreen()
                    break

                case ".":
                    e.preventDefault()
                    stepFrame(1)
                    break

                case ",":
                    e.preventDefault()
                    stepFrame(-1)
                    break
                case "s":
                case "S": {
                    e.preventDefault()

                    if (!videoRef.current) return

                    const speeds = [1, 0.5, 0.25]
                    const current = speeds.indexOf(videoRef.current.playbackRate)
                    const next = speeds[(current + 1) % speeds.length]

                    setPlaybackSpeed(next)
                    break
                }
            }
            
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, isFullscreen])


    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-black group"
            onMouseMove={handleMouseMove}
            onMouseUp={() => { isDragging.current = false }}
        >
            <video
                ref={videoRef}
                src={url}
                className="w-full h-full object-contain "
                style={{
                    transform: needsMirror ? "scaleX(-1)" : "none",
                    transformOrigin: "center center"
                }}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
                playsInline
            />

            {/* Toggle frame a frame — visible en pausa/hover, y permanente mientras el modo está activo */}
            <div
                className={`hidden lg:flex absolute top-0 left-0 right-0 px-2 py-3  justify-start transition-opacity duration-300 ${
                    isPlaying
                        ? "opacity-0 group-hover:opacity-100"
                        : "opacity-100"
                }`}
            >
                <VideoInfoTooltip
                    shortcuts={[
                        { key: "Space", action: "Play / Pause" },
                        { key: "F", action: "Fullscreen" },
                        { key: "S", action: "Change speed" },
                        { key: ".", action: "Next frame" },
                        { key: ",", action: "Previous frame" },
                    ]}
                />
            </div>

            {/* Botones flotantes de frame a frame — solo en modo frame */}
            
                    <button
                        onClick={() => stepFrame(-1)}
                        aria-label="Frame anterior"
                        className={`
                            absolute bottom-25 left-3 z-10
                            flex h-12 items-center gap-1
                            rounded-full bg-black/60 px-4
                            text-white border border-white/40
                            transition-all duration-200
                            cursor-pointer
                            md:hover:opacity-100!
                            opacity-50
                            md:opacity-0
                            

                            ${!isPlaying ? "md:opacity-100 opacity-100" : "md:group-hover:opacity-50"}
                            `}
                    >
                        <RiPlayReverseFill size={20} />
                        <span className="text-lg font-semibold">-1</span>
                    </button>

                    <button
                        onClick={() => stepFrame(1)}
                        aria-label="Frame siguiente"
                        className={`
                            absolute bottom-25 right-3 z-10
                            flex h-12 items-center gap-1
                            rounded-full bg-black/60 px-4
                            text-white border border-white/40
                            cursor-pointer
                            transition-all duration-200
                            md:hover:opacity-100!
                            opacity-50
                            md:opacity-0

                            ${!isPlaying ? "md:opacity-100 opacity-100" : "md:group-hover:opacity-50"}
                            `}
                    >
                        <span className="text-lg font-semibold">+1</span>
                        <RiPlayMiniFill size={20} />
                    </button>
               

            {/* Controls */}
            <div className={`absolute bottom-0 left-0 right-0 px-4 py-3 transition-opacity duration-300 ${
                isPlaying
                    ? "opacity-0 group-hover:opacity-100"
                    : "opacity-100"
            }`}>

                {/* Progress bar — permanente en modo frame */}
                <div
                    ref={progressRef}
                    className="relative w-full h-4 flex items-center cursor-pointer mb-3 touch-none"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Track */}
                    <div className="absolute w-full h-1 bg-gray-400 rounded-full ">
                        <div
                            className="h-full bg-white rounded-full "
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    {/* Thumb */}
                    <div
                        className="absolute w-3 h-3 hover:w-5 hover:h-5 bg-white rounded-full shadow-md -translate-x-1/2 pointer-events-none"
                        style={{ left: `${progress}%` }}
                    />
                </div>

                {/* Play/pause, velocidad y fullscreen — ocultos en modo frame */}
                    <div className="flex items-center justify-between">
                        <button onClick={togglePlay} className="cursor-pointer p-2 text-white bg-black/50 hover:bg-black transition-colors ease-in-out rounded-full">
                            {isPlaying ? <IoIosPause size={25} /> : <IoIosPlay size={25} />}
                        </button>
                        <div className="flex gap-2 p-2 bg-black/50 rounded-full">
                            <h2 className="text-gray-300">Speed</h2>
                            {[1, 0.5, 0.25].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setPlaybackSpeed(s)}
                                    className={`cursor-pointer flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-sm transition-colors ${
                                        speed === s ? "border-white bg-white text-black" : "border-white/40 bg-black/40 text-white hover:bg-black/60"
                                    }`}
                                >
                                    {s}x
                                </button>
                            ))}
                        </div>
                        <button onClick={handleFullscreen} className="cursor-pointer p-2 text-white bg-black/50 hover:bg-black transition-colors ease-in-out rounded-full">
                            {isFullscreen ? <MdFullscreenExit size={20} /> : <MdFullscreen size={20} />}
                        </button>
                    </div>
            </div>
        </div>
    )
}