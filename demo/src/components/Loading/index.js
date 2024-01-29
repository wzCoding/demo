import LoadingTemplate from "./index.vue";
import { createApp, h, reactive, ref, toRefs, isRef, nextTick } from "vue";
import { isObject, addClass, removeClass } from "../../utils/index";
let fullScreenInstance;  //全屏loading使用同一个实例

//使用LoadingTemplate组件模板创建loading应用
function createLoading(options = {}) {
    const data = reactive({
        show: options.show,
        text: options.text,
        zIndex: options.zIndex,
        customClass: options.customClass,
        background: options.background,
        color: options.color
    });
    
    const close = function () {
        data.show = false;
        removeElLoadingChild();
        loadingApp.unmount();
    }
    const removeElLoadingChild = function () {
        vm.$el.parentNode.removeChild(vm.$el);
    }

    const loadingVnode = h(LoadingTemplate, data);
    const loadingApp = createApp(loadingVnode);
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
    const resolved = resolveOptions(options);
    if (resolved.fullScreen && fullScreenInstance) {
        return fullScreenInstance;
    }
    
    const instance = createLoading({
        ...resolved,
    });
    setParentStyle(resolved);
    resolved.parent.appendChild(instance.$el);
    nextTick(() => (instance.show = resolved.show))
    if (resolved.fullScreen) {
        fullScreenInstance = instance
    }
    return instance;
}
//解析loading传入的options选项
function resolveOptions(options) {
    let target = null;
    if (typeof options.target == "string") {
        target = document.querySelector(options.target);
    } else {
        target = options.target || document.body;
    }
    return {
        parent: target === document.body ? document.body : target,
        text: options.text || "Loading......",
        zIndex: options.zIndex || 999,
        background: options.background || "rgba(0, 0, 0, 0.5)",
        color: options.color || "",
        customClass: options.customClass || "",
        fullScreen: target == document.body && options.fullScreen,
        scrollLock: options.scrollLock,
        show: options.show,
        target
    }
}
//在这里设置loading容器的一些样式
function setParentStyle(options) {
    const { position } = getComputedStyle(options.parent, "position");
    if (options.fullScreen && options.scrollLock) {
        addClass(options.parent, "loading-hidden");
    } else {
        removeClass(options.parent, "loading-hidden");
    }
    if (!["absolute", "fixed", "sticky"].includes(position)) {
        addClass(options.parent, "loading-position");
    } else {
        removeClass(options.parent, "loading-position");
    }
}

//注册loading指令
const INSTANCE_KEY = Symbol("Loading");
const createInstance = function (el, binding) {
    //console.log(binding)
    const getParam = (key) => {
        let result;
        if (isObject(binding.value)) {
            result = binding.value[key];
        } else {
            switch (key) {
                case "show":
                    result = binding.value;
                    break;
                case "fullScreen":
                case "scrollLock":
                    result = binding.arg && binding.arg == key ? true : (binding.modifiers[key] ? true : false);
                    break;
                default:
            }
        }
        return ref(result);
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
const updateOptions = (newOptions, oldOptions) => {
    for (const key in oldOptions) {
        if (isRef(oldOptions[key])) {
            oldOptions[key].value = newOptions[key];
        }
    }
}
const LoadingDirective = {
    mounted(el, binding) {
        if (binding.value) {
            createInstance(el, binding);
        }
    },
    updated(el, binding) {
        const instance = el[INSTANCE_KEY];
        if (isObject(binding.value)) {
            if (!binding.value.show) instance.instance.close();
            if (binding.value && binding.oldValue) updateOptions(binding.value, instance.options)
        } else {
            if (binding.value !== binding.oldValue) {
                if (binding.value && !binding.oldValue) {
                    createInstance(el, binding)
                } else {
                    instance.instance.close();
                }
            }
        }
    },
    unmount(el) {
        el[INSTANCE_KEY].instance.close();
    }
}

const Loading = {
    install(app) {
        app.directive("loading", LoadingDirective);
        app.config.globalProperties.$loading = LoadingInstance
    },
    service: LoadingInstance
}
export {
    Loading
}