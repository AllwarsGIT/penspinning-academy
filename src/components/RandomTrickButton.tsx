"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { MdShuffle } from "react-icons/md"
import instancesRaw from "@/data/trickInstances.json"
import { Instance } from "@/types/types"
import { useLearnedTricks } from "@/app/providers/learnedTricksProvider"

const instances = instancesRaw as Instance[]

// Mismo criterio de id que en TrickNameCard/TrickViewer/FilterSidebar —
// tiene que coincidir exactamente o el filtro de "aprendido" no funciona bien aquí.
const getInstanceId = (instance: Instance) =>
    instance.modifiers.length > 0
        ? `${instance.idTrickName}:${[...instance.modifiers].sort().join(",")}`
        : instance.idTrickName

function RandomTrickButton() {
    const router = useRouter()
    const { isLearned, mounted } = useLearnedTricks()
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const handleClick = () => {
        if (loading || !mounted) return
        setLoading(true)

        const notLearned = instances.filter(i => !isLearned(getInstanceId(i)))
        const pool = notLearned.length > 0 ? notLearned : instances
        const random = pool[Math.floor(Math.random() * pool.length)]
        const params = random.modifiers.length > 0 ? `?modifiers=${random.modifiers.join(",")}` : ""

        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 1200)

        router.push(`/tricks/${random.idTrickName}${params}`)
        setLoading(false)
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={handleClick}
                disabled={loading || !mounted}
                aria-label="Go to a random trick you haven't learned yet"
                className="flex items-center justify-center h-10 w-10 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-gray-800 dark:hover:border-gray-400 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <MdShuffle size={20} />
            </button>

            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono tracking-widest uppercase bg-white dark:bg-black text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 px-4 py-1.5 rounded-full shadow-sm z-50"
                    >
                        Random trick!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default RandomTrickButton