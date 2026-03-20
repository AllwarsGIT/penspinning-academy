import React from 'react'
import Image from "next/image"

const features = [
    {
        title: "Step by step guides",
        description: "Every trick comes with a structured progression. Follow the steps at your own pace.",
        placeholder: "Steps preview",
        capture:"/Steps.png"
    },
    {
        title: "Modifier toggles",
        description: "Explore every variation — reverse, inverse, fingerless — with a single tap.",
        placeholder: "Toggles preview",
        capture:"/Modifiers.png"
    },
    // {
    //     title: "Dominant hand flip",
    //     description: "Every video can be mirrored instantly for left-handed spinners.",
    //     placeholder: "Hand flip preview",
    //     capture:""
    // },
    {
        title: "Difficulty classification",
        description: "Tricks organized by difficulty so you always know what to learn next.",
        placeholder: "Difficulty preview",
        capture:"/Difficulty.png"
    }
]

function Features() {
    return (
        <section className="flex flex-col bg-white text-black dark:bg-black dark:text-white transition-all ease-in-out duration-500 px-8 py-16 gap-4 items-center">
            <h2 className="text-4xl font-inter text-center font-bold mb-6">Features</h2>
            
            <div className="flex flex-col gap-5 md:w-full w-90 max-w-6xl">
                {features.map((feature, i) => (
                    <div 
                        key={i}
                        className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl  bg-whitePrimary dark:bg-blackPrimary`}
                    >
                        <div className="relative w-84 h-50 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden shrink-0">
                            <Image 
                                src={feature.capture}
                                alt={feature.title}
                                fill
                                sizes="1000px"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold">{feature.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features