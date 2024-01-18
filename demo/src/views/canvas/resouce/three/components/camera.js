import { PerspectiveCamera } from "three";

/**
 * 创建一个Three.js的相机对象。
 * 
 * @param {Object} options - 可选参数，用于设置相机，如fov（视线夹角）、aspect（纵横比）、near（近距）和far（远距）。此外，还可以通过调整相机的位置（x、y、z）。
 * @returns {PerspectiveCamera} 返回创建的相机对象。
 */
function createCamera(
    options = {
        fov: 35,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        x: 0,
        y: 0,
        z: 10
    }) {
    const { fov, aspect, near, far, x, y, z } = options;
    //使用透视相机
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(x, y, z);

    return camera;
}
export { createCamera }