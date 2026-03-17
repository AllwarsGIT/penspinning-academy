"use client"
import React from 'react'
import ModifierToggle from "./modifierToggle"
import DifficultyBadge from "@/components/difficultyBadge"
import { useState } from "react"

type Instance = {
    modifiers:string[],
    difficulty: string

}

type Trick = {
    name: string,
    notation: string
}

type TrickViewerProps = {
    instance: Instance[]
    trick: Trick
    modifiers: { id: string, name: string, position: string | null }[]
}

const modifierColor: Record<string, string> = {
    reverse: "#22c55e",
    inverse: "#6366f1",
    fingerless: "#f97316"
}

function TrickViewer({trick, instance, modifiers}:TrickViewerProps) {
    // State management for the modifier toggles, this has to be refactorized for it to be a scalable system
    const [isReverse, setIsReverse] = useState(false)
    const [isFingerless, setIsFingerless] = useState(false)

    const activeInstance = instance.find(i =>
        i.modifiers.includes("reverse") === isReverse &&
        i.modifiers.includes("fingerless") === isFingerless
    )

    const hasReverse = instance.some(i => i.modifiers.includes("reverse"))
    const hasFingerless = instance.some(i => i.modifiers.includes("fingerless"))

    
    // Suffix prefix management for name composition
    const activeModifiers = activeInstance?.modifiers ?? []

    const prefixMods = activeModifiers
        .map(id => modifiers.find(m => m.id === id))
        .filter(m => m?.position === "prefix")
        .map(m => ({ name: m?.name, id: m!.id }))

    const suffixMods = activeModifiers
        .map(id => modifiers.find(m => m.id === id))
        .filter(m => m?.position === "suffix")
        .map(m => ({ name: m?.name, id: m!.id }))


    return (
        <div>
            {/* Video */}
            <div className="mt-16 bg-black">
                <div className="w-full max-w-4xl mx-auto aspect-video bg-black">
                    <video 
                        className="w-full  h-full object-contain"
                        controls
                    />
                </div>
            </div>

            {/* Nombre y notación */}
            <div className="w-full p-5 bg-white text-black flex flex-row justify-between items-center">
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
                <div>
                        <DifficultyBadge badge={activeInstance?.difficulty}/>
                </div>
            </div>

            {/* Paginación de pasos */}
            <div className="p-5 bg-gray-400">
                <h1>Steps</h1>
                <button>Main</button>
                <button>Step 1</button>
                <button>Step 2</button>
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
                <h2>Notation</h2>
                <span>Inv Sonic Rev</span>

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
