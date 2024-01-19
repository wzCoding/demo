import { debounce } from "@/utils/index";
const setSize = (container, camera, renderer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
}
class Resizer {
    constructor(container, camera, renderer) {

        setSize(container, camera, renderer);
        
        window.addEventListener("resize", debounce(() => {
            setSize(container, camera, renderer);
        }, 200))
    }
}
export { Resizer }