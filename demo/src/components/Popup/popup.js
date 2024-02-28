import { getElement, getElementSize } from "@/utils/index"
import { nextTick } from "vue"

const edgeGap = 20 //边缘间距
const targetGap = 5 //目标元素与popup间距
const arrowSize = 10  //箭头尺寸
const arrowLength = Math.sqrt(Math.pow(arrowSize, 2) * 2) / 2 //箭头长度

const rootWidth = document.documentElement.clientWidth
const rootheight = document.documentElement.clientHeight

const verticals = ['top', 'bottom']
const horizontals = ['left', 'right']

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

function resolvePopup(popup, maxWidth) {
    const popupRect = resolveRect(popup)
    const autoWidth = rootWidth - popupRect.width > edgeGap * 2 ? popupRect.width : rootWidth - edgeGap * 2
    popupRect.width = maxWidth && maxWidth !== 'auto' ? Number(maxWidth) : autoWidth

    return popupRect
}

function arrowRotate(direction) {

    let rotate = 0

    if (verticals.includes(direction)) {
        rotate = direction === 'top' ? -45 : 135
    }

    if (horizontals.includes(direction)) {
        rotate = direction === 'left' ? 225 : 45
    }

    return rotate
}

function getxAxis(target, popup, direction, offsetX) {

    let result = { x: 0, width: popup.width, arrowX: 0 }

    const { left, right } = target
    const trend = left > right ? right : left

    if (verticals.includes(direction)) {  //计算垂直方向（上下）的x坐标

        const extraSpace = offsetX * 2 //计算空白
        const halfTargetWidth = target.width / 2
        const trendSpace = trend + halfTargetWidth //计算target所在侧的空间
        const leftSpace = left + halfTargetWidth
        result.width = rootWidth - popup.width > extraSpace ? popup.width : rootWidth - extraSpace //计算popup宽度

        const halfPopupWidth = result.width / 2
        const offsetSpace = trendSpace - halfPopupWidth > offsetX ? 0 : offsetX  //计算间隔
        result.x = trendSpace - halfPopupWidth > offsetX ? leftSpace - halfPopupWidth - offsetSpace : offsetSpace
        result.arrowX = leftSpace - result.x - targetGap
    }

    if (horizontals.includes(direction)) { //计算水平方向（左右）的x坐标
        const extraSpace = targetGap + offsetX //计算间隔
        result.width = trend - extraSpace > popup.width ? popup.width : trend - extraSpace //计算popup宽度

        const trendSpace = direction === 'left' ? -(result.width + arrowLength) : (target.width + arrowLength) //计算target所在侧的空间
        result.x = left + trendSpace
        result.arrowX = (direction === 'left' ? result.width : 0) - targetGap
    }

    return result

}

function getyAxis(target, popup, direction, offsetY) {

    let result = { y: 0, height: popup.height, arrowY: 0 }

    const { top, bottom } = target
    const trend = top > bottom ? bottom : top

    if (verticals.includes(direction)) {  //计算垂直方向（上下）的y坐标
        const extraSpace = targetGap + arrowLength //计算间隔
        const tempSpace = direction === 'top' ? -(result.height + extraSpace) : (target.height + extraSpace) //计算target所在侧的空间

        result.y = top + tempSpace
        result.arrowY = (direction === 'top' ? result.height : 0) - targetGap
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
    constructor(target, popup, options = { direction: 'top', maxWidth: 'auto', needArrow: true, offset: [edgeGap, edgeGap] }) {
        if (!target || !popup) {
            return
        }

        this.state = 0
        this.popup = getElement(popup)
        this.target = getElement(target)
        this.options = options
        this.styles = {}

        this.computeStyles().then(styles => {
            this.applyStyles(styles)
        })

    }

    async computeStyles() {

        await nextTick()

        if (this.state >= 20000000000) {

            return this.styles

        } else {

            this.state++

            const { direction, maxWidth, needArrow, offset } = this.options

            const [offsetX, offsetY] = offset ? offset : [edgeGap, edgeGap]

            const popupRect = resolvePopup(this.popup, maxWidth)

            const targetRect = resolveRect(this.target)

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
                //this.arrow = resolveArrow(targetRect, popupRect, direction)
                styles['--arrow-size'] = `${arrowSize}px`
                styles['--arrow-left'] = `${arrowX}px`
                styles['--arrow-top'] = `${arrowY}px`
                styles['--arrow-rotate'] = `${arrowRotate(direction)}deg`
            }

            return styles
        }
    }

    applyStyles(styles) {
        this.styles = styles
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