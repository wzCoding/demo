/**
 * 
 * @param {Array<HTMLElement>} elements - 需要监听的元素数组，第一个元素是要监听的目标对象，剩下的是排除在外的元素
 * @param {Function} callback - 点击到elements中包含的元素以外的元素时触发的回调函数
 * @returns 
 */

function clickOutSide(elements, callback) {
    const handleClick = (event) => {
        const { x, y, width, height } = elements[0].getBoundingClientRect()
        const keepElements = elements.slice(1).filter(Boolean)
        const endX = x + width
        const endY = y + height
        if (keepElements.length && keepElements.some(item => item.contains(event.target))) return
        else if ((event.clientX > endX || event.clientX < x || event.clientY > endY || event.clientY < y)) {
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