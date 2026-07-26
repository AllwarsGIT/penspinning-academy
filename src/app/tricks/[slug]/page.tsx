
import trickNames from "@/data/trickNames.json"
import instancesRaw from "@/data/trickInstances.json"
import modifiers from "@/data/modifiers.json"
import TrickViewer from "./components/trickViewer"
import { Instance, Trick } from "@/types/types"

const instances = instancesRaw as Instance[]
const trickCatalog = trickNames as Trick[]


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
                allTricks={trickCatalog}
            />
        </>
    )
}