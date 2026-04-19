import DifficultyViewer from "./components/difficultyViewer"
import difficulties from "@/data/difficulty.json"
import instances from "@/data/trickInstances.json"
import tricks from "@/data/trickNames.json"
import modifiers from "@/data/modifiers.json"
import { notFound } from "next/navigation"

export function generateStaticParams() {
    return difficulties.map(d => ({ slug: d.id }))
}

export default async function DifficultyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const difficulty = difficulties.find(d => d.id === slug)
    if (!difficulty) notFound()

    return (
        <DifficultyViewer
            difficulty={difficulty}
            tricks={tricks}
            instances={instances}
            modifiers={modifiers}
        />
    )
}