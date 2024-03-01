import { getElement, getElementSize } from "@/utils/index"
import { popupOption } from "./option"

const targetGap = 5 //目标元素与popup间距
const arrowSize = 10  //箭头尺寸

const rootWidth = document.documentElement.clientWidth
const rootheight = document.documentElement.clientHeight

const verticals = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end']
const horizontals = ['left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']

function resolveRect(el) {
    el = getElement(el)
    const { left, top, right, bottom, width, height } = getElementSize(el)
    return {
        left,
        right: rootWidth - right,
        top,
        bottom: rootheight - bottom,
        width,
        height
    }
}

function resolvePopup(popup, maxWidth, offSetX) {
    const popupRect = resolveRect(popup)
    const autoWidth = rootWidth - popupRect.width > offSetX * 2 ? popupRect.width : rootWidth - offSetX * 2
    popupRect.width = maxWidth && maxWidth !== 'auto' ? Number(maxWidth) : autoWidth

    return popupRect
}

function arrowRotate(direction) {

    let rotate = 0
    // 方向

    if (verticals.includes(direction)) {
        rotate = direction === 'top' ? -45 : 135
    }

    if (horizontals.includes(direction)) {
        rotate = direction === 'left' ? 225 : 45
    }

    return rotate
}

function getDirection(direction, index) {
    const result = direction.split('-')[index]
    return result ? result : ''
}

function getSpace(targetRect, popupRectProp, direction, trends, offset) {

    const sameDir = trends.filter(item => getDirection(direction, 0) === item)[0]  //计算当前方向
    const reserveDir = trends.filter(item => getDirection(direction, 0) !== item)[0]  //计算当前方向反向
    const sameSpace = targetRect[sameDir]  //计算target所在位置的空间
    const reserveSpace = targetRect[reserveDir]  //计算target所在位置的反向空间
    const popupSpace = popupRectProp + targetGap + arrowSize + offset  //计算popup占用的空间
    console.log(popupRectProp,offset)

    return { sameDir, reserveDir, sameSpace, reserveSpace, popupSpace }
}

function computeDirection(target, popup, direction, offsets, state = 0) {

    if (state >= 4) {  //计数不小于4时则说明横向与纵向空间不足

        throw new Error('not enough space!')

    }

    const directionOptions = {
        vertical: {
            trends: ['top', 'bottom'],
            popupRectProp: popup.height,
            backup: 'left' + getDirection(direction, 1),
            offset: offsets[1]
        },
        horizontal: {
            trends: ['left', 'right'],
            popupRectProp: popup.width,
            backup: 'top' + getDirection(direction, 1),
            offset: offsets[0]
        }
    }
    state++  //增加一次计数

    let result = direction

    const dir = verticals.includes(direction) ? 'vertical' : 'horizontal'
    const { trends, popupRectProp, backup, offset } = directionOptions[dir]
    const { sameDir, reserveDir, sameSpace, reserveSpace, popupSpace } = getSpace(target, popupRectProp, direction, trends, offset)
    console.log('sameDir',sameDir)
    console.log('reserveDir',reserveDir)
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

            result = computeDirection(target, popup, backup, offsets, state)  // 如果反向空间不满足，则进行横纵方向替换

        }

    }

    return result
}

function getxAxis(target, popup, direction, offsetX) {

    let result = { x: 0, width: popup.width, arrowX: 0 }

    const { left, right } = target
    const trend = getDirection(direction,0)

    console.log('dir ==>',direction)

    if (verticals.includes(direction)) {  //计算垂直方向（上下）的x坐标

        const blankSpace = offsetX * 2 //计算空白
        const halfTargetWidth = target.width / 2
        const trendSpace = trend + halfTargetWidth //计算target所在侧的空间
        const leftSpace = left + halfTargetWidth
        result.width = rootWidth - popup.width > blankSpace ? popup.width : rootWidth - blankSpace //计算popup宽度

        const halfPopupWidth = result.width / 2
        const offsetSpace = trendSpace - halfPopupWidth > offsetX ? 0 : offsetX  //计算间隔
        result.x = trendSpace - halfPopupWidth > offsetX ? leftSpace - halfPopupWidth - offsetSpace : offsetSpace
        result.arrowX = leftSpace - result.x - targetGap


        // if (direction.includes('start')) {

        // }

        // if (direction.includes('end')) {

        // }


    }

    if (horizontals.includes(direction)) { //计算水平方向（左右）的x坐标

        const blankSpace = targetGap + offsetX //计算间隔
        result.width = target[trend] - blankSpace >= popup.width ? popup.width : target[trend] - blankSpace //计算popup宽度

        const arrowSpace = targetGap +arrowSize 
        const trendSpace = direction.includes('left') ? -(result.width + arrowSpace) : (target.width + arrowSpace) //计算target所在侧的空间

        result.x = left + trendSpace
        result.arrowX = (direction.includes('left') ? result.width : 0) - targetGap

        if(direction.includes('start')){
            
        }
    }
    
    return result

}

function getyAxis(target, popup, direction, offsetY) {

    let result = { y: 0, height: popup.height, arrowY: 0 }

    const { top, bottom } = target
    const trend = top > bottom ? bottom : top
    
    if (verticals.includes(direction)) {  //计算垂直方向（上下）的y坐标
        const arrowSpace = targetGap + arrowSize //计算间隔
        const trendSpace = direction.includes('top') ? -(result.height + arrowSpace) : (target.height + arrowSpace) //计算target所在侧的空间

        result.y = top + trendSpace
        result.arrowY = (direction.includes('top') ? result.height : 0) - targetGap
    }

    if (horizontals.includes(direction)) { //计算水平方向（左右）的y坐标
        const halfTargetHeight = target.height / 2
        const halfPopupHeight = popup.height / 2

        result.y = top + halfTargetHeight - halfPopupHeight
        result.arrowY = result.height / 2 - targetGap
    }

    return result
}

class Popup {
    constructor(target, popup, options = popupOption) {
        if (!target || !popup) {
            return
        }

        this.popup = getElement(popup)
        this.target = getElement(target)
        this.options = options

        if (this.options.useCache) {
            this.state = 0
            this.styles = {}
        }

        this.computeStyles().then(styles => {
            this.applyStyles(styles)
        })

    }

    async computeStyles() {

        await Promise.resolve()

        if (this.options.useCache) {

            console.log('useCache')

            if (this.state >= 2) return this.styles

            this.state++

        }

        const { maxWidth, needArrow, offset } = this.options

        const [offsetX, offsetY] = offset ? offset : popupOption.offset

        const targetRect = resolveRect(this.target)

        const popupRect = resolvePopup(this.popup, maxWidth, offsetX)

        const direction = computeDirection(targetRect, popupRect, this.options.direction, [offsetX, offsetY])
        console.log(direction)
        const { x, width, arrowX } = getxAxis(targetRect, popupRect, direction, offsetX)

        const { y, arrowY } = getyAxis(targetRect, popupRect, direction, offsetY)

        const styles = {
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'transform': `translate(${x}px, ${y}px)`,
            'max-width': `${width}px`
        }

        // 设置箭头样式
        if (needArrow) {
            styles['--arrow-size'] = `${arrowSize}px`
            styles['--arrow-left'] = `${arrowX}px`
            styles['--arrow-top'] = `${arrowY}px`
            styles['--arrow-rotate'] = `${arrowRotate(direction)}deg`
        }

        return styles
    }

    applyStyles(styles) {
        if (this.options.useCache) this.styles = styles
        for (let key in styles) {
            this.popup.style.setProperty(key, styles[key])
        }
    }

    updateStyles(customStyle) {
        this.computeStyles().then(styles => {
            const newStyles = Object.assign({}, styles, customStyle)
            this.applyStyles(newStyles)
        })

        return this.styles
    }

}


export {
    verticals,
    horizontals,
    Popup
}