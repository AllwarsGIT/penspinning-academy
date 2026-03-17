"use client"
import React from 'react'
import ModifierToggle from "./modifierToggle"
import DifficultyBadge from "@/components/difficultyBadge"
import { useState } from "react"

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
    //TODO: State management for the modifier toggles, this has to be refactorized for it to be a scalable system
    const [isReverse, setIsReverse] = useState(false)
    const [isFingerless, setIsFingerless] = useState(false)

    // Video state for pagination
    const [activeVideo, setActiveVideo] = useState("main")

    const activeInstance = instance.find(i =>
        i.modifiers.includes("reverse") === isReverse &&
        i.modifiers.includes("fingerless") === isFingerless
    )


    // const mainVideo = activeInstance?.videos.find(v => v.type === "main")
    const stepVideos = activeInstance?.videos.filter(v => v.type === "step") ?? []

    const hasReverse = instance.some(i => i.modifiers.includes("reverse"))
    const hasFingerless = instance.some(i => i.modifiers.includes("fingerless"))

    
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
        <div className="flex flex-col ">
            {/* Video */}
            <div className="mt-16 bg-black">
                <div className="w-full max-w-4xl mx-auto aspect-video bg-black">
                    <video 
                        className="w-full  h-full object-contain"
                        controls
                    />
                </div>
            </div>

            {/* Name */}
            <div className="w-full p-5 bg-white text-black flex flex-col md:flex-row justify-between items-start md:items-center">
                <h1 className="font-inter text-2xl flex flex-row gap-1">
                    {prefixMods.map((mod, i) => (
                        <span key={i} style={{ color: modifierColor[mod.id] }}>
                            [{mod.name}]
                        </span>
                    ))}
                    <span className="">{trick.name}</span>
                    {suffixMods.map((mod, i) => (
                        <span key={i} style={{ color: modifierColor[mod.id] }}>
                            [{mod.name}]
                        </span>
                    ))}
                </h1>
                <div className="pt-3 md:pt-0">
                        <DifficultyBadge badge={activeInstance?.difficulty}/>
                </div>
            </div>

            {/* Step pagination */}
            <div className="p-5 bg-blue-200">
                    <h1>Steps</h1>
                <div className="flex flex-row gap-2">
                    <button 
                        onClick={() => setActiveVideo("main")}
                        className={activeVideo === "main" ? "bg-white text-black" : "text-gray-400"}
                    >
                        Main
                    </button>
                    {stepVideos.map((step, i) => (
                        <button 
                            key={i}
                            onClick={() => setActiveVideo(step.order.toString())}
                            className={activeVideo === step.order.toString() ? "bg-white text-black" : "text-gray-400"}
                        >
                            Step {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Toggles */}
            <div className="p-5 bg-amber-400">
                {hasReverse && (
                    <ModifierToggle 
                        value={isReverse}
                        onChange={setIsReverse}
                        options={["Normal", "Reverse"]}
                    />
                )}

                {hasFingerless && (
                    <ModifierToggle 
                        value={isFingerless}
                        onChange={setIsFingerless}
                        options={["Normal", "Fingerless"]}
                    />
                )}

                <div className="bg-amber-200"> 
                    <h2 className="font-inter text-2xl">Notation</h2>
                    <div className="flex flex-row gap-1">
                        {prefixMods.map((mod, i) => (
                            <span key={i} style={{ color: modifierColor[mod.id] }}>
                                [{mod.notation}]
                            </span>
                        ))}
                        <span className="">{trick.notation}</span>
                        {suffixMods.map((mod, i) => (
                            <span key={i} style={{ color: modifierColor[mod.id] }}>
                                [{mod.notation}]
                            </span>
                        ))}
                    </div>
                    
                </div>
               

            </div>

            {/* Explicación */}
            <div className="p-5 bg-cyan-400">
                <h1>Trick details</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet nisl vehicula, tincidunt felis vitae, pulvinar diam. Etiam mattis est mi. Mauris convallis tortor nisl, ut pulvinar magna porta vitae. Curabitur auctor rhoncus erat sed vehicula. In at elit dui. Quisque porta erat iaculis, interdum tellus quis, laoreet turpis. Sed hendrerit lectus lorem, placerat efficitur libero accumsan at. Pellentesque porta nulla arcu, et tempor magna accumsan ut. Ut tincidunt felis nunc, vitae suscipit elit venenatis eu. Ut auctor tristique tempor. Morbi imperdiet turpis eu libero fermentum, in luctus odio facilisis. In imperdiet eu sem eget iaculis. Vestibulum ornare varius magna, eget luctus mauris rutrum sit amet. Proin maximus nulla felis, sed pellentesque purus pretium ut. Proin elementum dui enim, blandit auctor nisl suscipit et. Vestibulum pharetra tempus dolor ac viverra. </p>
            </div>
        </div>
    )
}

export default TrickViewer
