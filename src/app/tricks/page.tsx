import React from "react"
import Link from "next/link"

function TricksPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] pt-16 flex flex-col items-center justify-center gap-8 px-8 text-center">
            
            <div className="flex flex-col items-center gap-4 max-w-md">
                <span className="text-xs font-mono tracking-widest uppercase text-gray-400">
                    PSA / Tricks
                </span>
                <h1 className="text-4xl font-medium text-black dark:text-white">
                    Coming soon
                </h1>
                <p className="text-gray-500 leading-relaxed">
                    The full trick index with filters by family, difficulty and modifiers is on its way. For now, start learning with the fundamentals.
                </p>
                <Link 
                    href="/learn"
                    className="mt-2 px-5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                    Go to Learn
                </Link>
            </div>


        </div>
    )
}

export default TricksPage