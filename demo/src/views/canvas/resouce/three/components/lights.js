import { DirectionalLight, AmbientLight, HemisphereLight } from "three"


/**
 * 创建三种不同类型的光源：方向光、环境光和半球光。
 * 
 * @param {Object} options - 可选参数，用于设置光源，如光线类型 （types：['main'、'ambi'、'hemi']）、光线颜色（lightColor）、地面颜色（groundColor）、光线强度（intensity）和光线位置（x、y、z）。
 * @returns {Object} 返回创建的光源对象。
 */
function createLights(options = {
    types: ["main", "ambi", "hemi"], // 方向光、环境光、半球光
    lightColor: "#fff",
    groundColor: "#2f4f4f",
    lightStrength: 8,
    x: 10,
    y: 10,
    z: 10
}) {
    const { types, lightColor, groundColor, lightStrength, x, y, z } = options
    const lights = []
    let light
    for (const type of types) {
        switch (type) {
            case "main":
                // 创建主光源
                light = new DirectionalLight(lightColor, lightStrength)
                light.position.set(x, y, z)
                break
            case "ambi":
                // 创建环境光
                light = new AmbientLight(lightColor, lightStrength)
                light.position.set(x, y, z)
                break
            case "hemi":
                // 创建半球光
                light = new HemisphereLight(lightColor, groundColor, lightStrength)
                light.position.set(x, y, z)
                break
        }
        lights.push(light)
    }
    return lights
}

export { createLights }