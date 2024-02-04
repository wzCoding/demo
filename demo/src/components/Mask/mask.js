import MaskTemplate from "./index.vue"
import { ref, createVNode, render, reactive } from 'vue'
import { isObject } from "@/utils/index"

//全屏遮罩实例
let fullScreenInstance

function createMask(options) {
    if (!options) return
    const data = reactive({
        zIndex: options.zIndex,
        opacity: options.opacity,
        background: options.background,
        styles: options.styles,
        clickToClose: options.clickToClose,
        fullScreen: options.fullScreen
    })
    const container = document.createElement("div");
    const maskVnode = createVNode(MaskTemplate, data);
    render(maskVnode, container);

    options.target.appendChild(container.firstElementChild);
    const vm = maskVnode.component;

    function close() {
        vm.exposed.display.value = "none"
        destroy()
    }

    function destroy() {
        render(null, container)
    }

    return {
        close,
        destroy
    }
}

function resolveOptions(options) {
    //默认配置
    const defaultOptions = {
        target: document.body,
        zIndex: 1000,
        opacity: 1,
        background: 'rgba(0,0,0,0.5)',
        styles: {},
        clickToClose: false,
        fullScreen: false
    }
    if (isObject(options)) {
        if (options.target) {
            defaultOptions.target = isObject(options.target) ? options.target : document.querySelector(options.target)
        }
        Object.assign(defaultOptions, options)
    }
    return defaultOptions
}

function maskInstance(options) {
    // 创建遮罩层实例
    const resolved = resolveOptions(options)
    if (resolved.fullScreen && fullScreenInstance) {
        return fullScreenInstance
    }

    const instance = createMask(resolved)

    if (resolved.fullScreen) {
        fullScreenInstance = instance
    }

    return instance
}
const Mask = {
    open: maskInstance,
}
export { Mask }