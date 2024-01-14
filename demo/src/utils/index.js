import service from '@/axios'
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
    const dataType = Object.prototype.toString.call(value).replace('object ', "").match(/\w+/g)[0];
    return dataType.toLocaleLowerCase();
}

function isObject(value) {
    return getType(value) === "object" ? true : getType(value).includes("element");
}

function isArray(value) {
    return getType(value) === "array";
}

function isString(value) {
    return getType(value) === "string";
}

function isNumber(value) {
    return getType(value) === "number";
}

function isEmpty(value) {
    let result = true;
    if (!value) return result;
    switch (getType(value)) {
        case "object":
            result = Object.keys(value).length === 0;
            break;
        case "array":
            result = value.length === 0;
            break;
        case "string":
            result = value === "" && value.trim().length === 0;
            break;
        default: return result;
    }
}

function addClass(target, className) {
    const node = isString(target) ? document.querySelector(target) : target;
    if (node.className) {
        node.className += ` ${className}`;
    } else {
        node.className = className;
    }
}
function removeClass(target, className) {
    const node = isString(target) ? document.querySelector(target) : target;
    if (className && node.className) {
        node.className = node.className.replace(className, "").trim();
    }
}
function isMobile() {
    return ('ontouchstart' in document.documentElement);
}

const cache = new WeakMap();
function deepClone(target) {
    if (target == null || typeof target !== 'object') {
        return target;
    }
    // 检查是否存在缓存
    if (cache.has(target)) {
        return cache.get(target);
    }
    let clone = Array.isArray(target) ? [] : {};
    Object.setPrototypeOf(clone, Object.getPrototypeOf(target));
    cache.set(target, clone);
    // 递归复制属性
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            clone[key] = deepClone(target[key]);
        }
    }

    return clone;
}

async function getData(id, type) {
    if (!id || !type) return []
    const param = { id, type }
    const result = await service.post('mock/data', param)
    return result && result.data ? deepClone(result.data) : []
}

function setStorageCache(key, value) {
    if (!key) return
    if (value) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.removeItem(key);
    }
}

function getStorageCache(key) {
    const value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    }
    return null;
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
    getData,
    setStorageCache,
    getStorageCache
}