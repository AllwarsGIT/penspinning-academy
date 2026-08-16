"use client"
import React from 'react'
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useDominantHand } from "@/app/providers/dominantHandProvider"
import { MdRefresh, MdKeyboardArrowDown, MdCheckCircle } from "react-icons/md"
import { IoMdArrowRoundBack } from "react-icons/io"
import { IoLinkOutline, IoCheckmark } from "react-icons/io5"

import ModifierButton from "./ModifierButton"
import DifficultyBadge from "@/components/difficultyBadge"
import InfoToolTip from "@/components/InfoToolTip"
import VideoPlayer from "@/components/VideoPlayer"
import LearnedToggle from "./LearnedToggle"
import { modifierColor } from "@/app/constants/modifiers"
import type { Instance, Trick } from "@/types/types"
import { usePersistentCollapse } from "@/app/hooks/usePersistentCollapse"
import { useLearnedTricks } from "@/app/providers/learnedTricksProvider"

type TrickViewerProps = {
    instance: Instance[]
    trick: Trick
    modifiers: {
        id: string,
        name: string,
        notation: string | null,
        position: string | null
    }[]
    allTricks: Trick[]
}

function TrickViewer({ trick, instance, modifiers, allTricks }: TrickViewerProps) {

    const [copied, setCopied] = useState(false)
    const [collapsed, setCollapsed] = usePersistentCollapse("trick:modifiersCollapsed", false)

    const { isLearned } = useLearnedTricks()

    useDominantHand()
    const searchParams = useSearchParams()
    const modifiersParam = searchParams.get("modifiers")
    const initialModifiers = modifiersParam ? modifiersParam.split(",") : []
    const router = useRouter()

    const [activeModifierIds, setActiveModifierIds] = useState<string[]>(initialModifiers)
    const [activeVideo, setActiveVideo] = useState("main")

    const matchesModifierSelection = (instanceModifiers: string[], selectedIds: string[]) =>
        selectedIds.every(id => instanceModifiers.includes(id)) &&
        instanceModifiers.every(m => selectedIds.includes(m))

    const activeInstance = instance.find(i =>
        matchesModifierSelection(i.modifiers, activeModifierIds)
    )

    const activeInstanceId = activeInstance && activeInstance.modifiers.length > 0
        ? `${trick.slug}:${[...activeInstance.modifiers].sort().join(",")}`
        : trick.slug

    const isCurrentLearned = isLearned(activeInstanceId)

    useEffect(() => {
        if (!activeInstance && activeModifierIds.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveModifierIds([])
            router.replace(`/tricks/${trick.slug}`, { scroll: false })
        }
    }, [activeInstance, activeModifierIds.length, trick.slug, router])

    const availableModifiers = modifiers.filter(m =>
        instance.some(i => i.modifiers.includes(m.id))
    )

    const toggleModifier = (id: string) => {
        const newIds = activeModifierIds.includes(id)
            ? activeModifierIds.filter(m => m !== id)
            : [...activeModifierIds, id]

        const combinationExists = instance.some(i =>
            matchesModifierSelection(i.modifiers, newIds)
        ) || newIds.length === 0

        if (!combinationExists) return

        setActiveModifierIds(newIds)
        setActiveVideo("main")

        const params = newIds.length > 0 ? `?modifiers=${newIds.join(",")}` : ""
        router.replace(`/tricks/${trick.slug}${params}`, { scroll: false })
    }

    const resetModifiers = () => {
        setActiveModifierIds([])
        setActiveVideo("main")
        router.replace(`/tricks/${trick.slug}`, { scroll: false })
    }

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push("/tricks")
        }
    }

    const mainVideo = activeInstance?.videos.find(v => v.type === "main")
    const positionVideo = activeInstance?.videos.filter(v => v.type === "position") ?? []
    const stepVideos = activeInstance?.videos.filter(v => v.type === "step") ?? []

    const activeVideoObj =
        activeVideo === "main"
            ? mainVideo
            : activeVideo === "position"
                ? positionVideo[0]
                : stepVideos.find(v => v.order.toString() === activeVideo)

    const activeVideoUrl = activeVideoObj?.url ?? ""

    const activeModifiers = activeInstance?.modifiers ?? []

    const prefixMods = activeModifiers
        .map(id => modifiers.find(m => m.id === id))
        .filter(m => m?.position === "prefix")
        .map(m => ({ name: m?.name, id: m!.id, notation: m?.notation }))

    const suffixMods = activeModifiers
        .map(id => modifiers.find(m => m.id === id))
        .filter(m => m?.position === "suffix")
        .map(m => ({ name: m?.name, id: m!.id, notation: m?.notation }))

    const prerequisiteTricks = (activeInstance?.prerequisites ?? [])
        .map(slug => allTricks.find(item => item.slug === slug))
        .filter((item): item is Trick => Boolean(item))

    const copyLink = async () => {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex flex-col justify-center items-center transition-colors duration-500 ease-in-out">

            {/* ============ HEADER ============ */}
            <div className={`sticky top-16 z-20 w-full px-5 py-4 flex justify-center items-center border-b transition-colors duration-500 ease-in-out ${
                isCurrentLearned
                    ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900"
                    : "bg-white dark:bg-black border-gray-200 dark:border-gray-800"
            }`}>
                <div className="w-full max-w-400 grid grid-cols-[48px_1fr_48px] items-center">

                    <button
                        onClick={handleBack}
                        className="flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-200 cursor-pointer"
                        style={{ backgroundColor: "#e5e7eb" }}
                        onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.9)" }}
                        onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)" }}
                    >
                        <IoMdArrowRoundBack size={20} className="text-black" />
                    </button>

                    {/* Nombre — clic completo copia el link. Sin efecto de hover visual
                        (solo cursor-pointer). Toda la franja se tiñe de verde cuando
                        la instancia activa está marcada como aprendida. */}
                    <div
                        onClick={copyLink}
                        className={`flex flex-col items-center px-16 cursor-pointer rounded-xl py-1 transition-colors duration-300 ${
                            isCurrentLearned ? "bg-emerald-50/60 dark:bg-emerald-950/30" : ""
                        }`}
                    >
                        <h1 className="font-inter items-center text-2xl flex flex-col md:flex-row justify-center gap-1">
                            <div className="justify-center items-center flex flex-row flex-wrap">
                                <AnimatePresence>
                                    {prefixMods.map((mod) => (
                                        <motion.span
                                            key={mod.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="font-bold"
                                            style={{ color: modifierColor[mod.id] }}
                                        >
                                            [{mod.name}]
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="flex items-center gap-2">
                                <span>
                                    {trick.name}
                                </span>
                            </div>

                            <div className="flex flex-row">
                                <AnimatePresence>
                                    {suffixMods.map((mod) => (
                                        <motion.span
                                            key={mod.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="font-bold"
                                            style={{ color: modifierColor[mod.id] }}
                                        >
                                            [{mod.name}]
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </h1>

                        <div className="pt-2 flex items-center gap-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeInstance?.difficulty}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <DifficultyBadge badge={activeInstance?.difficulty} />
                                </motion.div>
                            </AnimatePresence>

                            {/* Badge "Completed" explícito — el fondo verde de la franja es
                                sutil a propósito, esto da la confirmación textual clara. */}
                            <AnimatePresence>
                                {isCurrentLearned && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center gap-1 rounded-full border border-emerald-600/40 dark:border-emerald-500/30 bg-emerald-100/70 dark:bg-emerald-900/40 px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide text-emerald-700 dark:text-emerald-400"
                                    >
                                        <MdCheckCircle size={12} />
                                        Completed
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            <LearnedToggle trickId={activeInstanceId} />
                        </div>
                    </div>

                    <div className="relative flex justify-end">
                        <button
                            onClick={copyLink}
                            className="flex items-center justify-center h-10 w-10 rounded-xl transition-colors cursor-pointer"
                        >
                            {copied ? (
                                <IoCheckmark size={28} className="text-green-500" />
                            ) : (
                                <IoLinkOutline size={30} className="text-gray-300 hover:text-gray-800 dark:hover:text-white" />
                            )}
                        </button>
                        <AnimatePresence>
                            {copied && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full mt-2 right-0 whitespace-nowrap text-xs font-mono tracking-widest uppercase bg-white text-gray-600 border border-gray-200 px-4 py-1.5 rounded-full "
                                >
                                    Link copied
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* ============ VIDEO ============ */}
            <div className="mt-16 bg-black w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeVideoUrl}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full max-w-4xl mx-auto aspect-video"
                    >
                        {activeVideoUrl ? (
                            <VideoPlayer url={activeVideoUrl} recordedHand={activeVideoObj?.hand ?? "left"} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">Video not available</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ============ PREREQUISITES ============ */}
            {prerequisiteTricks.length > 0 && (
                <div className="px-5 py-7 w-full flex flex-col gap-5 bg-white dark:bg-black transition-colors duration-500 ease-in-out">
                    <div className="max-w-400 mx-auto w-full">
                        <div className="flex items-center mb-5">
                            <h1 className="font-inter text-2xl">
                                Prerequisites
                            </h1>

                            <InfoToolTip
                                text="These are the base tricks (and all their variations) you should feel comfortable with before learning this one."
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            {prerequisiteTricks.map(prerequisite => (
                                <Link
                                    key={prerequisite.slug}
                                    href={`/tricks/${prerequisite.slug}`}
                                    className="flex items-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-200 hover:border-gray-400 hover:bg-white dark:hover:border-gray-600 dark:hover:bg-black"
                                >
                                    {prerequisite.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ============ STEPS + MODIFIERS (main) / NOTATION + FAMILY (sidebar) ============ */}
            <div className="px-5 py-7 w-full bg-whitePrimary dark:bg-blackPrimary transition-colors duration-500 ease-in-out">
                <div className="max-w-400 mx-auto w-full lg:grid lg:grid-cols-[1fr_340px] lg:gap-6 lg:items-start">

                    <div className="flex flex-col gap-6">

                        {/* Steps */}
                        <div className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800">
                            <button
                                onClick={() => setActiveVideo("main")}
                                className={`flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer border-b-2 ${
                                    activeVideo === "main"
                                        ? "text-black dark:text-white border-black dark:border-white"
                                        : "text-gray-400 dark:text-gray-600 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
                                }`}
                            >
                                Main
                            </button>

                            {positionVideo.length > 0 && (
                                <button
                                    onClick={() => setActiveVideo("position")}
                                    className={`flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer border-b-2 ${
                                        activeVideo === "position"
                                            ? "text-black dark:text-white border-black dark:border-white"
                                            : "text-gray-400 dark:text-gray-600 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
                                    }`}
                                >
                                    Position
                                </button>
                            )}

                            {stepVideos.map((step) => {
                                const stepId = step.order.toString()
                                const isActive = activeVideo === stepId
                                return (
                                    <button
                                        key={step.order}
                                        onClick={() => setActiveVideo(stepId)}
                                        className={`flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer border-b-2 ${
                                            isActive
                                                ? "text-black dark:text-white border-black dark:border-white"
                                                : "text-gray-400 dark:text-gray-600 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
                                        }`}
                                    >
                                        <span className={`flex h-5 w-5 items-center justify-center rounded-sm text-[11px] font-mono transition-colors duration-200 ${
                                            isActive
                                                ? "bg-black text-white dark:bg-white dark:text-black"
                                                : "bg-transparent text-gray-400 dark:text-gray-600 border border-gray-300 dark:border-gray-700"
                                        }`}>
                                            {step.order}
                                        </span>
                                        <span>Step</span>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Modifiers */}
                        {availableModifiers.length > 0 && (
                            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">

                                <div className="w-full flex items-center justify-between px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setCollapsed(!collapsed)}
                                            className="flex items-center gap-1 cursor-pointer"
                                        >
                                            <h1 className="font-mono uppercase tracking-widest text-sm text-black dark:text-white">Modifiers</h1>
                                            <MdKeyboardArrowDown
                                                size={20}
                                                className={`text-gray-500 transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
                                            />
                                        </button>

                                        <InfoToolTip
                                            text={"Modifiers are variations of a base trick that change how it is performed.\nThey can alter things like the direction of the trick, hand orientation or even if the fingers are curled during the trick."}
                                        />

                                        {activeModifierIds.length > 0 && (
                                            <span className="ml-2 px-2 py-0.5 rounded-sm bg-black dark:bg-white text-[10px] font-mono text-white dark:text-black">
                                                {activeModifierIds.length}
                                            </span>
                                        )}
                                    </div>

                                    {activeModifierIds.length > 0 && (
                                        <button
                                            onClick={resetModifiers}
                                            className="flex items-center gap-1 px-2 py-1 rounded-sm text-[11px] font-mono uppercase tracking-wide text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors cursor-pointer"
                                        >
                                            <MdRefresh size={14} />
                                            Reset
                                        </button>
                                    )}
                                </div>

                                <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}>
                                    <div className="overflow-hidden">
                                        <div className="px-4 pb-4 pt-1 flex flex-row flex-wrap gap-2">
                                            {availableModifiers.map(mod => {
                                                const wouldBeIds = activeModifierIds.includes(mod.id)
                                                    ? activeModifierIds.filter(m => m !== mod.id)
                                                    : [...activeModifierIds, mod.id]

                                                const combinationExists = instance.some(i =>
                                                    matchesModifierSelection(i.modifiers, wouldBeIds)
                                                )

                                                return (
                                                    <ModifierButton
                                                        key={mod.id}
                                                        modifierId={mod.id}
                                                        name={mod.name}
                                                        color={modifierColor[mod.id]}
                                                        isActive={activeModifierIds.includes(mod.id)}
                                                        onToggle={toggleModifier}
                                                        disabled={!combinationExists}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- Sidebar: Notation + Trick family --- */}
                    <div className="mt-6 lg:mt-0 flex flex-col gap-2 lg:sticky lg:top-24 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6">

                        <div>
                            <div className="flex items-center mb-4">
                                <h2 className="font-mono uppercase tracking-widest text-xs text-gray-400 dark:text-gray-500">Notation</h2>
                                <InfoToolTip text={"Notation is the compact way to write trick names and modifiers using abbreviations.\nIt's written following a prefix/suffix structure, which is defined in each individual modifier."} />
                            </div>
                            <div className="flex flex-row flex-wrap gap-1 text-lg font-mono">
                                <AnimatePresence>
                                    {prefixMods.map((mod) => (
                                        <motion.span
                                            key={mod.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="font-bold"
                                            style={{ color: modifierColor[mod.id] }}
                                        >
                                            [{mod.notation}]
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                                <span className="text-black dark:text-white">{trick.notation}</span>
                                <AnimatePresence>
                                    {suffixMods.map((mod) => (
                                        <motion.span
                                            key={mod.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="font-bold"
                                            style={{ color: modifierColor[mod.id] }}
                                        >
                                            [{mod.notation}]
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center mb-4">
                                <h2 className="font-mono uppercase tracking-widest text-xs text-gray-400 dark:text-gray-500">Trick family</h2>
                                <InfoToolTip text={"Families are classiffications of tricks that share the same mechanics."} />
                            </div>
                            <div className="flex flex-row flex-wrap gap-1">
                                {trick.families.map((family, index) => (
                                    <span
                                        key={index}
                                        className="text-black dark:text-white px-2 py-1 rounded-sm text-xs font-mono uppercase tracking-wide border border-gray-300 dark:border-gray-700"
                                    >
                                        {family}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TrickViewer