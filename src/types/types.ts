// @/types/types.ts
export type Video = {
    url: string
    type: string
    order: number
    hand?: "left" | "right"
}

export type Instance = {
    idTrickName: string
    modifiers: string[]
    isBase?: boolean
    difficulty: string
    thumbnail: string
    thumbnailHand?: "left" | "right"
    trickDetails: string
    videos: Video[]
    prerequisites?: string[]
}

export type Trick = {
    name: string
    slug: string
    notation: string
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