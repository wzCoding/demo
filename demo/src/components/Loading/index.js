import LoadingTemplate from "./template"
import { createVNode, createApp, reactive, ref, isRef, unref, nextTick, toRefs } from "vue"
import { isObject } from "../../utils/index"

//全屏loading使用同一个实例
let fullScreenInstance

const INSTANCE_KEY = Symbol("Loading")

//使用LoadingTemplate组件模板创建loading应用
function createLoading(options = {}) {
    const data = reactive({
        show: options.show,
        text: options.text,
        zIndex: options.zIndex,
        customClass: options.customClass,
        background: options.background,
        color: options.color,
        fullScreen: options.fullScreen,
        scrollLock: options.scrollLock
    })

    const close = function () {
        data.show = false
        removeElLoadingChild()
        loadingApp.unmount()
    }

    const removeElLoadingChild = function () {
        vm.$el.parentNode.removeChild(vm.$el)
    }

    const loadingVnode = createVNode(LoadingTemplate, data)
    const loadingApp = createApp(loadingVnode)
    const vm = loadingApp.mount(document.createElement("div"))

    return {
        vm,
        ...toRefs(data),
        close,
        get $el() {
            return vm.$el
        },
    }
}

//获取loading实例并将之添加到页面容器中
function LoadingInstance(options) {
    const resolved = resolveOptions(options)
    if (resolved.fullScreen && fullScreenInstance) {
        return fullScreenInstance
    }
    const instance = createLoading({
        ...resolved,
    })

    resolved.parent.appendChild(instance.$el)
    nextTick(() => (instance.show = resolved.show))

    if (resolved.fullScreen) {
        fullScreenInstance = instance
    }
    return instance
}

//解析loading传入的options选项
function resolveOptions(options) {
    let target = null
    if (typeof options.target == "string") {
        target = document.querySelector(options.target)
    } else {
        target = options.target || document.body
    }
    return {
        parent: target === document.body ? document.body : target,
        text: options.text || "Loading......",
        zIndex: options.zIndex || 999,
        background: options.background || "rgba(0, 0, 0, 0.5)",
        color: options.color || "",
        customClass: options.customClass || "",
        fullScreen: target == document.body && options.fullScreen,
        scrollLock: options.scrollLock !== null ? options.scrollLock : true,
        show: options.show,
        target
    }
}

//注册loading指令
const setDirective = function (el, binding) {

    const getParam = (key) => {
        let result
        if (isObject(binding.value)) {
            result = binding.value[key]
        } else {
            switch (key) {
                case "show":
                    result = binding.value
                    break
                case "fullScreen":
                    result = el == document.body && binding.arg && binding.arg == key ? true : (binding.modifiers[key] ? true : false)
                    break
                case "scrollLock":
                    result = binding.arg && binding.arg == key ? true : (binding.modifiers[key] ? true : false)
                    break
                default:
            }
        }
        return ref(result)
    }
    const options = {
        target: el,
        show: getParam("show"),
        text: getParam("text"),
        zIndex: getParam("zIndex"),
        background: getParam("background"),
        customClass: getParam("customClass"),
        color: getParam("color"),
        fullScreen: getParam("fullScreen"),
        scrollLock: getParam("scrollLock")
    }
    el[INSTANCE_KEY] = {
        options,
        instance: LoadingInstance(options)
    }
}

// 更新配置选项
const updateOptions = (newOptions, oldOptions) => {
    for (const key in oldOptions) {
        if (isRef(oldOptions[key])) {
            oldOptions[key].value = newOptions[key]
        }
    }
}

// vue自定义指令配置
const LoadingDirective = {
    mounted(el, binding) {
        if (binding.value) {
            setDirective(el, binding)
        }
    },
    updated(el, binding) {
        const instance = el[INSTANCE_KEY]
        if (isObject(binding.value)) {
            if (!binding.value.show) instance.instance.close()
            if (binding.value && binding.oldValue) updateOptions(binding.value, instance.options)
        } else {
            if (binding.value !== binding.oldValue) {
                if (binding.value && !binding.oldValue) {
                    setDirective(el, binding)
                } else {
                    instance.instance.close()
                }
            }
        }
    },
    unmount(el) {
        el[INSTANCE_KEY].instance.close()
    }
}

const Loading = {
    install(app) {
        app.directive("loading", LoadingDirective)
        app.config.globalProperties.$loading = LoadingInstance
    },
    service: LoadingInstance,

}
export {
    Loading
}