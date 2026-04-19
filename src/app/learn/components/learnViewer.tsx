"use client"
import React from "react"
import SkillList from "@/components/skillList"
import { Instance, Trick, Modifier } from "@/types/types"
import Announcement from "./announcement"
import { FaDiscord } from "react-icons/fa"

type LearnViewerProps = {
    instance: Instance[]
    trick: Trick[]
    modifiers: Modifier[]
}

function TricksPage({ instance, trick, modifiers }: LearnViewerProps) {
    return (
        <div className="w-full min-h-[calc(100vh-64px)] mt-16 bg-whitePrimary dark:bg-blackPrimary *:transition-colors ease-in-out duration-500">
            <div className="flex flex-row items-start max-w-screen-2xl mx-auto py-10 gap-8">
                
                {/* Sidebar izquierdo */}
                <aside className="hidden xl:flex xl:w-72 shrink-0 sticky top-31 self-start flex-col gap-4">
                    <Announcement
                        title="Planet Pen Spinning"
                        description="Join the planet pen spinning community on Discord to share your progress and get help."
                        link="https://discord.gg/YvV3hSPen"
                        linkLabel="Join Discord"
                        icon={<FaDiscord size={18} />}
                        color="#5865F2"
                        shadowColor="#4752c499"
                    />
                    <Announcement
                        title="SPSC"
                        description="Únete a la comunidad hispanohablante de pen spinning!"
                        link="https://discord.gg/KcYtDuTc"
                        linkLabel="Join Discord"
                        icon={<FaDiscord size={18} />}
                        color="#5865F2"
                        shadowColor="#4752c499"
                    />
                </aside>

                {/* Contenido principal */}
                <div className="flex-1 flex flex-col gap-8 items-center">
                    <div className="w-full bg-whitePrimary dark:bg-blackPrimary rounded-2xl p-5 flex flex-col justify-center items-center transition-colors ease-in-out duration-500">
                        <SkillList />
                    </div>
                </div>

                {/* Sidebar derecho */}
                <aside className="hidden xl:flex xl:w-72 shrink-0 sticky top-31 self-start flex-col gap-4">
                    <Announcement
                        title="NXGC"
                        description="Check out the NeXTGen Cup! A pen spinning tournament for the new generation of spinners."
                        link="https://discord.gg/4g7KSm9a"
                        linkLabel="Join Discord"
                        icon={<FaDiscord size={18} />}
                        color="#5865F2"
                        shadowColor="#4752c499"
                    />
                </aside>

            </div>
        </div>
    )
}

export default TricksPage