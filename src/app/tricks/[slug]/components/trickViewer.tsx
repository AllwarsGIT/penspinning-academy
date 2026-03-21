"use client"
import React from 'react'
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useDominantHand } from "@/app/providers/dominantHandProvider"

import ModifierToggle from "./modifierToggle"
import DifficultyBadge from "@/components/difficultyBadge"
import InfoToolTip from "@/components/InfoToolTip"
import VideoPlayer from "@/components/VideoPlayer"



type Instance = {
    modifiers:string[],
    difficulty: string,
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

const modifierColor: Record<string, string> = {
    reverse: "#22c55e",
    inverse: "#6366f1",
    fingerless: "#f97316"
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
        
        setActiveModifierIds(newIds)
        setActiveVideo("main")

        const params = newIds.length > 0 ? `?modifiers=${newIds.join(",")}` : ""
        router.replace(`/tricks/${trick.slug}${params}`, { scroll: false })
    }

    // Pagination states for video display
    const mainVideo = activeInstance?.videos.find(v => v.type === "main")
    const stepVideos = activeInstance?.videos.filter(v => v.type === "step") ?? []
    const activeVideoUrl = activeVideo === "main" 
    ? mainVideo?.url ?? "" 
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
            {/* TODO video reacting to state */}
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

            {/* Name */}
            
            <div className="w-full px-5 py-7 flex flex-col  justify-center items-center  bg-white dark:bg-black transition-colors duration-500 ease-in-out">
                        <h1 className="font-inter items-center text-2xl flex flex-col md:flex-row justify-center gap-1">
                            <div className="justify-center items-center flex flex-row flex-wrap ">
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
                            <span className="mx-auto transition-all duration-300 ease-in-out">{trick.name}</span>
                            <div className="flex flex-row ">
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
                        
                <div className="pt-3 ">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeInstance?.difficulty}
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.25 }}
                                className="font-inter items-center text-2xl flex flex-col md:flex-row justify-center gap-1"
                            >
                                <DifficultyBadge badge={activeInstance?.difficulty}/>
                            </motion.div>
                        </AnimatePresence>
                </div>
            </div>

            {/* Step pagination */}
            <div className="px-5 py-7 w-full bg-whitePrimary dark:bg-blackPrimary transition-colors duration-500 ease-in-out  ">
                <div className="max-w-400 mx-auto ">
                    <div className="flex items-center mb-5">
                        <h1 className="font-inter text-2xl ">Steps</h1>
                        <InfoToolTip text={"Main: Showcases the trick.\nStep(x):Indicates the progression you must follow to learn the trick.\nIt is recommended you are able to execute 10 times in a row each step before going for the next one."} />
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
            <div className="px-5 py-7 w-full flex flex-col gap-5 bg-whitePrimary dark:bg-blackPrimary transition-colors duration-500 ease-in-out">
                <div className="max-w-400 mx-auto w-full">
                    <div className="flex items-center mb-5">
                        <h1 className="font-inter text-2xl ">Modifiers</h1>
                        <InfoToolTip text={"Modifiers are variations of a base trick that change how it is performed.\nThey can alter things like the direction of the trick, hand orientation or even if the fingers are curled during the trick. "}/>
                        {/* <div className=" hidden md:block bg-gray-400 h-px w-40 ml-4 " /> */}
                    </div>
                        <div className="py-2">
                            {availableModifiers.map(mod => (
                                <ModifierToggle
                                    key={mod.id}
                                    modifierId={mod.id}
                                    isActive={activeModifierIds.includes(mod.id)}
                                    onToggle={toggleModifier}
                                    options={["Normal", mod.name]}
                                />
                            ))}
                        </div>
                </div>

            </div>

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

            {/* explanation details */}
            <div className="p-5 bg-whitePrimary dark:bg-blackPrimary flex flex-col gap-3 transition-colors duration-500 ease-in-out w-full">
                <div className="max-w-400 mx-auto w-full">
                    <div className="flex items-center mb-5">
                        <h1 className="font-inter text-2xl ">Trick details</h1>
                    </div>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet nisl vehicula, tincidunt felis vitae, pulvinar diam. Etiam mattis est mi. Mauris convallis tortor nisl, ut pulvinar magna porta vitae. Curabitur auctor rhoncus erat sed vehicula. In at elit dui. Quisque porta erat iaculis, interdum tellus quis, laoreet turpis. Sed hendrerit lectus lorem, placerat efficitur libero accumsan at. Pellentesque porta nulla arcu, et tempor magna accumsan ut. Ut tincidunt felis nunc, vitae suscipit elit venenatis eu. Ut auctor tristique tempor. Morbi imperdiet turpis eu libero fermentum, in luctus odio facilisis. In imperdiet eu sem eget iaculis. Vestibulum ornare varius magna, eget luctus mauris rutrum sit amet. Proin maximus nulla felis, sed pellentesque purus pretium ut. Proin elementum dui enim, blandit auctor nisl suscipit et. Vestibulum pharetra tempus dolor ac viverra. </p>
                </div>
            </div>
            
        </div>
    )
}

export default TrickViewer
