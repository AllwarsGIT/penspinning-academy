"use client"

import React from "react"
import { SiKofi, SiPaypal } from "react-icons/si"
import {
    MdFavoriteBorder,
    MdCoffee,
    MdCode,
    MdSchool,
} from "react-icons/md"

function DonateViewer() {
    return (
        <div className="relative w-full min-h-[calc(100vh-64px)] mt-10 bg-[#131313] overflow-hidden">

            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">

                {/* Main warm glow */}
                <div className="absolute left-1/2 top-[-220px] -translate-x-1/2 w-[750px] h-[500px] rounded-full bg-[#FF5E5B]/[0.035] blur-[140px]" />

                {/* Secondary cool glow */}
                <div className="absolute left-[5%] top-[45%] w-[350px] h-[350px] rounded-full bg-[#0070BA]/[0.018] blur-[120px]" />

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.018]"
                    style={{
                        backgroundImage: `
                            linear-gradient(
                                rgba(255,255,255,0.6) 1px,
                                transparent 1px
                            ),
                            linear-gradient(
                                90deg,
                                rgba(255,255,255,0.6) 1px,
                                transparent 1px
                            )
                        `,
                        backgroundSize: "45px 45px",
                    }}
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />

            </div>


            {/* Content */}
            <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto py-10 px-5 gap-10">

                {/* ================= HEADER ================= */}

                <div className="flex flex-col gap-3 items-center text-center max-w-2xl">

                    <span className="text-[11px] font-mono tracking-widest uppercase text-gray-500">
                        Support PSA
                    </span>

                    <h1 className="text-3xl md:text-4xl font-bold font-inter text-white">
                        Help Pen Spinning Academy grow!
                    </h1>

                    <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl">
                        PSA is built to make learning pen spinning a deliberate learning experience with a progression towards autonomy.
                    </p>

                </div>


                {/* ================= DONATION OPTIONS ================= */}

                <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">

                    

                    {/* Ko-fi */}
                    <a
                        href="https://ko-fi.com/allwars"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-2xl border border-gray-800 bg-black p-6 transition-all duration-300 hover:border-[#FF5E5B]/60 hover:-translate-y-0.5"
                    >

                        <div className="flex items-center justify-between mb-6">

                            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#FF5E5B]/10">
                                <SiKofi
                                    size={23}
                                    className="text-[#FF5E5B]"
                                />
                            </div>

                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">
                                Recommended
                            </span>

                        </div>


                        <div className="flex flex-col gap-2">

                            <h2 className="font-inter text-lg font-semibold text-white">
                                Buy me a coffee
                            </h2>

                            <p className="text-sm leading-relaxed text-gray-400">
                                Support PSA with a small one-time donation or a monthly subscription
                                through Ko-fi.
                            </p>

                        </div>


                        <div className="mt-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest">

                            <span className="text-gray-600">
                                Ko-fi
                            </span>

                            <span className="text-gray-400 group-hover:text-[#FF5E5B] transition-colors duration-200">
                                Support →
                            </span>

                        </div>

                    </a>

                    {/* PayPal */}
                    {/* PayPal - Coming soon */}
                    <div
                        className="
                            group
                            flex
                            flex-col
                            rounded-2xl
                            border
                            border-gray-800
                            bg-black
                            p-6
                            opacity-60
                            cursor-not-allowed
                        "
                    >

                        <div className="flex items-center justify-between mb-6">

                            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#008be7]/10">
                                <SiPaypal
                                    size={23}
                                    className="text-[#008be7]"
                                />
                            </div>

                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">
                                Coming soon
                            </span>

                        </div>


                        <div className="flex flex-col gap-2">

                            <h2 className="font-inter text-lg font-semibold text-white">
                                Donate with PayPal
                            </h2>

                            <p className="text-sm leading-relaxed text-gray-400">
                                PayPal donations will be available soon.
                                I&apos;m working on setting it up for PSA.
                            </p>

                        </div>


                        <div className="mt-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest">

                            <span className="text-gray-600">
                                PayPal
                            </span>

                            <span className="text-gray-700">
                                Coming soon
                            </span>

                        </div>

                    </div>

                    

                </div>


                {/* ================= LETTER + SUPPORT ================= */}

                <div className="w-full max-w-3xl">

                    {/* Letter */}
                    <div className="w-full rounded-2xl border border-gray-800 bg-black overflow-hidden">

                        {/* Letter header */}
                        <div className="px-6 py-5 border-b border-gray-900 flex items-center justify-between">

                            <div className="flex items-center gap-2">

                                <MdFavoriteBorder
                                    size={18}
                                    className="text-gray-500"
                                />

                                <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                                    A note from the creator
                                </span>

                            </div>

                            <span className="text-[10px] font-mono text-gray-700">
                                PSA / 2026
                            </span>

                        </div>


                        {/* Letter body */}
                        <div className="px-6 py-8 md:px-10 md:py-10">

                            <div className="max-w-2xl mx-auto flex flex-col gap-5 text-sm leading-7 text-gray-400">

                                <p>
                                    I started this project as a small ambitious personal project to structure Pen Spinning learning in new ways. Now the project is tens of thousands of lines of code big with over 400 hours of work behind the learning, design, and coding of the website.
                                </p>

                                <p>
                                    As the project grows, it is starting to become a solid infrastructure to add even more tricks, variations and features to ease the learning process.
                                    My current direction is to make a Lessons system to be able to add linkages and combos to PSA and help spinners build a bridge between tricks and combos and eventually have a full structured path as well as get a domain and finally make PSA fully public and accessible for everyone.
                                </p>

                                <p>
                                    In order to achieve that i will need a lot of time i currently dont have, and since the website is starting to have a lot of content, it would require me to learn new technologies and maybe make use of premium features of my hosting provider to optimize the website and make it more robust. 
                                </p>

                                <p>
                                    Any donation no matter the size will help me with all these barriers no matter if it is only for the hosting or even enough to get a good filming setup to improve the overall quality.
                                </p>


                                <div className="pt-4">

                                    <span className="font-inter font-semibold text-white">
                                        Thank you all for being part of PSA.
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Support cards */}
                    <div className="relative z-20 -mt-5 px-3">

                        {/* Section label */}
                        <div className="flex items-center gap-3 mb-4">

                            <span className="h-px flex-1 bg-gray-800" />

                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 whitespace-nowrap">
                                What your support helps with
                            </span>

                            <span className="h-px flex-1 bg-gray-800" />

                        </div>


                        {/* Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                            {/* More content */}
                            <div
                                className="
                                    group
                                    flex
                                    flex-col
                                    items-center
                                    text-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-gray-800
                                    bg-black
                                    p-5
                                    shadow-[0_12px_30px_rgba(0,0,0,0.35)]
                                    transition-all
                                    duration-300
                                    ease-out
                                    hover:-translate-y-1
                                    hover:border-gray-700
                                    hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)]
                                "
                            >

                                <MdSchool
                                    size={22}
                                    className="
                                        text-gray-400
                                        transition-all
                                        duration-300
                                        group-hover:text-gray-200
                                        group-hover:scale-110
                                    "
                                />

                                <div className="flex flex-col gap-1">

                                    <span className="text-sm font-semibold text-white">
                                        More content
                                    </span>

                                    <span className="text-xs leading-relaxed text-gray-400">
                                        New tricks, variations and tutorials.
                                    </span>

                                </div>

                            </div>


                            {/* Development */}
                            <div
                                className="
                                    group
                                    flex
                                    flex-col
                                    items-center
                                    text-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-gray-800
                                    bg-black
                                    p-5
                                    shadow-[0_12px_30px_rgba(0,0,0,0.35)]
                                    transition-all
                                    duration-300
                                    ease-out
                                    hover:-translate-y-1
                                    hover:border-gray-700
                                    hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)]
                                "
                            >

                                <MdCode
                                    size={22}
                                    className="
                                        text-gray-400
                                        transition-all
                                        duration-300
                                        group-hover:text-gray-200
                                        group-hover:scale-110
                                    "
                                />

                                <div className="flex flex-col gap-1">

                                    <span className="text-sm font-semibold text-white">
                                        Development
                                    </span>

                                    <span className="text-xs leading-relaxed text-gray-400">
                                        Improvements, domain/hosting and lots of new features!
                                    </span>

                                </div>

                            </div>


                            {/* Motivation */}
                            <div
                                className="
                                    group
                                    flex
                                    flex-col
                                    items-center
                                    text-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-gray-800
                                    bg-black
                                    p-5
                                    shadow-[0_12px_30px_rgba(0,0,0,0.35)]
                                    transition-all
                                    duration-300
                                    ease-out
                                    hover:-translate-y-1
                                    hover:border-gray-700
                                    hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)]
                                "
                            >

                                <MdCoffee
                                    size={22}
                                    className="
                                        text-gray-400
                                        transition-all
                                        duration-300
                                        group-hover:text-gray-200
                                        group-hover:scale-110
                                    "
                                />

                                <div className="flex flex-col gap-1">

                                    <span className="text-sm font-semibold text-white">
                                        Motivation
                                    </span>

                                    <span className="text-xs leading-relaxed text-gray-400">
                                        And sometimes even a coffee as well
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= BOTTOM MESSAGE ================= */}

                <div className="flex flex-col items-center gap-2 text-center pt-2">

                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                        No donation is too small
                    </span>

                    <p className="text-xs text-gray-400">
                        Even using PSA and sharing it with other spinners helps.
                    </p>

                </div>

            </div>
        </div>
    )
}

export default DonateViewer