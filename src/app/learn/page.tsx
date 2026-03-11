"use client"
import React from "react"
import data from "@/data/trickDatabase.json"
import Link from "next/link"
import TemplateCard from "@/components/templateCard"
import SkillCarousel from "@/components/skillCarousel"
import SkillList from "@/components/skillList"


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
            <nav className="sticky top-16 z-40 bg-white dark:bg-black border-b border-t border-gray-200 dark:border-gray-800 flex items-center justify-center transitionñ-colors ease-in-out duration-500">
                <div className="flex gap-6 px-8 py-3 overflow-x-auto">
                {sections.map(s => (
                    <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap text-sm font-medium hover:text-black dark:hover:text-white text-gray-500 transition-colors">
                    {s.label}
                    </a>
                ))}
                </div>
            </nav>

            <div className=" bg-gray-500 mt-16 px-8 min-h-150 py-12 w-full flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Learn Pen Spinning</h1>
                <p className="text-gray-700 mt-2">From fundamentals to expert tricks</p>
            </div>

            {/* Skill range block */}
            <div className=" bg-whitePrimary dark:bg-blackPrimary w-full min-h-1/6 p-5 py-10 flex flex-col justify-center items-center transition-colors ease-in-out duration-500 ">
                <h2 className="text-3xl font-inter">Skill levels</h2>

                <div className="flex flex-col items-start lg:grid lg:grid-cols-2 items-stretch">
                    <SkillList />
                </div>                

            </div>



            <div className="px-8 py-12 flex flex-col gap-16 bg-white dark:bg-black transition-colors ease-in-out duration-500">
                <section id="intro" className="flex flex-col gap-4  scroll-mt-32 ">
                    <h1 className="text-2xl font-bold">Intro</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <TemplateCard />
                        <TemplateCard />
                        <TemplateCard />
                        <TemplateCard />
                    </div>

                    
                </section>

                <section id="fundamentals" className="flex flex-col gap-4 scroll-mt-32">
                    <h1 className="text-2xl font-bold">Fundamentals</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <TemplateCard />
                        <TemplateCard />
                        <TemplateCard />
                        <TemplateCard />
                    </div>

                </section>

                <section id="beginner" className="flex flex-col gap-4 scroll-mt-32">
                    <h1 className="text-2xl font-bold">Beginner</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <TemplateCard />
                        <TemplateCard />
                        <TemplateCard />
                        <TemplateCard />
                    </div>

                </section>

            </div>

        </div>
    )
}
export default TricksPage