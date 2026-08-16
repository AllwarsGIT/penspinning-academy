
import DonateViewer from "./components/donateViewer"
import { Instance, Trick } from "@/types/types"



export default async function TrickPage({ params }: { params: { slug: string } }) {
    

    return (
        <>
            <DonateViewer />
        </>
    )
}