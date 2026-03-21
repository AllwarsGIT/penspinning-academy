"use client"
import React from "react"
import Image from "next/image"
import SkillList from "@/components/skillList"
import TrickNameList from "@/components/trickNameList"

const sections = [
  { 
    id: "intro", 
    label: "Intro" 
  },
  { 
    id: "fundamentals", 
    label: "Fundamentals" 
  },
  { 
    id: "beginner", 
    label: "Beginner" 
  },
//   { id: "intermediate", label: "Intermediate" },
//   { id: "advanced", label: "Advanced" },
]

function TricksPage() {
    return (
        <div className="w-full min-h-[calc(100vh-64px)] ">

            {/* Sticky secondary nav */}
            {/* <nav className="sticky top-16 z-40 bg-white dark:bg-black border-b border-t border-gray-200 dark:border-gray-800 flex items-center justify-center transitionñ-colors ease-in-out duration-500">
                <div className="flex gap-6 px-8 py-3 overflow-x-auto">
                {sections.map(s => (
                    <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap text-sm font-medium hover:text-black dark:hover:text-white text-gray-500 transition-colors">
                    {s.label}
                    </a>
                ))}
                </div>
            </nav> */}

            <div className="relative  mt-16  min-h-150 py-12 w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black transition-all duration-500 ease-in-out">
                <Image 
                    src="/learnPortraitUpscaled.jpeg"
                    alt="Learn Pen Spinning"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover opacity-60 "
                />
                <div className="relative z-10 flex flex-col justify-center items-center">
                    <h1 className="text-center text-4xl md:text-6xl font-bold">Learn Pen Spinning</h1>
                    <p className=" text-sm md:text-lg text-gray-800 dark:text-gray-300 mt-2">From fundamentals to expert tricks</p>
                </div>
            </div>

            {/* Skill range block */}
            <div className=" bg-whitePrimary dark:bg-blackPrimary w-full min-h-1/6 p-5 py-10 flex flex-col justify-center items-center transition-colors ease-in-out duration-500 ">
                <h2 className="text-3xl p-5 font-inter">Skill levels</h2>
                <SkillList />
            </div>



            <div className=" p-5 py-10 flex flex-col justify-center items-center gap-16 bg-white dark:bg-black transition-colors ease-in-out duration-500">
                {/* <section id="intro" className="flex flex-col w-full max-w-400 gap-4 scroll-mt-32">
                    <h1 className="py-5 text-2xl font-bold">Intro</h1>
                        
                    
                </section> */}

                <section id="fundamentals" className="flex flex-col w-full max-w-400 gap-4 scroll-mt-32">
                    <h1 className="py-5 text-2xl font-bold">Fundamentals</h1>
                    <TrickNameList difficulty="fundamental"/>


                </section>

                {/* <section id="beginner" className="flex flex-col w-full max-w-400 gap-4 scroll-mt-32">
                    <h1 className="text-2xl font-bold">Beginner</h1>
                    <TrickNameList difficulty="beginner"/>


                </section> */}

            </div>

        </div>
    )
}
export default TricksPage