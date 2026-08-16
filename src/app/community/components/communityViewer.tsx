"use client"
import React from "react"
import CommunityCard from "./communityCard"



function TricksPage() {
    return (
        <div className="relative w-full min-h-[calc(100vh-64px)] mt-10 bg-whitePrimary dark:bg-blackPrimary overflow-hidden *:transition-colors ease-in-out duration-500">

            <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto py-10 px-5 gap-8">

                {/* Header — mismo patrón eyebrow + título que Letter/Hero */}
                <div className="flex flex-col gap-3 items-center text-center max-w-lg">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500">
                        Where to find us
                    </span>
                    <h1 className="text-2xl font-bold font-inter text-black dark:text-white">
                        Communities
                    </h1>
                </div>

                <div className="flex flex-col w-full max-w-2xl gap-3">

                    <CommunityCard
                        title="Planet Pen Spinning"
                        description="English speaking community with special focus on beginners. They have multiple learning focused channels and an ELO system where you can progress through completing quests or battling people. It also hosts PSA's main channels. Join us!"
                        discord="https://discord.gg/nXrgh82u"
                    />

                    <CommunityCard
                        title="Spanish Pen Spinning Community"
                        description="Es la comunidad oficial de habla hispana en pen spinning. En ella encontrarás recursos, eventos y una comunidad activa hispanohablante. También hostea los canales de PSA en español."
                        instagram="https://www.instagram.com/spsc_ofc"
                        youtube="https://www.youtube.com/@spsc_oficial"
                        discord="https://discord.gg/qDQRZ2FR"
                    />

                    <div className="relative rounded-2xl p-[1.5px] bg-linear-to-br from-orange-400 via-fuchsia-400 to-cyan-400">
                        <div className="flex flex-col w-full rounded-2xl p-5 bg-white dark:bg-black">
                            <span className="text-[11px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
                                Your community here?
                            </span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Find Allwars on Planet Pen Spinning or Spanish Pen Spinning Community and send me a message!
                            </p>
                        </div>
                    </div>

                </div>

                {/* Resources — ahora SÍ dentro de su propio contenedor max-w-2xl,
                    para que se alinee en ancho con las cards de Communities de arriba */}
                <div className="flex flex-col w-full max-w-2xl gap-3">

                    <div className="flex flex-col gap-3 items-center text-center max-w-lg mx-auto mb-6">
                        <span className="text-[11px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500">
                            To ease your learning
                        </span>
                        <h1 className="text-2xl font-bold font-inter text-black dark:text-white">
                            Resources
                        </h1>
                    </div>

                    <a
                        href="https://drive.google.com/file/d/1TlDb1H5bRnZZdswmdr07m-58yxs4Es7-/edit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col w-full rounded-2xl p-6
                            bg-white dark:bg-black
                            border border-yellow-400/80 dark:border-yellow-500/80
                            shadow-[0_0_0_1px_rgba(250,204,21,0.25),0_10px_24px_rgba(250,204,21,0.18)]
                            hover:border-yellow-500 dark:hover:border-yellow-400
                            hover:shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_14px_30px_rgba(250,204,21,0.22)]
                            transition-all duration-200 ease-in-out
                            cursor-pointer"
                    >
                        <span className="text-[13px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
                            By RPD
                        </span>
                        <h3 className="text-base font-bold text-yellow-600 dark:text-yellow-400 transition-colors group-hover:text-yellow-700 dark:group-hover:text-yellow-300">
                            Pen Spinning History and Notation
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            This book is the most complete and well structured resource for notation and the overall history of pen spinning anywhere. It has allowed me to develop a proper notation system for the website and it is a must read for anyone interested in pen spinning.
                        </p>
                    </a>

                    <a
                        href="https://drive.google.com/file/d/1R9tjFANDDUTLGyHXJHEht6B_H7vWwYog/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col w-full rounded-2xl p-6
                            bg-white dark:bg-black
                            border border-gray-200 dark:border-gray-800
                            hover:border-gray-300 dark:hover:border-gray-700
                            transition-all duration-200 ease-in-out
                            cursor-pointer"
                    >
                        <span className="text-[13px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
                            By Lisan
                        </span>
                        <h3 className="text-base font-bold text-black dark:text-white transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
                            Complete beginner guide to pen spinning
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            The best compendium of the most important pen spinning resources out there, structured for beginners with definitions and explanations of all the important aspects of the hobby.
                        </p>
                    </a>
                    <a
                        href="https://docs.google.com/document/d/1obGEHaGC3LOV8f0vWH58895JK5tZAjthkfQUfFAlwPM/edit?tab=t.0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col w-full rounded-2xl p-6
                            bg-white dark:bg-black
                            border border-gray-200 dark:border-gray-800
                            hover:border-gray-300 dark:hover:border-gray-700
                            transition-all duration-200 ease-in-out
                            cursor-pointer"
                    >
                        <span className="text-[13px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2">
                            By Magiai
                        </span>
                        <h3 className="text-base font-bold text-black dark:text-white transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
                            The New Trick Index (TrIn)
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            The largest and most complete index of pen spinning tricks and variations anywhere. PSA only uses my own knowledge over the years and some other youtube compilations to feed its own database and it doesnt aim to be nearly as complete as this index. 
                        </p>
                    </a>

                </div>

            </div>
        </div>
    )
}

export default TricksPage