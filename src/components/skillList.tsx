import React from 'react'
import InfoCard from "@/components/infoCard"

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

function skillList() {
    return (
        <>
            {skillRanges.map((range: typeof skillRanges[0]) => (
                <div key={range.number} className={`w-full  p-3 flex flex-col items-center justify-start max-w-150 `}>
                    <InfoCard 
                        number={range.number} 
                        name={range.name} 
                        description={range.description} 
                        color={range.color}
                    />
                </div>
            ))}
        </>
    )
}

export default skillList
