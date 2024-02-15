const triggerEvents = {   //触发事件选项
    'click': ['click'],
    'hover': ['mouseenter', 'mouseleave']
}
const handleMap = new WeakMap()

function clickOutSide(target) {
    if(!target) return
    handleMap.set(target, undefined)
    document.body.removeEventListener('click', handleClick)
    document.body.addEventListener('click', handleClick, { capture: true })
}

function handleClick(e) {
    console.log(handleMap)
    console.log(e.target)
}

export {
    triggerEvents,
    clickOutSide
}