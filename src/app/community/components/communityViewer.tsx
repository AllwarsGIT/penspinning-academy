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
                
                    
                    <div className="flex-col mx-5  gap-3 flex">
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
                    
                    
                   
                <div className="relative overflow-hidden rounded-2xl p-[2px] shadow-[inset_0_0_30px_rgba(255,0,0,0.2),inset_0_0_60px_rgba(255,127,0,0.16),inset_0_0_90px_rgba(255,255,0,0.12),inset_0_0_120px_rgba(0,255,0,0.1),inset_0_0_150px_rgba(0,255,255,0.08),inset_0_0_180px_rgba(0,0,255,0.06),inset_0_0_210px_rgba(139,0,255,0.05)]">
                    {/* Borde arcoíris animado */}
                        <div
                            className="absolute -inset-full bg-[conic-gradient(red,orange,yellow,lime,cyan,blue,purple,red)] blur-2xl"
                        />

                        {/* Contenido */}
                        <div className="relative z-10 flex flex-col w-full rounded-2xl p-5 bg-white dark:bg-black transition-colors duration-500">
                            <div className="flex items-center gap-2 mb-3">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                                Your community here?
                            </h3>
                            </div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                            Find Allwars on Planet Pen Spinning or Spanish Pen Spinning Community and send me a message!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TricksPage