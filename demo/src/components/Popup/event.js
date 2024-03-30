const triggerEvents = ['hover', 'click']   //触发事件选项

function handleEvent(options = {
    trigger: 'click', target: null, handler: null, popup: null, capture: false, remove: false
}) {
    const { trigger, target, handler, popup, capture = false, remove } = options
    const action = remove ? 'removeEventListener' : 'addEventListener'
    if (trigger === 'hover') {
        let delay = 300
        let timer = null
        const handleLeave = (e) => {
            if (!popup.visible) return
            timer = setTimeout(() => {
                handler && handler(e)
                clearTimeout(timer)
                timer = null
            }, delay)
        }
        const handleEnter = (e) => {
            if (timer) {
                clearTimeout(timer)
                timer = null
            } else {
                handler && handler(e)
            }
        }
        target[action]('mouseenter', handleEnter, capture)
        target[action]('mouseleave', handleLeave, capture)
        popup[action]('mouseenter', handleEnter, capture)
        popup[action]('mouseleave', handleLeave, capture)
    } else {
        target[action](trigger, handler, capture)
    }
}

export {
    triggerEvents,
    handleEvent,
}