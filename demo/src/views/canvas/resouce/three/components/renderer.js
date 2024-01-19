import { WebGLRenderer } from "three"

/**
 * 创建一个Three.js的WebGL渲染器。
 * 
 * @param {Object} options - 可选参数，用于设置渲染器，如设备像素比（dpr）、渲染器尺寸（size）、色调映射（toneMapping）、是否开启物理上正确光照（physicallyCorrectLights）、是否开启抗锯齿（antialias）。
 * @returns {renderer} 返回配置后的渲染器实例。
 */
function createRenderer(options = {
    dpr: window.devicePixelRatio,
    size: { width: window.innerWidth, height: window.innerHeight },
    toneMapping: 1,
    toneMappingExposure: 0,
    physicallyCorrectLights: true,
    antialias: true,
}) {

    const { dpr, size, toneMapping, toneMappingExposure, physicallyCorrectLights, antialias } = options
    //开启抗锯齿
    const renderOptions = { antialias: antialias }
    const renderer = new WebGLRenderer(renderOptions)
    if (physicallyCorrectLights) renderer.physicallyCorrectLights = physicallyCorrectLights

    renderer.setPixelRatio(dpr)
    renderer.setSize(size.width, size.height)
    if(toneMapping) renderer.toneMapping = toneMapping
    if(toneMappingExposure) renderer.toneMappingExposure = toneMappingExposure
    return renderer
}
export { createRenderer }