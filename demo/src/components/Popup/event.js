const triggerEvents = {   //触发事件选项
    'click': ['click'],
    'hover': ['mouseenter', 'mouseleave']
}

const clickMap = new WeakMap()

function handleClick(e) {
    console.log(e)
}

function isOutSide(el, target) {
    return !el.contains(target) || el === target
}

function clickListener(){

}

function clickOutSide(target) {
    if (!target) return
    document.body.removeEventListener('click', handleClick)
    document.body.addEventListener('click', handleClick, true)
    clickMap.set(target, undefined)   
}



export {
    triggerEvents,
    clickOutSide
}