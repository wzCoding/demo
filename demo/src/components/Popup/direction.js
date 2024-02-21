import { getElementSize } from "@/utils/index"
import { nextTick } from "vue"

const edgeGap = 20 //边缘间距
const arrowSize = 10  //箭头尺寸
const arrowLength = Math.sqrt(Math.pow(arrowSize, 2) * 2) //箭头长度
const bodyWidth = document.body.clientWidth
const bodyHeight = document.body.clientHeight
const directions = {
    'top': 'vertical',
    'bottom': 'vertical',
    'left': 'horizontal',
    'right': 'horizontal'
} //popup位置选项

async function setDirection(options = {
    target: null,
    popup: null,
    direction: 'top',
    maxWidth: 'auto'
}) {

    const { target, popup, direction, maxWidth } = options
    if (!target) return

    await nextTick()

    const targetRect = getElementSize(target)
    const popupRect = getElementSize(popup)

    // 计算弹出框的位置
    const styles = eval(
        `${directions[direction]}Styles(
            direction,
            maxWidth,
            targetRect,
            popupRect,
        )`
    )
    
    return styles
}

// 纵向位置样式
function verticalStyles(direction, maxWidth, targetRect, popupRect) {
    isBoundary(targetRect)
    const { top, left, height, width } = targetRect
    let { width: popupWidth, height: popupHeight } = popupRect

    // 设置popup宽度
    popupWidth = maxWidth && maxWidth !== 'auto' ? maxWidth : (popupWidth > bodyWidth ? bodyWidth - edgeGap * 2 : popupWidth)
    console.log(popupWidth)
    const styles = {
        'left': `${left + width / 2 - popupWidth / 2}px`,
        'max-width': `${popupWidth}px`,
        '--arrow-size': `${arrowSize}px`,
        '--arrow-left': `${(popupWidth / 2 - arrowSize / 2).toFixed(2)}px`
    }

    if (direction === 'top') {
        styles['top'] = `${top - (popupHeight + arrowLength)}px`
        styles['--arrow-top'] = `${popupHeight - arrowSize / 2}px`
        styles['--arrow-rotate'] = '-45deg'
    }

    if (direction === 'bottom') {
        styles['top'] = `${top + (height + arrowLength)}px`
        styles['--arrow-top'] = `-${arrowSize / 2}px`
        styles['--arrow-rotate'] = '135deg'
    }
    
    return styles
}

// 横向位置样式
function horizontalStyles(direction, maxWidth, targetRect, popupRect) {
    const { top, left, height, width } = targetRect
    let { width: popupWidth, height: popupHeight } = popupRect

    // 额外间距，防止内容超出body
    let extraGap = 0
    let arrowTop = popupHeight / 2 - arrowSize / 2

    if (top + height / 2 - popupHeight / 2 < 0) {
        extraGap = edgeGap - (top + height / 2 - popupHeight / 2)
        arrowTop = arrowTop - extraGap < 0 ? arrowLength / 2 : arrowTop - extraGap
    }

    if (bodyHeight - top - height / 2 - popupHeight / 2 < 0) {
        extraGap = -(edgeGap - (bodyHeight - top - height / 2 - popupHeight / 2))
        arrowTop = arrowTop - extraGap + arrowLength > popupHeight ? popupHeight - arrowLength : arrowTop - extraGap
        
    }
    
    const styles = {
        'top': `${top + height / 2 - popupHeight / 2 + extraGap}px`,
        '--arrow-size': `${arrowSize}px`,
        '--arrow-top': `${arrowTop}px`
    }

    popupWidth = maxWidth && maxWidth !== 'auto' ? maxWidth : popupWidth

    if (direction === 'left') {

        popupWidth = left < popupWidth ? left - edgeGap : popupWidth

        styles['left'] = `${left - popupWidth - arrowLength / 2 - arrowSize / 2}px`
        styles['max-width'] = `${popupWidth}px`
        styles['--arrow-left'] = `${popupWidth - arrowSize / 2}px`
        styles['--arrow-rotate'] = '225deg'
    }

    if (direction === 'right') {

        const right = bodyWidth - left - width
        popupWidth = right - popupWidth < edgeGap ? right - edgeGap : popupWidth

        styles['left'] = `${left + width + arrowLength / 2 + arrowSize / 2}px`
        styles['max-width'] = `${popupWidth}px`
        styles['--arrow-left'] = `${-arrowSize / 2}px`
        styles['--arrow-rotate'] = '45deg'
    }
    return styles
}
// 检测是否边界
function isBoundary(targetRect){
    const {left, top, width, height} = targetRect
    console.log(left,top,width,height)
}

export {
    directions,
    setDirection
}