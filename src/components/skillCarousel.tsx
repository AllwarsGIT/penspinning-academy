"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import InfoCard from "@/components/infoCard"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const skillRanges = [
    {   
        number: 1,
        name: "Fundamentals",
        description: "On this level, you will learn the 4 fundamental tricks, these tricks are required for all the future tricks you learn. ",
        color: "#3b82f6"
    },
    {
        number: 2,
        name: "Beginner",
        description:"You already know all the fundamental tricks, now its time to build up a solid base with some new tricks. It is also recommended to learn the reverse version of the fundamentals before advancing to this level.",
        color: "#22c55e"
    },
    {
        number: 3,
        name: "Intermediate",
        description:"You know the fundamentals and the beginner tricks plus you got a more solid understanding of Pen Spinning mechanics, you're up for the challenge. It is recommended to learn the reverse versions of the beginner tricks before advancing to this level.",
        color: "#eab308"
    }
]


function SkillCarousel() {
    return (
        <div className="relative w-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 6500,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.next-btn',
                    prevEl: '.prev-btn',
                }}
                spaceBetween={0}
                loop={true}
                speed={800}

                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                className="w-full"
                >
                {skillRanges.map(range => (
                <SwiperSlide key={range.number}>
                    <div className={`w-full h-70 px-3 flex items-center justify-center `}>
                        <InfoCard 
                            number={range.number} 
                            name={range.name} 
                            description={range.description} 
                            color={range.color}
                        />
                    </div>
                </SwiperSlide>
))}
                <button className="hidden prev-btn absolute left-0 top-0 h-full w-12  items-center justify-center
                    bg-transparent dark:hover:bg-white/10 hover:bg-black/10 transition-colors duration-300 z-10">
                    <MdArrowBackIosNew size={30} className="font-bold"/>
                </button>
                <button className="hidden next-btn absolute right-0 top-0 h-full w-12  items-center justify-center
                    bg-transparent dark:hover:bg-white/10 hover:bg-black/10 transition-colors duration-300 z-10">
                    <MdArrowForwardIos size={30} className="font-bold"/>
                </button>
            </Swiper>
        </div>
    )
}

export default SkillCarousel
