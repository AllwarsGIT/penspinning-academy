// src/app/api/tricks/random/route.ts
import { NextResponse } from "next/server"
import instancesRaw from "@/data/trickInstances.json"
import { Instance } from "@/types/types"

const instances = instancesRaw as Instance[]

export async function GET() {
    if (!instances || instances.length === 0) {
        return NextResponse.json({ error: "No tricks available" }, { status: 404 })
    }

    const random = instances[Math.floor(Math.random() * instances.length)]

    return NextResponse.json({
        slug: random.idTrickName,
        modifiers: random.modifiers,
    })
}

// Usar cuando la database crezca demasiado y no se pueda cargar en memoria, para no tener que cargar todo el JSON en memoria.