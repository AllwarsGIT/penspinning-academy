"use client"

import React, {
    useState,
    useRef,
    useCallback,
    useEffect,
} from "react"
import { useDominantHand } from "@/app/providers/dominantHandProvider"
import Link from "next/link"
import Image from "next/image"
import DifficultyBadge from "@/components/difficultyBadge"
import FamilyBadge from "./familyBadge"
import { Modifier, Instance } from "@/types/types"
import { modifierColor } from "@/app/constants/modifiers"
import LearnedToggle from "@/app/tricks/[slug]/components/LearnedToggle"
import { useLearnedTricks } from "@/app/providers/learnedTricksProvider"

type TrickNameCardProps = {
    trickName: string
    thumbnail: string
    thumbnailHand?: "left" | "right"
    badge?: string
    families: string[]
    modifiers: Modifier[]
    instance: Instance
    notation?: string
    variant?: "grid" | "list"
}

const PREVIEW_LOAD_TIMEOUT = 6000 // si el vídeo no carga en 6s, nos rendimos

function TrickNameCard({
    trickName = "",
    thumbnail = "",
    thumbnailHand = "left",
    badge = "",
    families = [""],
    modifiers = [],
    instance,
    variant = "grid",
}: TrickNameCardProps) {
    const { isLeftHanded } = useDominantHand()
    const { isLearned } = useLearnedTricks()

    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [isPreviewing, setIsPreviewing] = useState(false)
    const [isBuffering, setIsBuffering] = useState(false)
    const [previewFailed, setPreviewFailed] = useState(false)
    const [previewProgress, setPreviewProgress] = useState(0)

    const videoRef = useRef<HTMLVideoElement>(null)
    const bufferTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastProgressUpdateRef = useRef(0)

    const viewerHand = isLeftHanded ? "left" : "right"
    const needsMirror = thumbnailHand !== viewerHand

    const mainVideo = instance.videos?.find(
        video => video.type === "main"
    )

    const previewNeedsMirror = mainVideo
        ? mainVideo.hand !== viewerHand
        : needsMirror

    const extraModifiers = instance.modifiers

    const href =
        extraModifiers.length > 0
            ? `/tricks/${instance.idTrickName}?modifiers=${extraModifiers.join(",")}`
            : `/tricks/${instance.idTrickName}`

    const instanceId =
        extraModifiers.length > 0
            ? `${instance.idTrickName}:${[...extraModifiers]
                  .sort()
                  .join(",")}`
            : instance.idTrickName

    const learned = isLearned(instanceId)

    const prefixMods = instance.modifiers
        .map(id => modifiers.find(m => m.id === id))
        .filter(m => m?.position === "prefix")

    const suffixMods = instance.modifiers
        .map(id => modifiers.find(m => m.id === id))
        .filter(m => m?.position === "suffix")

    const cardClass = learned
        ? "border-emerald-500/60 dark:border-emerald-400/40 bg-emerald-100 dark:bg-emerald-900/40"
        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-black"

    /*
     * Preview
     */
    const clearBufferTimeout = useCallback(() => {
        if (bufferTimeoutRef.current) {
            clearTimeout(bufferTimeoutRef.current)
            bufferTimeoutRef.current = null
        }
    }, [])

    const startPreview = useCallback(() => {
        setIsPreviewing(true)
        setIsBuffering(true)
        setPreviewFailed(false)
        setPreviewProgress(0)

        // Si en PREVIEW_LOAD_TIMEOUT no ha cargado (red lenta, bloqueo,
        // timeout de servidor...) nos rendimos en vez de dejar el pulse
        // animándose para siempre.
        bufferTimeoutRef.current = setTimeout(() => {
            setIsBuffering(false)
            setPreviewFailed(true)
        }, PREVIEW_LOAD_TIMEOUT)
    }, [])

    const stopPreview = useCallback(() => {
        const video = videoRef.current

        if (video) {
            video.pause()
            video.currentTime = 0
        }

        clearBufferTimeout()

        setIsPreviewing(false)
        setIsBuffering(false)
        setPreviewFailed(false)
        setPreviewProgress(0)
        lastProgressUpdateRef.current = 0
    }, [clearBufferTimeout])

    useEffect(() => {
        return () => {
            clearBufferTimeout()
        }
    }, [clearBufferTimeout])

    // Desktop: el preview arranca al instante al entrar, sin espera intermedia.
    const handleMouseEnter = useCallback(() => {
        if (!mainVideo) return
        startPreview()
    }, [mainVideo, startPreview])

    const handleMouseLeave = useCallback(() => {
        stopPreview()
    }, [stopPreview])

    // Mobile: cualquier touch cancela el preview y deja pasar el tap normal
    // (navegación del Link / click del checkbox) sin bloquear nada.
    const handleTouchStart = useCallback(() => {
        stopPreview()
    }, [stopPreview])

    const handleTouchMove = useCallback(() => {
        stopPreview()
    }, [stopPreview])

    const handleTouchEnd = useCallback(() => {
        stopPreview()
    }, [stopPreview])

    const handleVideoCanPlay = useCallback(() => {
        clearBufferTimeout()
        setIsBuffering(false)
    }, [clearBufferTimeout])

    const handleVideoError = useCallback(() => {
        clearBufferTimeout()
        setIsBuffering(false)
        setPreviewFailed(true)
    }, [clearBufferTimeout])

    const handlePreviewTimeUpdate = useCallback(() => {
        const video = videoRef.current

        if (!video || !video.duration) return

        const nextProgress = (video.currentTime / video.duration) * 100
        const currentTime = video.currentTime

        if (Math.abs(currentTime - lastProgressUpdateRef.current) < 0.08) return

        lastProgressUpdateRef.current = currentTime
        setPreviewProgress(nextProgress)
    }, [])

    /*
     * Trick name
     */
    const nameNode = (
        <h2 className="font-inter font-semibold flex flex-row flex-wrap items-baseline gap-1 leading-snug">
            {prefixMods.map(modifier => (
                <span
                    key={modifier!.id}
                    className="text-sm font-bold"
                    style={{
                        color: modifierColor[modifier!.id],
                    }}
                >
                    [{modifier!.name}]
                </span>
            ))}

            <span className="truncate">
                {trickName}
            </span>

            {suffixMods.map(modifier => (
                <span
                    key={modifier!.id}
                    className="text-sm font-bold"
                    style={{
                        color: modifierColor[modifier!.id],
                    }}
                >
                    [{modifier!.name}]
                </span>
            ))}
        </h2>
    )

    /*
     * Thumbnail
     */
    const thumbnailNode = (
        <div
            className={
                variant === "list"
                    ? "w-28 sm:w-36 aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0 rounded-l-2xl"
                    : "w-full aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-t-2xl"
            }
        >
            {thumbnail && !isImageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-zinc-800" />
            )}

            {thumbnail ? (
                <Image
                    src={thumbnail}
                    alt={trickName}
                    style={{
                        transform: needsMirror
                            ? "scaleX(-1)"
                            : "none",
                    }}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className={`object-cover transition-opacity duration-300 ease-in-out ${
                        isImageLoaded
                            ? "opacity-100"
                            : "opacity-0"
                    } ${
                        isPreviewing && !previewFailed
                            ? "opacity-0"
                            : ""
                    }`}
                    loading="lazy"
                    onLoad={() => setIsImageLoaded(true)}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400 dark:text-gray-600 text-[10px] font-mono tracking-widest uppercase">
                        No preview
                    </p>
                </div>
            )}

            {isPreviewing && mainVideo && !previewFailed && (
                <video
                    ref={videoRef}
                    src={mainVideo.url}
                    style={{
                        transform: previewNeedsMirror
                            ? "scaleX(-1)"
                            : "none",
                    }}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onCanPlay={handleVideoCanPlay}
                    onTimeUpdate={handlePreviewTimeUpdate}
                    onError={handleVideoError}
                />
            )}

            {isPreviewing && mainVideo && !previewFailed && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                    {isBuffering ? (
                        <div className="h-full w-full bg-white/70 animate-pulse" />
                    ) : (
                        <div
                            className="h-full bg-white transition-[width] duration-150 ease-linear"
                            style={{
                                width: `${previewProgress}%`,
                            }}
                        />
                    )}
                </div>
            )}

            <div className={`absolute flex flex-row top-2 left-2 z-10 bg-black/50 backdrop-blur-sm rounded-full ${learned ? "bg-emerald-300/70 dark:bg-emerald-900/70" : "" }`}>
                <LearnedToggle
                    trickId={instanceId}
                    size="sm"
                    className="p-1"
                />
                {learned && (
                    <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-emerald-700 dark:text-emerald-400 ml-auto">
                        Completed
                    </span>
                )}
            </div>
        </div>
    )

    /*
     * LIST
     */
    if (variant === "list") {
        return (
            <Link
                href={href}
                scroll={false}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`
                    group
                    w-full
                    rounded-2xl
                    overflow-hidden
                    cursor-pointer
                    transition-colors
                    duration-200
                    border
                    flex
                    items-stretch
                    ${cardClass}
                `}
            >
                {thumbnailNode}

                <div className="p-3.5 flex flex-col justify-center gap-2 min-w-0 flex-1">
                    {nameNode}

                    <div className="flex flex-row items-center gap-2 pt-1 border-t border-gray-100 dark:border-gray-900">
                        <DifficultyBadge badge={badge} />
                        <FamilyBadge families={families} />
                    </div>
                </div>
            </Link>
        )
    }

    /*
     * GRID
     */
    return (
        <Link
            href={href}
            scroll={false}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`
                group
                w-full
                rounded-2xl
                overflow-hidden
                cursor-pointer
                transition-colors
                duration-200
                border
                ${cardClass}
            `}
        >
            {thumbnailNode}

            <div className="p-3.5 flex flex-col gap-2">
                {nameNode}

                <div className="flex flex-row items-center gap-2 pt-1 border-t border-gray-100 dark:border-gray-900">
                    <DifficultyBadge badge={badge} />
                    <FamilyBadge families={families} />
                </div>
            </div>
        </Link>
    )
}

export default React.memo(TrickNameCard)