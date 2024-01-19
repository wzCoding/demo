
import { PMREMGenerator, Vector3, MathUtils } from "three"

let renderTarget

function setSun(options = {
    elevation: 2, //海拔
    azimuth: 180,  //方位角
    scene: {},
    renderer: {}
}) {
    const sun = new Vector3()
    const pmremGenerator = new PMREMGenerator(options.renderer)
    const phi = MathUtils.degToRad(90 - options.elevation)
    const theta = MathUtils.degToRad(options.azimuth)
    sun.setFromSphericalCoords(1, phi, theta)

    const [Water, Sky] = options.scene.children
    if (Water) Water.material.uniforms['sunDirection'].value.copy(sun).normalize()
    if (Sky) {
        Sky.material.uniforms['sunPosition'].value.copy(sun)
        renderTarget = pmremGenerator.fromScene(Sky)
        options.scene.add(Sky)
    }

    // 更新环境贴图
    if (renderTarget !== undefined) renderTarget.dispose()
    options.scene.environment = renderTarget.texture

    return sun
}

export { setSun }