import { createLoader } from "../components/loader"
import { setupModel } from "./setupModel"

const modelsPath = [
    "../static/models/Parrot.glb",
    "../static/models/Flamingo.glb",
    "../static/models/Stork.glb"
]

async function loadBirds(birds = [
    { name: "", position: [] },
]) {
    const loader = createLoader('draco')
    // 加载模型
    const birdData = await Promise.all(modelsPath.map(path => loader.loadAsync(path)))
    const birdsModels = {}
    for (let i = 0; i < birdData.length; i++) {
        birdsModels[birds[i].name] = setupModel(birdData[i])
        birdsModels[birds[i].name].position.set(...birds[i].position)
    }

    return birdsModels
}

export { loadBirds }