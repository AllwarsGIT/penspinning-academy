import React from "react"
import data from "@/data/trickDatabase.json"
import Link from "next/link"

function TricksPage() {
    return (
        <div className="pt-16 px-8 w-full min-h-[calc(100vh-64px)]">
            {data.trickName.map(trick => (
                <Link key={trick.id} href={`/tricks/${trick.slug}`}>
                    <h2>{trick.name}</h2>
                </Link>
            ))}
        </div>
    )
}
export default TricksPage