import { createLoader } from "../components/loader";
import { setupModel } from "./setupModel";


async function loadBirds(birds = [
    { name: "", url: "", position: [] },
]) {
    const loader = createLoader();
    // 加载模型
    const birdData = await Promise.all(birds.map(item => loader.loadAsync(item.url)));
    const birdsModels = {}
    for (let i = 0; i < birdData.length; i++) {
        birdsModels[birds[i].name] = setupModel(birdData[i]);
        birdsModels[birds[i].name].position.set(...birds[i].position);
    }

    return birdsModels
}

export { loadBirds }