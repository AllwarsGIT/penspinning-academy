import { readFileSync, writeFileSync } from "fs"

const path = process.argv[2]
const modifierId = process.argv[3] ?? "normal"

if (!path) {
    console.error("Uso: node fix-modifiers.mjs ruta/al/archivo.json [modifierId]")
    process.exit(1)
}

const data = JSON.parse(readFileSync(path, "utf-8"))

const fixed = data.map(item => ({
    ...item,
    modifiers: item.modifiers.filter(m => m !== modifierId)
}))

writeFileSync(path, JSON.stringify(fixed, null, 4), "utf-8")
console.log(`Listo. ${fixed.length} elementos procesados. Se eliminó '${modifierId}' de los modifiers.`)