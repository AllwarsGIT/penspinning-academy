
import trickNames from "@/data/trickNames.json"
import instancesRaw from "@/data/trickInstances.json"
import modifiers from "@/data/modifiers.json"
import LearnViewer from "./components/learnViewer"
import type { Instance } from "@/types/types"




export default async function TrickPage() {
    const instances = instancesRaw as unknown as Instance[]

    return (
        <>
            <LearnViewer
                trick={trickNames}
                instance={instances}
                modifiers={modifiers}
            />
        </>
    )
}