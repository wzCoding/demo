import MaskTemplate from "./template"
import { createVNode, render, reactive, Transition } from 'vue'
import { isObject } from "@/utils/index"

//全屏遮罩实例
let fullScreenInstance

function createMask(options) {
    if (!options) return
    const props = reactive({
        show: options.show,
        zIndex: options.zIndex,
        opacity: options.opacity,
        background: options.background,
        styles: options.styles,
        clickToClose: options.clickToClose,
        fullScreen: options.fullScreen,
        scrollLock: options.scrollLock,
        destoryOnClose: options.destoryOnClose,
        onClose: () => {
            if (options.onClose && typeof options.onClose === 'function') {
                options.onClose()
            }
        },
        onDestory: () => {
            destory()
        }
    })
    const container = document.createElement("div")

    //创建mask虚拟dom
    const maskVnode = createVNode(
        MaskTemplate,
        props,
        {
            default: () => {
                if (options.children && options.children.length > 0) {
                    const childNodes = []
                    options.children.forEach(child => {
                        childNodes.push(createVNode(child))
                    })
                    return childNodes
                }
            }
        }
    )

    //创建mask应用组件
    const appVnode = createVNode(
        Transition,
        {
            name: "fade",
        },
        {
            default: () => maskVnode
        }
    )

    //渲染组件
    render(appVnode, container)

    options.target.appendChild(container.firstElementChild)

    const vm = maskVnode.component

    function open() {
        vm.exposed.showMask.value = true
    }

    function close() {
        vm.exposed.showMask.value = false
    }

    function destory() {
        options.parent.mask = null
        options.parent.classList.remove("mask-position", "mask-scrollLock")
        render(null, container)
    }

    return {
        vm,
        open,
        close,
        destory
    }
}

function resolveOptions(options) {
    //默认配置
    const defaultOptions = reactive({
        target: document.body,
        show: true,
        zIndex: 1000,
        opacity: 1,
        background: 'rgba(0,0,0,0.5)',
        styles: {},
        clickToClose: false,
        fullScreen: false,
        scrollLock: false,
        destroyOnClose: true,
        onClose: () => { },
        //此参数用来创建子节点
        children: []
    })
    if (isObject(options)) {
        Object.assign(defaultOptions, options)
        if (options.target) {
            defaultOptions.target = isObject(options.target) ? options.target : document.querySelector(options.target)
            defaultOptions.parent = defaultOptions.target == document.body ? document.body : defaultOptions.target
            defaultOptions.fullScreen = defaultOptions.target == document.body
        }
    }

    return defaultOptions
}

// 设置容器的一些样式
function setParentStyle(options) {
    if (!options.parent) return
    const { position } = getComputedStyle(options.parent, "position")
    if (options.scrollLock.value) {
        options.parent.classList.add("mask-scrollLock")
    } else {
        options.parent.classList.remove("mask-scrollLock")
    }
    if (!["absolute", "fixed", "sticky"].includes(position)) {
        options.parent.classList.add("mask-position")
    } else {
        options.parent.classList.remove("mask-position")
    }
}

function maskInstance(options) {

    const resolved = resolveOptions(options)
    //判断是否存在全屏遮罩层
    if (resolved.fullScreen && fullScreenInstance) {
        return fullScreenInstance
    }

    // 判断是否已经存在遮罩层，此处避免频繁操作dom
    if (resolved.parent && resolved.parent.mask) {
        const { mask } = resolved.parent
        mask.open()
        return mask
    }

    const instance = createMask(resolved)

    setParentStyle(resolved)

    if (resolved.fullScreen) {
        fullScreenInstance = instance
    }
    resolved.parent.mask = instance

    return instance
}
const Mask = {
    open: maskInstance,
}
export { Mask }