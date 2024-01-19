import { Sky } from "three/examples/jsm/objects/Sky.js"

function setSky(options = {
    skyWidth: 10000,
    turbidity: 10,
    rayleigh: 2, // 瑞利散射
    mieCoefficient: 0.005, // 米氏散射
    mieDirectionalG: 0.8, // 米氏散射方向
}) {
    const sky = new Sky()
    sky.scale.setScalar(options.skyWidth)

    const skyUniforms = sky.material.uniforms
    skyUniforms['turbidity'].value = options.turbidity
    skyUniforms['rayleigh'].value = options.rayleigh
    skyUniforms['mieCoefficient'].value = options.mieCoefficient
    skyUniforms['mieDirectionalG'].value = options.mieDirectionalG

    return sky
}

export { setSky }