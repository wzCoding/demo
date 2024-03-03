//根元素html宽度
const rootWidth = document.documentElement.clientWidth
//根元素html高度
const rootHeight = document.documentElement.clientHeight
//纵向方向
const verticals = ['top', 'top-start', 'top-end', 'center', 'bottom', 'bottom-start', 'bottom-end']
//横向方向
const horizontals = ['left', 'left-start', 'left-end', 'center', 'right', 'right-start', 'right-end']

function getDirection(direction, index) {
    const result = direction.split('-')[index]
    return result ? result : ''
}

function getSpace(targetRect, direction, trends) {

    const sameDir = trends.filter(item => getDirection(direction, 0) === item)[0]  //计算当前方向
    const reserveDir = trends.filter(item => getDirection(direction, 0) !== item)[0]  //计算当前方向反向
    const sameSpace = targetRect[sameDir]  //计算target所在位置的空间
    const reserveSpace = targetRect[reserveDir]  //计算target所在位置的反向空间

    return { sameDir, reserveDir, sameSpace, reserveSpace }
}

function getxAxis(target, popup, direction, offsetOptions) {
    const { gap, arrowSize, offset } = offsetOptions
    const result = { x: 0, width: popup.width, arrowX: 0 }
console.log(direction)
    if (verticals.includes(direction)) {  //计算垂直方向（上下）的x坐标
        const blankSpace = offset[0] * 2 //计算空白
        result.width = rootWidth - popup.width >= blankSpace ? popup.width : rootWidth - blankSpace //计算popup宽度

        result.x = target.left + target.width / 2 - result.width / 2
        result.arrowX = result.width / 2 - arrowSize / 2

        if (direction.includes('start')) {
            result.x = target.left
            result.arrowX = target.width / 2 - arrowSize / 2
        }
        else if (direction.includes('end')) {
            result.x = target.left + target.width - result.width
            result.arrowX = result.width - target.width / 2 - arrowSize / 2
        }

        if(result.x < offset[0]){
            result.x = offset[0]
            result.arrowX = target.left - offset[0] + target.width / 2 - arrowSize / 2
        }

        if(result.x + result.width > rootWidth - offset[0]){
            result.x = rootWidth - result.width - offset[0]
            result.arrowX = target.left - result.x + target.width / 2 - arrowSize / 2
        }

    }

    if (horizontals.includes(direction)) { //计算水平方向（左右）的x坐标
        const trend = getDirection(direction, 0)
        const blankSpace = gap + offset[0]  //计算间隔
        const arrowSpace = gap + arrowSize
        result.width = target[trend] - blankSpace >= popup.width ? popup.width : target[trend] - blankSpace //计算popup宽度

        if (direction.includes('left')) {
            result.x = target.left - result.width - arrowSpace
            result.arrowX = result.width - arrowSize / 2
        }
        else if (direction.includes('right')) {
            result.x = target.left + target.width + arrowSpace
            result.arrowX = - arrowSize / 2
        }
    }
    console.log(result)
    return result
}

function getyAxis(target, popup, direction, offsetOptions) {
    const { gap, arrowSize, offset } = offsetOptions
    const result = { y: 0, height: popup.height, arrowY: 0 }
    let top = target.top

    if (target.top < offset[1]) {
        top = offset[1]
    }
    if (target.bottom < offset[1]) {
        top = rootHeight - offset[1] - popup.height
    }

    if (verticals.includes(direction)) {  //计算垂直方向（上下）的y坐标

        if (direction.includes('top')) {
            result.y = top - result.height - gap - arrowSize
            result.arrowY = result.height - arrowSize / 2
        }
        else if (direction.includes('bottom')) {
            result.y = top + target.height + gap + arrowSize
            result.arrowY = - arrowSize / 2
        }
    }

    if (horizontals.includes(direction)) { //计算水平方向（左右）的y坐标

        result.y = target.top + target.height / 2 - result.height / 2
        result.arrowY = target.top - result.y + target.height / 2 - arrowSize / 2

        if (direction.includes('start')) {
            result.y = target.top
            result.arrowY = target.height / 2
        }
        else if (direction.includes('end')) {
            result.y = target.top + target.height - result.height
            result.arrowY = result.height - target.height / 2 - arrowSize / 2
        }

        if (result.y < offset[1]) {
            result.y = offset[1]
            result.arrowY = target.top - offset[1] + arrowSize
        }

        if (result.y + result.height > rootHeight - offset[1]) {
            result.y = rootHeight - offset[1] - result.height
            result.arrowY = target.top - result.y + arrowSize
        }
    }
    console.log(result)
    return result
}

function resolveDirection(target, popup, direction, offsetOptions, state = 0) {
    if (state >= 4) {  //计数不小于4时则说明横向与纵向空间不足
        throw new Error('not enough space!')
    }

    const { gap, arrowSize, offset } = offsetOptions

    const directionOptions = {
        vertical: {
            trends: ['top', 'bottom'],
            backup: 'left' + getDirection(direction, 1),
            popupSpace: popup.height + gap + arrowSize + offset[1]
        },
        horizontal: {
            trends: ['left', 'right'],
            backup: 'top' + getDirection(direction, 1),
            popupSpace: popup.width + gap + arrowSize + offset[0]
        }
    }

    state++  //增加一次计数

    let result = direction

    const dir = verticals.includes(direction) ? 'vertical' : 'horizontal'
    const { trends, backup, popupSpace } = directionOptions[dir]
    const { sameDir, reserveDir, sameSpace, reserveSpace } = getSpace(target, direction, trends)

    console.log('sameDir', sameDir)
    console.log('reserveDir', reserveDir)
    console.log('sameSpace', sameSpace)
    console.log('reserveSpace', reserveSpace)
    console.log('popupSpace', popupSpace)
    console.log(state)

    if (sameSpace < popupSpace) { //如果同向空间不足，则改变方向
        state++  //增加一次计数

        if (reserveSpace > popupSpace) {
            result = direction.replace(sameDir, reserveDir) // 如果反向空间满足，方向替换为反向
        } else {
            state++  //增加一次计数
            result = resolveDirection(target, popup, backup, offsetOptions, state)  // 如果反向空间不满足，则进行横纵方位替换
        }
    }

    return result
}


export {
    rootWidth,
    rootHeight,
    verticals,
    horizontals,
    getxAxis,
    getyAxis,
    resolveDirection,
}