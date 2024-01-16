import { debounce, isObject } from '@/utils/index'

let container = null;
/**
 * @param {string} canvas.id - 将要创建的canvas的id
 * @param {string} canvas.parent - 放置canvas的容器（父元素）的id或class
 * @param {object} canvas.styles - 设置canvas的样式
 * @param {number} canvas.width - 将要创建的canvas的宽度
 * @param {number} canvas.height - 将要创建的canvas的高度
 * @returns {object} 包含canvas信息的对象
 */
class myCanvas {
    constructor({
        id,
        parent,
        style,
        width,
        height,
    }) {

        const options = this.resolve(arguments[0])

        container = options.parent;
        container.style.overflowX = "hidden";

        this.id = options.id;
        this.width = options.width;
        this.height = options.height;
        this.canvas = document.getElementById(options.id);
        if (!this.canvas) {
            this.canvas = this.create();
            this.append();
        }
        for (let key in options.styles) {
            this.canvas.style[key] = options.styles[key]
        }
        this.context = this.canvas.getContext('2d');

        this.init();
        this.resize();
    }
    resolve(params) {
        const options = {
            id: params.id ? params.id : 'my-canvas',
            parent: document.body,
            width: params.width ? params.width : document.documentElement.clientWidth,
            height: params.height ? params.height : document.documentElement.clientHeight,
            styles: params.styles ? params.styles : {},
        }
        if (params.parent) {
            options.parent = isObject(params.parent) ? params.parent : (document.getElementById(params.parent) || document.getElementsByClassName(params.parent))
        }
        return options
    }
    create() {
        const canvas = document.createElement("canvas");
        canvas.id = this.id;
        return canvas;
    }
    init() {
        const ratio = window.devicePixelRatio || 1;
        this.canvas.width = this.width * ratio;
        this.canvas.height = this.height * ratio;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.context.scale(ratio, ratio);
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
    append() {
        if (!container.querySelector(`#${this.id}`)) {
            container.append(this.canvas);
        }
    }
    remove() {
        container.remove(this.canvas);
    }
    hide() {
        this.canvas.style.display = "none"
    }
    show() {
        this.canvas.style.display = "block"
    }
    resize() {
        window.addEventListener('resize', debounce(() => {
            this.width = document.documentElement.clientWidth;
            this.height = document.documentElement.clientHeight;
            this.init();
        }, 100));
    }
    gradient({ startX, startY, endX, endY, gradients }) {
        const gradient = this.context.createLinearGradient(startX, startY, endX, endY);
        gradients.forEach(item => {
            gradient.addColorStop(item.value, item.color);
        });
        return gradient;
    }
}

export {
    myCanvas
}