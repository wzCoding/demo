import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const loaderPath = {
    draco: "../static/draco/gltf/",
}

function createLoader(type = 'draco') {

    const loader = new GLTFLoader();
    
    if (type === 'draco') {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(loaderPath[type]);
        dracoLoader.preload();
        loader.setDRACOLoader(dracoLoader);
    }

    return loader;
}

export { createLoader }