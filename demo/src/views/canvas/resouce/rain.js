import { Timer } from "@/utils/timer";

let timer = new Timer();
let interval = null;
let ctx = null;
let cvs = null;


/**
 * 
 * @param {object} canvas - 画布对象，用来绘制 rain
 * @param {string} text - 形成rain的文字字符串
 * @returns
 */
class Rain {
    constructor(canvas, text, color) {

        cvs = canvas;
        ctx = canvas.context;

        this.fontSize = 16;
        this.fontWeight = 700;
        this.fontFamily = "微软雅黑";
        this.color = color || "#0f0";

        this.text = text && text.length ? text.split("") : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        this.letters = Array(Math.ceil(cvs.width / this.fontSize)).fill(0);
    }
    create() {
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
        ctx.fillStyle = this.color;

        this.letters.forEach((item, index) => {
            ctx.fillText(this.text[Math.floor(Math.random() * this.text.length)], index * this.fontSize, item + this.fontSize);
            this.letters[index] = item >= cvs.height || item > 9999 * Math.random() ? 0 : item + this.fontSize;
        })
    }
    start(speed) {
        interval = timer.interval(this.create.bind(this), speed);
    }
    stop() {
        timer.clear(interval);
        cvs.clear()
    }
    destory(){
        cvs = null;
        ctx = null;
        interval = null;
        timer = null;
    }
}

export {
    Rain
}


