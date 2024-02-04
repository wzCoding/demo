import MessageTemplate from "./index.vue"
import { instances, groupInstances, removeInstance, removeGroupInstance } from "./instance"
import { reactive, render, createVNode } from "vue"
import { isObject } from "@/utils"

let instance = null
let instanceNum = 0
const Message = {}

const createMessage = (options) => {
    const id = `message-${instanceNum}`
    const props = reactive({
        ...options,
        id: id,
        onClose: () => {
            options.group ? removeGroupInstance(options.text) : removeInstance(id)
            if (options.onClose && typeof options.onClose == "function") {
                options.onClose()
            }
        },
        onDestory: () => {
            render(null, container)
        }
    })
    const container = document.createElement("div")
    const messageVnode = createVNode(MessageTemplate, props)
    render(messageVnode, container)

    document.body.appendChild(container.firstElementChild)
    const vm = messageVnode.component
    vm.exposed.show.value = true
    const { top, close, repeatNum } = vm.exposed
    return {
        top,
        id,
        repeatNum,
        close
    }
}
const resolveOptions = (params) => {
    const options = [...params]
    const defaultOptions = {
        text: "",
        duration: 3000,
        group: false,
        showClose: false,
        type: "info"
    }
    if (isObject(options[0])) {
        Object.assign(defaultOptions, options[0])
    } else {
        defaultOptions.text = String(options[0])
    }
    return defaultOptions
}
const sendMessage = (options) => {
    if (options.group) {
        if (!groupInstances[options.text]) {
            instance = createMessage(options)
            groupInstances[options.text] = instance
        } else {
            groupInstances[options.text].repeatNum.value++
        }
    } else {
        instance = createMessage(options)
        instances.push(instance)
        instanceNum++
    }
}
const installMessage = (app) => {
    app.config.globalProperties.$message = sendMessage
}
const closeMessage = () => {
    instance.close()
}
const defineMessage = () => {
    const propertys = [
        "install",
        "info",
        "success",
        "warning",
        "error",
        "close"
    ]
    for (const item of propertys) {
        Object.defineProperty(Message, item, {
            get() {
                if (item == "install") {
                    return installMessage
                } else if (item == "close") {
                    return closeMessage
                } else {
                    return function () {
                        const options = resolveOptions(arguments)
                        options.type = item
                        sendMessage(options)
                    }
                }
            },
            set() { }
        })
    }
}

defineMessage()
export {
    Message
}