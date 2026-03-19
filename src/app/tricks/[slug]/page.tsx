
import trickNames from "@/data/trickNames.json"
import instances from "@/data/trickInstances.json"
import modifiers from "@/data/modifiers.json"
import TrickViewer from "./components/trickViewer"




export default async function TrickPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    
    const trick = trickNames.find(t => t.slug === slug)
    const instance = instances.filter(i => i.idTrickName === slug)


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