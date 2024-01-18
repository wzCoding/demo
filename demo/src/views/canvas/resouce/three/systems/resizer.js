import { debounce } from "@/utils/index";

class Resizer {
    constructor(container, camera, renderer) {
        this.setSize(container, camera, renderer);
        this.onResize(container, camera, renderer);
    }
    setSize(container, camera, renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio)
    }
    onResize(container, camera, renderer) {
        // 防抖
        window.onresize = debounce(() => {
            this.setSize(container, camera, renderer);
        }, 200)
    }
}
export { Resizer }