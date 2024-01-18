import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { setupModel } from "./setupModel";


async function loadBirds(birds = [
    { name: "", url: "", position: [] }
]) {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("../../../../../../canvas/resouce/three/static/draco/gltf/");
    dracoLoader.preload();
    loader.setDRACOLoader(dracoLoader);
    // 加载模型
    // loader.loadAsync("@/static/models/Parrot.glb"),
    // loader.loadAsync("@/static/models/Flamingo.glb"),
    // loader.loadAsync("@/static/models/Stork.glb")
    const birdData = await Promise.all(birds.map(item => loader.loadAsync(item.url)));
    const birdsModels = {}
    for (let i = 0; i < birdData.length; i++) {
        birdsModels[birds[i].name] = setupModel(birdData[i]);
        birdsModels[birds[i].name].position.set(...birds[i].position);
    }

    return birdsModels
}

export { loadBirds }