// @/types/types.ts
export type Instance = {
    idTrickName: string
    modifiers: string[]
    isBase?: boolean
    difficulty: string
    thumbnail: string
}

export type Trick = {
    name: string
    slug: string
    families: string[]

}

export type Modifier = {
    id: string
    name: string
    notation: string | null
    position: string | null
}

export type Difficulty = {
    id: string
    name: string
    description: string
    color: string
}