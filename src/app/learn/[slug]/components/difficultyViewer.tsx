"use client"
import TrickNameList from "@/components/trickNameList"
import TrickNameListReverse from "@/components/trickNameListReverse"
import { IoMdArrowRoundBack } from "react-icons/io";
import { Trick, Instance, Modifier, Difficulty } from "@/types/types"
import Link from "next/link"

type DifficultyViewerProps = {
    difficulty: Difficulty
    tricks: Trick[]
    instances: Instance[]
    modifiers: Modifier[]
}

export default function DifficultyViewer({ difficulty, tricks, instances, modifiers }: DifficultyViewerProps) {
    return (
        <div className="w-full min-h-[calc(100vh-64px)] p-5 py-10 flex flex-col justify-center items-center bg-white dark:bg-black transition-colors ease-in-out duration-500">
            <section className="flex flex-col w-full max-w-400 gap-4 ">
                <div className="sticky top-16 z-20 -mx-5 px-5 flex flex-row items-center gap-3 py-5 bg-white dark:bg-black backdrop-blur-md ">
                    <Link 
                        href="/learn" 
                        className="flex items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer text-white shrink-0"
                        style={{ 
                            backgroundColor: difficulty.color,
                            boxShadow: `0 4px 0 0 ${difficulty.color}99`
                        }}
                        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.9)' }}
                        onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}
                    >
                        <IoMdArrowRoundBack size={20} />
                    </Link>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: difficulty.color }}>
                            Skill level
                        </span>
                        <h1 className="text-2xl font-bold leading-tight">{difficulty.name}</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-10">
                    <TrickNameList
                        difficulty={difficulty.id}
                        trickNames={tricks}
                        trickInstances={instances}
                        modifiers={modifiers}
                    />
                </div>
                

                 <div className="flex sticky flex-col gap-4 mt-20">
                    <h2 className="text-2xl font-bold">Reverse </h2>
                    <TrickNameListReverse
                        difficulty={difficulty.id}
                        trickNames={tricks}
                        trickInstances={instances}
                        modifiers={modifiers}
                    />
                </div>
            </section>
        </div>
    )
}