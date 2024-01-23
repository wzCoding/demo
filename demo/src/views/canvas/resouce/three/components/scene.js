import { Color, Scene, Fog, EquirectangularReflectionMapping } from "three";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { createLights } from './lights';


/**
 * 创建一个Three.js场景，并设置一些基本的属性和lights。
 * 
 * @param {Object} options - 可选参数，用于设置场景，背景色（background）、是否需要lights（needLights）、以及场景中的物体（sceneObjects:[]）。例如：`{ background: "#a0cfff", needLights: true, sceneObjects: [] }`
 * @returns {Scene} 返回创建的场景scene。
 */
function createScene(options = {
    background: "#a0cfff",
    env: "",
    needLights: [],
    sceneObjects: [],
    fog: true
}) {
    const { background, needLights, sceneObjects, env, fog } = options;
    const scene = new Scene();

    //设置场景默认背景色
    scene.background = new Color(background);

    //设置场景光照
    if (needLights && needLights.length) {
        const lights = createLights(needLights);
        scene.add(...lights);
    }

    //设置场景添加物体
    if (sceneObjects && sceneObjects.length) {
        sceneObjects.forEach(obj => { scene.add(obj) }); //设置向场景中添加的展示物体
    }

    //设置场景环境贴图
    if (env) {
        const envPath = typeof env === 'string' ? env : '../static/texture/venice_sunset_1k.hdr'
        loadEnv(envPath).then((texture) =>{
            scene.environment = texture
            scene.environment.mapping = EquirectangularReflectionMapping;
        })
    }

    //设置场景fog
    if (fog) {
        scene.fog = new Fog("#333333", 10, 20);
    }

    return scene;
}

async function loadEnv(path) {
    return await new RGBELoader().loadAsync(path)
}

export { createScene }