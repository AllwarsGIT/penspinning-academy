"use client"
import { useRef, useState } from "react"
import { IoIosPause, IoIosPlay  } from "react-icons/io";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md"

type VideoPlayerProps = {
    url: string
    isFlipped?: boolean
}

export default function VideoPlayer({ url, isFlipped = false }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [speed, setSpeed] = useState(1)

    const togglePlay = () => {
        if (!videoRef.current) return
        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const setPlaybackSpeed = (newSpeed: number) => {
        if (!videoRef.current) return
        videoRef.current.playbackRate = newSpeed
        setSpeed(newSpeed)
    }

    const handleTimeUpdate = () => {
        if (!videoRef.current) return
        const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100
        setProgress(percent)
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return
        const rect = e.currentTarget.getBoundingClientRect()
        const percent = (e.clientX - rect.left) / rect.width
        videoRef.current.currentTime = percent * videoRef.current.duration
    }

    const handleFullscreen = () => {
        if (!containerRef.current) return
        if (!isFullscreen) {
            containerRef.current.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    return (
        <div 
            className="relative w-full h-full bg-black group"
            ref={containerRef}
            >
            <video
                ref={videoRef}
                src={url}
                className="w-full h-full object-contain cursor-pointer"
                style={{ transform: isFlipped ? "none" : "scaleX(-1)" }}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                playsInline
            />
            
            {/* Controls */}
            <div className={`absolute bottom-0 left-0 right-0 px-4 py-3 bg-linear-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                isPlaying ? "opacity-0 group-hover:opacity-100 delay-1500" : "opacity-100"
            }`}>
                
                {/* Progress bar */}
                <div 
                    className="w-full h-1 bg-gray-600 rounded-full cursor-pointer mb-3"
                    onClick={handleProgressClick}
                >
                    <div 
                        className="h-full bg-white rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between">
                    <button onClick={togglePlay} className="cursor-pointer text-white">
                        {isPlaying ? <IoIosPause size={25} /> : <IoIosPlay size={25} />}
                    </button>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setPlaybackSpeed(1)} 
                            className={`cursor-pointer text-xs font-mono px-2 py-0.5 rounded border transition-colors ${speed === 1 ? "border-white text-white" : "border-gray-500 text-gray-400"}`}
                        >
                           1.0x
                        </button>
                        <button 
                            onClick={() => setPlaybackSpeed(0.5)} 
                            className={`cursor-pointer text-xs font-mono px-2 py-0.5 rounded border transition-colors ${speed === 0.5 ? "border-white text-white" : "border-gray-500 text-gray-400"}`}
                        >
                            0.5x
                        </button>
                        <button 
                            onClick={() => setPlaybackSpeed(0.25)} 
                            className={`cursor-pointer text-xs font-mono px-2 py-0.5 rounded border transition-colors ${speed === 0.25 ? "border-white text-white" : "border-gray-500 text-gray-400"}`}
                        >
                            0.25x
                        </button>
                    </div>
                    
                    <button onClick={handleFullscreen} className="cursor-pointer text-white">
                        {isFullscreen ? <MdFullscreenExit size={20} /> : <MdFullscreen size={20} />}
                    </button>
                </div>
            </div>
        </div>
    )
}