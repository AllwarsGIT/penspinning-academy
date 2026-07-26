import { Suspense } from "react"
import trickNames from "@/data/trickNames.json"
import instancesRaw from "@/data/trickInstances.json"
import modifiers from "@/data/modifiers.json"
import TricksViewer from "./components/tricksViewer"
import type { Instance } from "@/types/types"

export default async function TricksPage() {
    const instances = instancesRaw as unknown as Instance[]

    return (
        <Suspense fallback={null}>
            <TricksViewer
                trick={trickNames}
                instance={instances}
                modifiers={modifiers}
            />
        </Suspense>
    )
}