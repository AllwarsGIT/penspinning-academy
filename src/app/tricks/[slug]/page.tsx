import data from "@/data/trickDatabase.json"

export default async function TrickPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    
    const trick = data.trickName.find(t => t.slug === slug)
    const instances = data.trickInstance.filter(i => i.idTrickName === slug)

    return (
        <div className="pt-16 px-8 w-full min-h-[calc(100vh-64px)]">
            <h1>{trick?.name}</h1>
            {instances.map((instance, i) => (
                <div key={i}>
                    <p>{instance.modifiers.join(", ")}</p>
                </div>
            ))}
        </div>
    )
}