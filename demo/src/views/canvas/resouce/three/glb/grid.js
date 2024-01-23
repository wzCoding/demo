import { GridHelper } from 'three'

const size = 20 // 地面大小
const div = 40 // 地面分割数
const color = "#ffffff" // 地面分割线颜色
const moveDir = 1 //地面更新方向，1表示向前，-1表示向后
function setGrid(options = {
    size: 20,
    div: 40,
    color: "#ffffff",
    needTick: false,
    moveDir: 1
}) {
    //设置地面
    const grid = new GridHelper(
        options.size || size,
        options.div || div,
        options.color || color,
        options.color || color
    )
    grid.material.opacity = 0.2
    grid.material.depthWrite = false
    grid.material.transparent = true
    if (options.needTick) {
        const move = options.moveDir || moveDir
        grid.tick = () => {
            const time = - performance.now() / 1000 * move
            grid.position.z = - (time) % 1 * (move > 0 ? 0 - move : move)
        }
    }

    return grid
}

export { setGrid }