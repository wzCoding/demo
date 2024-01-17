import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/dracoloader";

import { setupModel } from "./setupModel";


async function loadBirds() {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("static/draco/gltf/");
    dracoLoader.preload();
    loader.setDRACOLoader(dracoLoader);

    const [parrotData, flamingoData, storkData] = await Promise.all([
        loader.loadAsync("../../../static/models/Parrot.glb"),
        loader.loadAsync("../../../static/models/Flamingo.glb"),
        loader.loadAsync("../../../static/models/Stork.glb")
    ]);
    const parrot = setupModel(parrotData);
    parrot.position.set(10,-10,0.25);
    const flamingo = setupModel(flamingoData);
    flamingo.position.set(30,-5,-10);
    const stork = setupModel(storkData);
    stork.position.set(-15,-6,-10);

    return { parrot,flamingo,stork }
}

export { loadBirds }