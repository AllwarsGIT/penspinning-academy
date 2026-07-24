"use client"
import React from "react"
import Event from "./event"
import Announcement from "./announcement"
import { FaDiscord } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa"
import CommunityCard from "./communityCard"



function TricksPage() {
    return (
        <div className="w-full min-h-[calc(100vh-64px)] mt-10 bg-whitePrimary dark:bg-blackPrimary *:transition-colors ease-in-out duration-500">
            <div className="flex flex-col items-center max-w-7xl mx-auto py-10 gap-3">
                    {/* <h1 className="text-3xl font-bold text-center text-black dark:text-white">Live events</h1> */}
                
                    {/* <Event
                        title="Pen Spinning Olympics"
                        description="Ongoing"
                        twitter="https://x.com/WorldPSEvents"
                        web="https://pso26.penspinning.world/"

                    />
                    <Event
                        title="NeXTGen Cup"
                        description="Ongoing"
                        twitter="https://x.com/nxgc_ps"
                        discord="https://discord.gg/mR3HBgEf"
                        youtube="https://www.youtube.com/@nextgencup-b3r"

                    /> */}
                    <h1 className="text-3xl my-5 font-bold text-center text-black dark:text-white">Communities</h1>
                    <CommunityCard
                        title="Planet Pen Spinning"
                        description="English speaking community with special focus on beginners. They have multiple learning focused channels. It also hosts PSA's main channels. Join us!"
                        discord="https://discord.gg/nXrgh82u"
                    />
                    <CommunityCard
                        title="Spanish Pen Spinning Community"
                        description="Es la comunidad oficial de habla hispana en pen spinning. En ella encontrarás recursos, eventos y una comunidad activa hispanohablante. También hostea los canales de PSA en español."
                        instagram="https://www.instagram.com/spsc_ofc"
                        youtube="https://www.youtube.com/@spsc_oficial"
                        discord="https://discord.gg/qDQRZ2FR"
                    />
                    {/* <CommunityCard
                        title="Spanish Pen Spinning Community"
                        description="Es la comunidad oficial de habla hispana en pen spinning. En ella encontrarás recursos, eventos y una comunidad activa hispanohablante. También hostea los canales de PSA en español."
                        instagram="https://www.instagram.com/spsc_ofc"
                        youtube="https://www.youtube.com/@spsc_oficial"
                        discord="https://discord.gg/qDQRZ2FR"
                    /> */}
                    <div className="flex flex-col w-full rounded-2xl p-5  bg-white dark:bg-black border border-gray-600 dark:border-gray-400 transition-colors ease-in-out duration-500">
                        <div className="flex items-center gap-2 mb-3">
                            {/* <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                            </span> */}
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                            Your community here?
                            </h3>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 justify-self-center">Find Allwars on Planet Pen Spinning or Spanish Pen Spinning Community and send me a message!</p>

                       
                    </div>
            </div>
        </div>
    )
}

export default TricksPage