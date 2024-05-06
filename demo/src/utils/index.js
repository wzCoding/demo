
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

function getType(value) {
    const dataType = Object.prototype.toString.call(value).replace('object ', "").match(/\w+/g)[0]
    return dataType.toLocaleLowerCase()
}

function isObject(value) {
    return getType(value) === "object" ? true : getType(value).includes("element")
}

function isArray(value) {
    return getType(value) === "array"
}

function isString(value) {
    return getType(value) === "string"
}

function isNumber(value) {
    return getType(value) === "number"
}

function isEmpty(value) {
    let result = true
    if (!value) return result
    switch (getType(value)) {
        case "object":
            result = Object.keys(value).length === 0 && JSON.stringify(value) === "{}"
            break
        case "array":
            result = value.length === 0
            break
        case "string":
            result = value === "" && value.trim().length === 0
            break
        default: result = true
    }
    return result
}

function addClass(target, className) {
    const node = isString(target) ? document.querySelector(target) : target
    if (node.className) {
        node.className += ` ${className}`
    } else {
        node.className = className
    }
}
function removeClass(target, className) {
    const node = isString(target) ? document.querySelector(target) : target
    if (className && node.className) {
        node.className = node.className.replace(className, "").trim()
    }
}
function isMobile() {
    return ('ontouchstart' in document.documentElement)
}

const cache = new WeakMap()
function deepClone(target) {
    if (target == null || typeof target !== 'object') {
        return target
    }
    // 检查是否存在缓存
    if (cache.has(target)) {
        return cache.get(target)
    }
    let clone = Array.isArray(target) ? [] : {}
    Object.setPrototypeOf(clone, Object.getPrototypeOf(target))
    cache.set(target, clone)
    // 递归复制属性
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            clone[key] = deepClone(target[key])
        }
    }

    return clone
}



function setStorageCache(key, value) {
    if (!key) return
    if (value) {
        localStorage.setItem(key, JSON.stringify(value))
    } else {
        localStorage.removeItem(key)
    }
}

function getStorageCache(key) {
    const value = localStorage.getItem(key)
    if (value) {
        return JSON.parse(value)
    }
    return null
}

function convertCssUnit(value, unit = null) {
    if (!value) return
    value = String(value).trim()
    if (value.includes('%')) return value
    if (!unit) {
        // 如果未提供单位，尝试自动解析
        const match = String(value).match(/(\d+(\.\d+)?)(\w+)?/)
        if (match) {
            const [, num, , str] = match
            const units = ['px', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax']
            const defaultUnit = 'px'
            value = num
            unit = str && units.includes(str) ? str : defaultUnit
        } else {
            return value
        }
    }
    return `${value}${unit}`
}

function findScrollElement(el, dir = "parent", result = []) {
    const nodeDirection = {
        "parent": "parentNode",
        "child": "childNodes"
    }
    if (!el || !nodeDirection[dir]) return

    const node = el[nodeDirection[dir]]
    if (node && dir === "parent") {
        const styles = getComputedStyle(node).getPropertyValue("overflow").split(" ")
        if (styles.includes("auto") || styles.includes("scroll") || styles.includes("overlay")) {
            result.push(node)
        } else {
            findScrollElement(node, dir, result)
        }
    }

    else if (node && node.length && dir === "child") {
        node.forEach(item => {
            result.push(findScrollElement(item, "parent", result))
        })
    }

    return result
}

function getCssValue(el, property) {
    return getComputedStyle(el).getPropertyValue(property)
}
function getElement(el) {
    if (!el) return
    if (!isObject(el)) {
        return document.getElementById(el) || document.getElementsByClassName(el)[0] || document.getElementsByTagName(el)[0] || document.querySelector(el)
    }
    return el
}
function getElementSize(el) {
    const display = getComputedStyle(el).getPropertyValue("display")
    if (display === "none") {
        const styles = [
            { key: "display", value: "block", cache: getCssValue(el, "display") },
            { key: "pointer-events", value: "none", cache: getCssValue(el, "pointer-events") },
            { key: "visibility", value: "hidden", cache: getCssValue(el, "visibility") },
            { key: "z-index", value: -999, cache: getCssValue(el, "z-index") },
        ]

        // 利用visibility、z-index、pointer-events属性模拟display：none效果
        for (const item of styles) {
            el.style[item.key] = item.value
        }

        // 获取元素尺寸信息
        const rect = el.getBoundingClientRect()

        // 将元素样式恢复
        for (const item of styles) {
            el.style[item.key] = item.cache
        }

        return rect
    } else {
        return el.getBoundingClientRect()
    }
}
function getRandom(min = 0, max = 100) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function viewTransition(event = null, callback = null, reverse = false) {
    if (!document.startViewTransition) {
        callback && callback()
        return
    }

    //获取点击事件的页面坐标，从点击位置开始过渡
    const x = event ? event.clientX : document.body.clientWidth / 2
    const y = event ? event.clientY : document.body.clientHeight / 2

    //获取过渡动画的半径
    const endRadius = Math.hypot(
        Math.max(x, document.body.clientWidth - x),
        Math.max(y, document.body.clientHeight - y)
    );
    //剪裁路径
    const path = [`circle(0 at ${x}px ${y}px)`,`circle(${endRadius}px at ${x}px ${y}px)`]
    const transition = document.startViewTransition(() => {
        // 过渡动画执行完毕后的回调函数
        callback && callback()
    })
    transition.ready.then(() => {
        //使用 animate 动画函数执行过渡动画
        document.documentElement.animate(
            {
                clipPath: reverse ? path.reverse() :path,
            },
            {
                duration: 300,
                easing: 'ease-in',
                pseudoElement:reverse ? '::view-transition-old(root)' :'::view-transition-new(root)' ,
            }
        )
    })
}
export {
    throttle,
    debounce,
    isObject,
    isArray,
    isString,
    isNumber,
    isEmpty,
    addClass,
    removeClass,
    isMobile,
    deepClone,
    setStorageCache,
    getStorageCache,
    convertCssUnit,
    findScrollElement,
    getCssValue,
    getElement,
    getElementSize,
    getRandom,
    viewTransition
}