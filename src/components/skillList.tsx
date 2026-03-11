import React from 'react'
import InfoCard from "@/components/infoCard"

const skillRanges = [
    {   
        number: 1,
        name: "Fundamentals",
        description: "Welcome to the hobby! On this level, you will learn the 4 fundamental tricks, these tricks are required for all the future tricks you learn. How well you learn these tricks will determine how easily you can learn future tricks. Have fun! ",
        color: "#3b82f6"
    },
    {
        number: 2,
        name: "Beginner",
        description:"Congratulations! You already know all the fundamental tricks, now its time to build up a solid base with some new tricks. It is also recommended to learn the reverse version of the fundamentals before advancing to this level.",
        color: "#22c55e"
    },
    {
        number: 3,
        name: "Intermediate",
        description:"You know the fundamentals and the beginner tricks plus you got a more solid understanding of Pen Spinning mechanics, you're up for the challenge. It is recommended to learn the reverse versions of the beginner tricks before advancing to this level.",
        color: "#eab308"
    },
    {
        number: 4,
        name: "Advanced",
        description:"You have mastered the intermediate tricks and are ready to tackle more challenging maneuvers in Pen Spinning. This level requires good understanding of the previous mechanics and specially a solid understanding of the fundamentals. Get ready to push your skills to the limit.",
        color: "#ef4444"
    },
    // {
    //     number: 5,
    //     name: "Expert",
    //     description:"You are a true master of Pen Spinning, capable of performing complex tricks and hybrids. This level demands exceptional understanding of all the previous mechanics and the ability to think outside of the box. The tricks on this category have the highest difficulty and complexity of all the ranks. ",
    //     color: "#8b5cf6"
    // }
]

function skillList() {
    return (
        <>
            <div className="flex flex-col items-center justify-center lg:grid lg:grid-cols-2  gap-4 max-w-7xl">
                {skillRanges.map((range: typeof skillRanges[0]) => (
                    <InfoCard 
                        key={range.number}
                        number={range.number} 
                        name={range.name} 
                        description={range.description} 
                        color={range.color}
                    />
             ))}
            </div>
        </>
    )
}

export default skillList
