const triggerEvents = {   //触发事件选项
    'click': ['click'],
    'hover': ['mouseenter', 'mouseleave']
}

function setEventListener(options = {
    trigger: 'click',
    element: null,
    handler: null,
    capture: false,
    removeFlag: false
}) {
    const { trigger, element, handler, capture, removeFlag } = options
    const events = triggerEvents[trigger]
    const listener = removeFlag ? 'removeEventListener' : 'addEventListener'
    for (const e of events) {
        element[listener](e, handler, capture)
    }
}

export {
    triggerEvents,
    setEventListener,
}