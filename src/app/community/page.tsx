import difficulties from "@/data/difficulty.json"
import CommunityViewer from "./components/communityViewer"

export function generateStaticParams() {
    return difficulties.map(d => ({ slug: d.id }))
}

export default async function CommunityPage() {

    return (
        <CommunityViewer
            
        />
    )
}