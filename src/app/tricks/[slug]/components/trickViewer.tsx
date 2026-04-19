"use client"
import React from 'react'
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useDominantHand } from "@/app/providers/dominantHandProvider"
import { MdRefresh } from "react-icons/md"
import { IoMdArrowRoundBack } from "react-icons/io"

import ModifierToggle from "./modifierToggle"
import DifficultyBadge from "@/components/difficultyBadge"
import InfoToolTip from "@/components/InfoToolTip"
import VideoPlayer from "@/components/VideoPlayer"
import { modifierColor } from "@/app/constants/modifiers"



type Instance = {
    modifiers:string[],
    difficulty: string,
    trickDetails: string,
    videos: {
        url: string,
        type: string,
        order: number
    }[]

}

type Trick = {
    name: string,
    notation: string
    slug: string
    families: string[]
}

type TrickViewerProps = {
    instance: Instance[]
    trick: Trick
    modifiers: { 
        id: string, 
        name: string, 
        notation: string | null,
        position: string | null }[]
}



function TrickViewer({trick, instance, modifiers}:TrickViewerProps) {

    
    const { isLeftHanded } = useDominantHand()
    const searchParams = useSearchParams()
    const modifiersParam = searchParams.get("modifiers")
    const initialModifiers = modifiersParam ? modifiersParam.split(",") : []
    const router = useRouter()
    // Modular state generator
    const [activeModifierIds, setActiveModifierIds] = useState<string[]>(initialModifiers)

    // Video state for pagination
    const [activeVideo, setActiveVideo] = useState("main")

    // activeInstance 
    const activeInstance = instance.find(i =>
        i.modifiers.every(m => 
            m === "normal" || activeModifierIds.includes(m)
        ) &&
        activeModifierIds.every(id => i.modifiers.includes(id))
    )

    // Verifies if the modified route exist, if it doesnt, it goes back to the base instance
    // Im openly ignoring the warning here
    useEffect(() => {
        if (!activeInstance && activeModifierIds.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveModifierIds([])
            router.replace(`/tricks/${trick.slug}`, { scroll: false })
        }
    }, [activeInstance, activeModifierIds.length, trick.slug, router])

    const availableModifiers = modifiers.filter(m => 
        m.id !== "normal" && 
        instance.some(i => i.modifiers.includes(m.id))
    )

    const toggleModifier = (id: string) => {
        const newIds = activeModifierIds.includes(id) 
            ? activeModifierIds.filter(m => m !== id) 
            : [...activeModifierIds, id]
        
        const combinationExists = instance.some(i =>
            newIds.every(id => i.modifiers.includes(id)) &&
            i.modifiers.every(m => m === "normal" || newIds.includes(m))
        ) || newIds.length === 0

        if (!combinationExists) return
        
        setActiveModifierIds(newIds)
        setActiveVideo("main")

        const params = newIds.length > 0 ? `?modifiers=${newIds.join(",")}` : ""
        router.replace(`/tricks/${trick.slug}${params}`, { scroll: false })
    }

    // Pagination states for video display
    const mainVideo = activeInstance?.videos.find(v => v.type === "main")
    const positionVideo = activeInstance?.videos.filter(v => v.type === "position") ?? []
    const stepVideos = activeInstance?.videos.filter(v => v.type === "step") ?? []
    const activeVideoUrl = 
    activeVideo === "main"
        ? mainVideo?.url ?? ""
        : activeVideo === "position"
            ? positionVideo[0]?.url ?? ""  // Si hay varios position, toma el primero
            : stepVideos.find(v => v.order.toString() === activeVideo)?.url ?? ""

    
    // Suffix prefix management for name composition
    const activeModifiers = activeInstance?.modifiers ?? []

    const prefixMods = activeModifiers
        .map(id => modifiers.find(m => m.id === id))
        .filter(m => m?.position === "prefix")
        .map(m => ({ name: m?.name, id: m!.id, notation:m?.notation }))

    const suffixMods = activeModifiers
        .map(id => modifiers.find(m => m.id === id))
        .filter(m => m?.position === "suffix")
        .map(m => ({ name: m?.name, id: m!.id, notation:m?.notation }))

    return (
        <div className="flex flex-col justify-center items-center transition-colors duration-500 ease-in-out">

             {/* Name */}
            
            <div className="sticky top-16 z-20 w-full px-5 py-4 flex justify-center items-center bg-white dark:bg-black backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 transition-colors duration-500 ease-in-out">
                <div className="relative w-full max-w-400 flex justify-center items-center">
                    {/* Botón back alineado a la izquierda */}
                    <button
                        onClick={() => router.back()}
                        className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer"
                        style={{ 
                            backgroundColor: '#e5e7eb',
                            boxShadow: '0 4px 0 0 #d1d5db'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.9)' }}
                        onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
                    >
                        <IoMdArrowRoundBack size={20} className="text-black" />
                    </button>

                    {/* Título centrado */}
                    <div className="flex flex-col items-center px-16">
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
                            <span className="transition-all duration-300 ease-in-out">{trick.name}</span>
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
                        <div className="pt-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeInstance?.difficulty}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <DifficultyBadge badge={activeInstance?.difficulty}/>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video */}
            <div className="mt-16 bg-black w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeVideoUrl}
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0}}
                        transition={{ duration: 0.25 }}
                        className="w-full max-w-4xl mx-auto aspect-video"
                    >
                        {activeVideoUrl ? (
                            <VideoPlayer url={activeVideoUrl} isFlipped={isLeftHanded} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">Video not available</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

           

            {/* Step pagination */}
            <div className="px-5 py-7 w-full bg-white dark:bg-black transition-colors duration-500 ease-in-out  ">
                <div className="max-w-400 mx-auto ">
                    <div className="flex items-center mb-5">
                        <h1 className="font-inter text-2xl ">Steps</h1>
                        <InfoToolTip text={"·Main: Showcases the trick.\n·Position: Shows the starting position of the hand and pen mod for the trick.\n·Step(x):Indicates the progression you must follow to learn the trick.\nIt is recommended you are able to execute 10 times in a row each step before going for the next one."} />
                        {/* <div className=" hidden md:block bg-gray-400 h-px w-40 ml-4 " /> */}
                    </div>
                    <div className="flex flex-row font-bold rounded-lg transition-colors duration-500 ease-in-out">
                        <div className="flex flex-row flex-wrap bg-white dark:bg-black p-2 gap-2 rounded-lg transition-colors duration-500 ease-in-out">
                            <button 
                            onClick={() => setActiveVideo("main")}
                            className={`py-1 px-2 rounded-lg transition-colors duration-300 ease-in-out text-black cursor-pointer ${activeVideo === "main" ? "bg-gray-200 " : "text-gray-400"}`}
                            >
                            Main
                            </button>
                            <button 
                            onClick={() => setActiveVideo("position")}
                            className={`py-1 px-2 rounded-lg transition-colors duration-300 ease-in-out text-black cursor-pointer ${activeVideo === "position" ? "bg-gray-200 " : "text-gray-400"}`}
                            >
                            Position
                            </button>
                            {stepVideos.map((step, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setActiveVideo(step.order.toString())}
                                    className={`py-1 px-2 rounded-lg transition-colors duration-300 ease-in-out text-black cursor-pointer ${activeVideo === step.order.toString() ? "bg-gray-300  dark:bg-gray-200 " : "text-gray-400"}`}
                                >
                                    Step {i + 1}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Toggles section */}
            {availableModifiers.length > 0 && (
                <div className="px-5 py-7 w-full flex flex-col gap-5 bg-whitePrimary dark:bg-blackPrimary transition-colors duration-500 ease-in-out">
                    <div className="max-w-400 mx-auto w-full">
                        <div className="flex items-center mb-5">
                            <h1 className="font-inter text-2xl">Modifiers</h1>
                            <InfoToolTip text={"Modifiers are variations of a base trick that change how it is performed.\nThey can alter things like the direction of the trick, hand orientation or even if the fingers are curled during the trick. "}/>
                            {activeModifierIds.length > 0 && (
                                <button
                                    onClick={() => {
                                        setActiveModifierIds([])
                                        setActiveVideo("main")
                                        router.replace(`/tricks/${trick.slug}`, { scroll: false })
                                    }}
                                    className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                                >
                                    <MdRefresh size={30} />
                                </button>
                            )}
                        </div>
                        <div className="py-2">
                            {availableModifiers.map(mod => {
                                
                                const wouldBeIds = activeModifierIds.includes(mod.id)
                                    ? activeModifierIds.filter(m => m !== mod.id)
                                    : [...activeModifierIds, mod.id]
                                
                                const combinationExists = instance.some(i =>
                                    wouldBeIds.every(id => i.modifiers.includes(id)) &&
                                    i.modifiers.every(m => m === "normal" || wouldBeIds.includes(m))
                                )
                                console.log(combinationExists, wouldBeIds)

                                return (
                                    
                                    <ModifierToggle
                                        key={mod.id}
                                        modifierId={mod.id}
                                        isActive={activeModifierIds.includes(mod.id)}
                                        onToggle={toggleModifier}
                                        options={["Normal", mod.name]}
                                        disabled={!combinationExists}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Notation section */}
            <div className="px-5 py-7 w-full flex flex-col gap-5 bg-white dark:bg-black transition-colors duration-500 ease-in-out "> 
                <div className="max-w-400 mx-auto w-full">
                    <div className="flex items-center mb-5">
                        <h1 className="font-inter text-2xl ">Notation</h1>
                        <InfoToolTip text={"Notation is the compact way to write trick names and modifiers using abbreviations.\nIt's written following a prefix/suffix structure, which is defined in each individual modifier."}/>
                        {/* <div className=" hidden md:block bg-gray-400 h-px w-40 ml-4 " /> */}
                    </div>
                    <div className="flex flex-row gap-1 text-xl justify-center">
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
                        <span className="text-gray-400">{trick.notation}</span>
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
            </div>

            <div className="px-5 py-7 w-full flex flex-col gap-5 bg-whitePrimary dark:bg-blackPrimary transition-colors duration-500 ease-in-out">
                <div className="max-w-400 mx-auto w-full">
                    <div className="flex items-center mb-5">
                        <h1 className="font-inter text-2xl ">Trick family</h1>
                        <InfoToolTip text={"Families are classiffications of tricks that share the same mechanics."}/>
                        {/* <div className=" hidden md:block bg-gray-400 h-px w-40 ml-4 " /> */}
                    </div>
                    <div className="flex flex-row gap-1 text-xl justify-center">
                        {trick.families.map((family, index) => (
                            <span 
                                key={index} 
                                className=" text-gray-800 dark:text-gray-300 px-2 py-1 rounded-md text-xl font-medium border border-gray-800 dark:border-gray-300"
                            >
                                {family}
                            </span>
                        ))}
                    </div>


                </div>

            </div>

            {/* explanation details */}
            {/* <div className="p-5 bg-whitePrimary dark:bg-blackPrimary flex flex-col gap-3 transition-colors duration-500 ease-in-out w-full">
                <div className="max-w-400 mx-auto w-full">
                    <div className="flex items-center mb-5">
                        <h1 className="font-inter text-2xl ">Trick details</h1>
                    </div>
                    <div className="border border-gray-700 dark:border-gray-300 bg-gray-300/50 dark:bg-gray-800/50 p-3 rounded-lg ">
                        {instance.map((instance, i) => (
                            <p 
                                key={i}
                                className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg font-inter rounded-lg "
                                >
                                    {instance.trickDetails}
                                </p>
                        ))}
                    </div>
                   
                </div>
            </div> */}
            
        </div>
    )
}

export default TrickViewer
