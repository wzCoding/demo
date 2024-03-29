
function clickOutSide(element, callback) {
    const handleClick = (event) => {
        const { x, y, width, height } = element.getBoundingClientRect()
        const endX = x + width
        const endY = y + height
        if (event.clientX > endX || event.clientX < x || event.clientY > endY || event.clientY < y) {
            callback && callback()
        }
    }
    document.addEventListener('click', handleClick)
    return () => {
        document.removeEventListener('click', handleClick)
    }
    // 返回一个清除监听器的函数
}

export default clickOutSide