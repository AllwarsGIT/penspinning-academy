import React from 'react'
import DiscordButton from "@/components/discordInvite"

function Letter() {
    return (
        <section className=" flex flex-col w-full px-8 py-16 bg-white dark:bg-black transition-colors duration-500 items-center justify-center">
            <div className="max-w-2xl w-full flex flex-col gap-6">
                <h2 className="text-2xl font-bold font-inter">To the penspinning community</h2>
                <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                    <p>Hello, penspinners.</p>
                    <p>I have created this website with the goal of having a unified source of information about penspinning tricks. I have also built it in a way that allows exponential growth, so i hope to have a complete trick database over time with more tutorials and information.</p>
                    <p>The website has many tools to reach this goal, but i am open to feedback through the Planet pen spinning discord, or the SPSC discord.</p>
                    <p>I want to thank <strong className="text-black dark:text-white">CrisWea!!</strong>, <strong className="text-black dark:text-white">Mumm3y</strong>, <strong className="text-black dark:text-white">Silva[PSC]</strong>, <strong className="text-black dark:text-white">Lauti</strong> and <strong className="text-black dark:text-white">Avisuper</strong> for their testing and support through this project. Special thanks to Avisuper again for making the logo for the website. And special thanks to <strong className="text-black dark:text-white">RPD</strong> for making the Pen Spinning History and Notation book, it has been an essential tool in order to develop a proper system for the notation display and some other related info.</p>
                    <p>I hope you all find this tool useful. Learn and enjoy!</p>

                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500 italic">— Allwars</p>
            </div>

            <div className="max-w-2xl w-full flex flex-col gap-6 mt-15">
                <h3 className="text-2xl font-bold font-inter">Join the community!</h3>
                <div className="flex flex-col gap-4 justify-center">
                    <DiscordButton inviteCode="YvV3hSPen" label="Planet Pen Spinning" />
                    <DiscordButton inviteCode="c83J3mPw" label="SPSC - Spanish Pen Spinning Community"/>
                </div>
            </div>
            
            
        </section>
    )
}

export default Letter