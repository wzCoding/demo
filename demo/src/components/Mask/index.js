import MaskTemplate from "./index.vue"
import { ref, createVNode, render } from 'vue'
import { isObject } from "@/utils/index"

let fullScreenInstance

function createMask(options) {
    if (!options) return
    const container = document.createElement("div");
    const vnode = createVNode(MaskTemplate, options);
    render(vnode, container);

    document.body.appendChild(container.firstElementChild);
    const vm = vnode.component;
    console.log(vm)
}
function resolveOptions(options) {
    if (!options) return
    if(isObject(options)){
        
    }
    return {
        // 解析配置项
    }
}
function maskInstance(options) {
    // 创建遮罩层实例
}