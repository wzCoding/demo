import { ref } from "vue"


/**
 * 
 * @param {function} func - 需要降低触发频率的函数
 * @param {number} delay - 超时时间设置，单位ms
 * @returns
 */

function throttle(func, delay = 1000) {
    let start = Date.now() //记录触发开始时间
    let timer = null

    return function (...args) {
        let current = Date.now() //记录触发当前时间
        let duration = delay - (current - start) //计算距离下一次触发的剩余时间
        const that = this
        if (timer) {
            clearTimeout(timer)
        }
        if (duration <= 0) {
            func.apply(that, args)
            start = Date.now()
        } else {
            timer = setTimeout(func, duration)
        }
    }
}
/**
 * 
 * @param {function} func - 需要降低触发频率的函数
 * @param {number} delay - 超时时间设置，单位ms
 * @returns 
 */
function debounce(func, delay = 1000) {
    let timer = null
    return function () {
        const that = this
        const args = arguments

        if (timer) {
            clearTimeout(timer) //清除已有的计时器，重新开始计时
        }

        timer = setTimeout(() => {
            func.apply(that, args)
        }, delay)
    }
}

/**
 * 
 * @param {*} el - 需要获取位置的Dom元素
 * @returns {Object} {x,y} 包含该元素x,y坐标的对象
 */
function getElementPosition(el) {
    if (!el) return
    const x = el.getBoundingClientRect().left
    const y = el.getBoundingClientRect().top

    const left = document.documentElement.scrollLeft
    const top = document.documentElement.scrollTop
    return {
        x: x + left,
        y: y + top
    }
}


export {
    throttle,
    debounce,
    getElementPosition,
}