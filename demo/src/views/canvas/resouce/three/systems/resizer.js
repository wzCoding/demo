import { debounce } from "@/utils/index";
const setSize = (container, camera, renderer) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
}
class Resizer {
    constructor(container, camera, renderer) {
        setSize(container, camera, renderer);
        this.onResize(container, camera, renderer);
    }

    onResize(container, camera, renderer) {
        // 防抖
        window.addEventListener("resize", debounce(() => {
            setSize(container, camera, renderer);
        }, 200))
    }
}
export { Resizer }