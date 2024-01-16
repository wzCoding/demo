import { Wave } from "./material/wave";
import { Sun } from "./material/sun";
import { Cloud } from "./material/cloud";
import { Timer } from "@/utils/timer";

let timer = new Timer();
let interval = null;
let cvs = null;
let ctx = null;
let materials = [];

function handleMaterial(params, type) {
    const list = [];
    materials.push(type);

    if (params.length) {
        for (let i = 0; i < params.length; i++) {
            params[i].canvas = cvs;
            const instance = createMaterial(params[i], type);
            list.push(instance);
        }
    } else {
        params.canvas = cvs;
        const instance = createMaterial(params, type);
        list.push(instance);
    }
    return list;
}

function createMaterial(param, type) {
    let material = null;
    switch (type) {
        case "waves":
            material = new Wave(param);
            break;
        case "clouds":
            material = new Cloud(param);
            break;
        case "sun":
            material = new Sun(param);
            break;
        default: return material;
    }
    return material;
}

/**
 * 
 * @param {object} canvas - 画布对象，用来绘制 sea、waves、clouds、sun
 * @returns
 */

class Sea {
    constructor(canvas) {
        cvs = canvas;
        ctx = cvs.context;

        this.sun = null;
        this.waves = null;
        this.clouds = null;
    }

    addWave(waves) {
        this.waves = handleMaterial(waves, "waves");
    }

    addCloud(clouds) {
        this.clouds = handleMaterial(clouds, "clouds");
    }
    addSun(sun) {
        this.sun = handleMaterial(sun, "sun");
    }
    start(speed) {
        if (materials.length) {
            interval = timer.interval(() => {
                cvs.clear()
                materials.forEach(material => {
                    this[material].forEach(m => {
                        m.create();
                    })
                })
            }, speed);
        }
    }
    stop() {
        timer.clear(interval)
        cvs.clear()
        this.destory()
    }
    destory(){
        materials = [];
        cvs = null;
        ctx = null;
        interval = null;
    }
}

export {
    Sea
}