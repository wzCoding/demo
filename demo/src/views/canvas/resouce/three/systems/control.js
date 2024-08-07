import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


/**
 * 创建并配置Three.js的OrbitControls。
 * @param {Object} options - 选项对象，可以控制OrbitControls的行为。
 * @param {THREE.Camera} camera - 要控制的相机。
 * @param {HTMLCanvasElement} canvas - 关联的画布。
 * @param {boolean} [enableDamping=true] - 是否启用阻尼。
 * @param {boolean} [listenToKeyEvents=false] - 是否启用按键事件监听。
 * @param {boolean} [autoRotate=true] - 是否启用自动旋转。
 * @param {number} [autoRotateSpeed=0.5] - 自动旋转速度。
 * @param {number} [minDistance=0.5] - 最小距离。
 * @param {number} [maxDistance=20] - 最大距离。
 * @returns {OrbitControls} 配置好的OrbitControls实例。
 */
function createControls(options = {
    camera: {},
    canvas: {},
    enableDamping: true,
    listenToKeyEvents: false,
    autoRotate: false,
    autoRotateSpeed: 1,
    minDistance: 5,
    maxDistance: 1
}) {
    const { camera, canvas, enableDamping, listenToKeyEvents, autoRotate, autoRotateSpeed, minDistance, maxDistance } = options;
    const controls = new OrbitControls(camera, canvas);

    controls.minDistance = minDistance || 5;
    controls.maxDistance = maxDistance || 15;

    if (enableDamping) controls.enableDamping = enableDamping;
    if (listenToKeyEvents) controls.listenToKeyEvents(window);

    if (autoRotate) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = autoRotateSpeed;
    }

    // 实时更新OrbitControls
    controls.tick = () => controls.update();

    // OrbitControls限制缩放
    controls.limitZoom = (min, max) => {
        controls.addEventListener('change', () => {
            const distance = controls.getDistance()
            if (distance < min) {
                controls.minDistance = min
            }
            if (distance > max) {
                controls.maxDistance = max
            }
        })
    }
    return controls
}
export { createControls }