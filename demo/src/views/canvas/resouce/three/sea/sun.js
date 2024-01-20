
import { PMREMGenerator, Vector3, MathUtils } from "three"

let renderTarget

function setSun(options = {
    elevation: 2, //海拔
    azimuth: 180,  //方位角
}) {
    const sun = new Vector3()
    const phi = MathUtils.degToRad(90 - options.elevation)
    const theta = MathUtils.degToRad(options.azimuth)
    sun.setFromSphericalCoords(1, phi, theta)

    return sun
}

export { setSun }