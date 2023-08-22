/**
 * 
 * @param {function} func - 需要降低触发频率的函数
 * @param {number} delay - 超时时间设置，单位ms
 * @returns
 */

function throttle(func, delay = 1000) {
    let start = Date.now() //记录触发开始时间
    let timer = null

    return function () {
        if (timer) {
            clearTimeout(timer)
        }

        let current = Date.now() //记录触发当前时间
        let duration = delay - (current - start) //计算距离下一次触发的剩余时间

        const that = this
        const args = arguments

        if (duration <= 0) {
            func.apply(that, args)
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

/**
 * 
 * @param {*} el - 需要监听的元素
 */
function observeElement(el) {
    if (!el) return
    console.log(el)
    const result = null
    const config = { attributes: true }
    // const callback = function (mutationsList, observer) {
    //     console.log(mutationsList)
    //     for (let mutation of mutationsList) {
    //        console.log(mutation)
    //     }
    // }
    const observer = new MutationObserver(function(mutationsList, observer){
        console.log(mutationsList)
    })
    observer.observe(el, config);
}
export {
    throttle,
    debounce,
    getElementPosition,
    observeElement
}