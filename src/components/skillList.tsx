import React from 'react'
import InfoCard from "@/components/infoCard"
import instances from "@/data/trickInstances.json"

const skillRanges = [
    {   
        number: 1,
        name: "Fundamentals",
        slug: "fundamental",
        description: "Welcome to the hobby! On this level, you will learn the fundamental tricks, these tricks are required for all the future tricks you learn. How well you learn these tricks will determine how easily you can learn future tricks. Have fun!",
        color: "#2563eb",
        active: true
    },
    {
        number: 2,
        name: "Beginner",
        slug: "beginner",
        description: "Congratulations! You already know all the fundamental tricks, now its time to build up a solid base with some new tricks. It is also recommended to learn the reverse version of the fundamentals before advancing to this level.",
        color: "#16a34a",
        active: true
    },
    {
        number: 3,
        name: "Intermediate",
        slug: "intermediate",
        description: "You know the fundamentals and the beginner tricks plus you got a more solid understanding of Pen Spinning mechanics, you're up for the challenge. It is recommended to learn the reverse versions of the beginner tricks before advancing to this level.",
        color: "#ca8a04",
        active: false
    },
    {
        number: 4,
        name: "Advanced",
        slug: "advanced",
        description: "You have mastered the intermediate tricks and are ready to tackle more challenging maneuvers in Pen Spinning. This level requires good understanding of the previous mechanics and specially a solid understanding of the fundamentals. Get ready to push your skills to the limit.",
        color: "#dc2626",
        active: false
    },
    {
        number: 5,
        name: "Expert",
        slug: "expert",
        description: "You are at the pinnacle Pen Spinning, capable of performing complex tricks and hybrids. This level demands exceptional understanding of all the previous mechanics and the ability to think outside of the box. The tricks on this category have the highest difficulty and complexity of all the ranks.",
        color: "#7c3aed",
        active: false
    }
]

function SkillList() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 max-w-7xl">
            {skillRanges.map((range) => (
                <InfoCard
                    key={range.number}
                    number={range.number}
                    name={range.name}
                    slug={range.slug}
                    description={range.description}
                    color={range.color}
                    active={range.active}
                    trickCount={instances.filter(i => i.difficulty === range.slug).length}
                />
            ))}
        </div>
    )
}

export default SkillList