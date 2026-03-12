
import data from "@/data/trickDatabase.json"
import DifficultyBadge from "@/components/difficultyBadge"
import ModifierToggle from "./components/modifierToggle"
import TrickViewer from "./components/trickViewer"




export default async function TrickPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    
    const trick = data.trickName.find(t => t.slug === slug)
    const instance = data.trickInstance.filter(i => i.idTrickName === slug)
    const modifiers = data.modifiers


    return (
        <>
            <TrickViewer
                trick={trick!}
                instance={instance}
                modifiers={modifiers}
            />
        </>
    )
}