import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const dracoPath = "../static/draco/gltf/"

function createLoader() {

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(dracoPath);
    dracoLoader.preload();
    loader.setDRACOLoader(dracoLoader);

    return loader;
}

export { createLoader }