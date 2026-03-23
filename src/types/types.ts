// @/types/types.ts
export type Instance = {
    idTrickName: string
    modifiers: string[]
    difficulty: string
}

export type Trick = {
    name: string
    slug: string
    families: string[]

}

export type Modifier = {
    id: string
    name: string
}