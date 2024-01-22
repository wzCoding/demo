import { DirectionalLight, AmbientLight, HemisphereLight } from "three"
import { DirectionalLightHelper } from "three/src/helpers/DirectionalLightHelper"
import { HemisphereLightHelper } from "three/src/helpers/HemisphereLightHelper"

const color = "#fff"
const ground = color
const strength = 1
const x = 10
const y = 10
const z = 10
const helperLineWidth = 10
/**
 * 创建三种不同类型的光源：方向光、环境光和半球光。
 * 
 * @param {Object} options - 可选参数，用于设置光源，如光线类型 （types：['main'、'ambi'、'hemi']）、光线颜色（lightColor）、地面颜色（groundColor）、光线强度（intensity）和光线位置（x、y、z）。
 * @returns {Object} 返回创建的光源对象。
 */
function createLights(options = [
    {
        types: "ambi", // 环境光
        color: color,
        strength: strength,
        x: x,
        y: y,
        z: z,
        helper: false
    }
]) {
    const lights = []
    let light
    let helper
    for (const item of options) {
        switch (item.type) {
            case "main":
                // 创建主光源
                light = new DirectionalLight(item.color || color, item.strength || strength)
                if (item.helper) helper = new DirectionalLightHelper(light, helperLineWidth)
                break
            case "ambi":
                // 创建环境光
                light = new AmbientLight(item.color || color, item.strength || strength)
                break
            case "hemi":
                // 创建半球光
                light = new HemisphereLight(item.color || color, item.ground || ground, item.strength || strength)
                if (item.helper) helper = new HemisphereLightHelper(light, helperLineWidth)
                break
        }
        light.position.set(item.x || x, item.y || y, item.z || z)

        if (light) {
            lights.push(light)
            if (helper) lights.push(helper)
        }
    }
    return lights
}

export { createLights }