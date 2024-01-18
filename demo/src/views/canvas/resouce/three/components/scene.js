import { Color, Scene } from "three";
import { createLights } from './lights';


/**
 * 创建一个Three.js场景，并设置一些基本的属性和lights。
 * 
 * @param {Object} options - 可选参数，用于设置场景，背景色（background）、是否需要lights（needLights）、以及场景中的物体（sceneObjects:[]）。例如：`{ background: "#a0cfff", needLights: true, sceneObjects: [] }`
 * @returns {Scene} 返回创建的场景scene。
 */
function createScene(options = {
    background: "#a0cfff",
    needLights: true,
    sceneObjects: []
}) {
    const { background, needLights, sceneObjects } = options;
    const scene = new Scene();
    scene.background = new Color(background); //设置场景默认背景色

    if (needLights) {
        const types = ["ambi", "main"];
        const { ambientLight, mainLignt } = createLights({ types });
        scene.add(ambientLight, mainLignt);
    }
    if (sceneObjects && sceneObjects.length) {
        sceneObjects.forEach(obj => { scene.add(obj) }); //设置向场景中添加的展示物体
    }
    return scene;
}
export { createScene }