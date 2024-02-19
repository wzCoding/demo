import { getElementSize } from "@/utils/index"
import { nextTick } from "vue"

const edgeGap = 20 //边缘间距
const arrowSize = 10  //箭头尺寸
const arrowLength = Math.sqrt(Math.pow(arrowSize, 2) * 2) //箭头长度
const directions = ['top', 'right', 'left', 'bottom'] //popup位置选项
const bodyWidth = document.body.clientWidth
const bodyHeight = document.body.clientHeight

async function setDirection(options = {
    target: null,
    popup: null,
    direction: 'top',
    maxWidth: 'auto',
    maxHeight: 'auto'
}) {
    
    const { target, popup, direction, maxWidth, maxHeight } = options
    if (!target) return

    await nextTick()

    // 计算弹出框的位置
    if (['top', 'bottom'].includes(direction)) {
        const verticalStyle = verticalStyles(
            direction,
            maxWidth,
            getElementSize(target),
            getElementSize(popup),
        )

        return verticalStyle
    }

    if (['left', 'right'].includes(direction)) {
        const horizontalStyle = horizontalStyles(
            direction,
            maxWidth,
            getElementSize(target),
            getElementSize(popup),
        )

        return horizontalStyle
    }
}

// 纵向位置样式
function verticalStyles(direction, maxWidth, targetRect, popupRect) {

    const { top, left, height, width } = targetRect
    let { width: popupWidth, height: popupHeight } = popupRect
    
    // 设置popup宽度
    popupWidth = maxWidth && maxWidth !== 'auto' ? maxWidth : (popupWidth > bodyWidth ? bodyWidth - edgeGap * 2 : popupWidth)

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

    const styles = {
        'top': `${top + height / 2 - popupHeight / 2}px`,
        '--arrow-top': `${(popupHeight / 2 - arrowSize / 2).toFixed(2)}px`
    }

    if (direction === 'left') {

        popupWidth = maxWidth && maxWidth !== 'auto' ? maxWidth : (left < popupWidth ? left - edgeGap : popupWidth)

        styles['left'] = `${left - popupWidth - arrowLength / 2 - arrowSize / 2}px`
        styles['max-width'] = `${popupWidth}px`
        styles['--arrow-left'] = `${popupWidth - arrowLength / 2}px`
        styles['--arrow-rotate'] = '225deg'
    }

    if (direction === 'right') {

        const right = bodyWidth - left - width
        popupWidth = maxWidth && maxWidth !== 'auto' ? maxWidth : (right - popupWidth < edgeGap ? right - edgeGap : popupWidth)

        styles['left'] = `${left + width + arrowLength / 2 + arrowSize / 2}px`
        styles['max-width'] = `${popupWidth}px`
        styles['--arrow-left'] = `${-arrowSize / 2}px`
        styles['--arrow-rotate'] = '45deg'
    }
    return styles
}

export {
    directions,
    setDirection
}