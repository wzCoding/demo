import { GridHelper } from 'three'

function setWheels(carModel = {}, wheelNames = ['wheel_fl', 'wheel_fr', 'wheel_rl', 'wheel_rr']) {
    if (!carModel) return

    // 设置车轮
    const wheels = []

    for (const name of wheelNames) {

        const eachWheel = carModel.getObjectByName(name)

        eachWheel.tick = () => {
            const time = - performance.now() / 1000
            eachWheel.rotation.x = time * Math.PI * 2
        }

        wheels.push(eachWheel)
    }
    
    //设置地面
    const grid = new GridHelper(20, 40, "#ffffff", "#ffffff");
    grid.material.opacity = 0.2;
    grid.material.depthWrite = false;
    grid.material.transparent = true;
    grid.tick = () => {
        const time = - performance.now() / 1000
        grid.position.z = - ( time ) % 1;
    }

    return { wheels, grid }
}

export { setWheels }