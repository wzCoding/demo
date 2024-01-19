
function setWheels(carModel = {}, wheelNames = ['wheel_fl', 'wheel_fr', 'wheel_rl', 'wheel_rr']) {
    if(!carModel) return
    // 设置车轮
    const wheels = []

    for (const name of wheelNames) {
        const eachWheel = carModel.getObjectByName(name)

        eachWheel.tick = () => {
            const time = - performance.now() / 1000
            eachWheel.rotation.x = time * Math.PI * 2
        }

        wheels.push(carModel.getObjectByName(eachWheel))
    }

    return wheels
}

export { setWheels }