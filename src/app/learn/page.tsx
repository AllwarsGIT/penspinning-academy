
import trickNames from "@/data/trickNames.json"
import instances from "@/data/trickInstances.json"
import modifiers from "@/data/modifiers.json"
import LearnViewer from "./components/learnViewer"




export default async function TrickPage() {
    


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