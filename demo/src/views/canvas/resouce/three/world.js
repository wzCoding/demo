import { createCamera } from "./components/camera"
import { createScene } from "./components/scene"
import { createRenderer } from "./components/renderer"

import { Resizer } from "./systems/resizer"
import { Loop } from "./systems/loop"
import { createControls } from "./systems/control"
import { loadBirds } from "./birds/birds";
let camera, scene, renderer
let loop, control

class World {
    constructor(options = {
        el: document.body,
        cameraOption: {}, // 相机配置项
        sceneOption: {}, // 场景配置项
        rendererOption: {}, // 渲染器配置项
        animationList: [], // 动画列表
    }) {

        const { el, animationList } = options
        const resolveOptions = this.resolve(options)

        //threejs场景基本配置
        camera = createCamera(resolveOptions.camera)
        scene = createScene(resolveOptions.scene)
        renderer = createRenderer(resolveOptions.renderer)

        //将渲染创建添加到页面
        el.append(renderer.domElement)

        control = createControls({ camera, canvas: renderer.domElement })

        //创建动画循环对象
        loop = new Loop(camera, scene, renderer)
        loop.updateList.push(control)
        if (animationList && animationList.length > 0) {
            loop.updateList.push(...animationList)
        }

        //设置尺寸变化监听
        new Resizer(renderer.domElement, camera, renderer)


    }
    resolve(params) {
        const { cameraOption, sceneOption, rendererOption } = params
        let camera = {
            fov: 35,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 100,
            x: 0,
            y: 0,
            z: 10
        }
        let scene = {
            background: 0xa0a0a0,
            needLights: true,
            sceneObjects: []
        }
        let renderer = {
            dpr: Math.min(window.devicePixelRatio, 2),
            size: { width: window.innerWidth, height: window.innerHeight },
            physicallyCorrectLights: true,
            antialias: true
        }
        // 处理参数
        camera = Object.assign(camera, cameraOption)
        scene = Object.assign(scene, sceneOption)
        renderer = Object.assign(renderer, rendererOption)

        return {
            camera,
            scene,
            renderer
        }
    }
    render() {
        renderer.render(scene, camera)
    }
    start(callback) {
        callback && callback()
        loop.start()
    }
    stop(callback) {
        callback && callback()
        loop.stop()
    }
    getComponents() {
        return { renderer, scene, camera, control, loop }
    }
}

export { World }