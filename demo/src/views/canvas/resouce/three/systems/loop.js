import { Clock } from "three";
const clock = new Clock();

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updateList = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick();
            this.renderer.render(this.scene, this.camera);
        })
    }
    stop() {
        this.renderer.setAnimationLoop(null)
    }
    tick() {
        const delta = clock.getDelta();
        for (const update of this.updateList) {
            update.tick(delta)
        }
    }
}

export { Loop }