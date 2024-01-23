import { GridHelper } from 'three'

function setWheels(carModel = {}) {
    if (!carModel) return
    // 设置车轮
    const wheels = []

    // 设置车轮行进方向
    let moveDir

    carModel.traverse(object => {
        if (object.isObject3D) {
            //console.log(object)
            const name = object.name.toLowerCase()
            if (name.match(/wheel_/ig) && object.name.length === 8) {
                if (name.includes('rl')) moveDir = -1
                if (name.includes('lr')) moveDir = 1
                
                object.tick = () => {
                    const time = performance.now() / 1000 * moveDir
                    object.rotation.x = time * Math.PI * 2
                }
                wheels.push(object)
            }
        }
    })

    //设置地面
    const grid = new GridHelper(40, 80, "#ffffff", "#ffffff");
    grid.material.opacity = 0.2;
    grid.material.depthWrite = false;
    grid.material.transparent = true;
    grid.tick = () => {
        const time = - performance.now() / 1000 * moveDir
        grid.position.z = - (time) % 1 * (moveDir > 0 ? 0 - moveDir : moveDir)
    }
    return { wheels, grid }
}

export { setWheels }