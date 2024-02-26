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
    direction: 'bottom',
    maxWidth: 'auto',
    needArrow: true
}) {

    const { target, popup } = options
    if (!target || !popup) return

    await nextTick()

    // const targetRect = getElementSize(target)
    // const popupRect = getElementSize(popup)

    // 计算弹出框的位置
    const styles = popupStyles(options)

    return styles
}

// popup位置样式
function popupStyles(options) {
    console.log(options)
    const { target, popup, direction, maxWidth, needArrow } = options

    const popupRect = resolvePopup(popup, maxWidth)

    const targetRect = resolveTarget(target, popup, direction)

    let arrowRect =  { size: arrowSize / 2, length: arrowLength / 2 }

    const styles = {
        [targetRect.trend]: `${targetRect.distance}px`,
        'max-width': `${popupRect.width}px`,
    }

    // 设置箭头样式
    if (needArrow) {
        arrowRect = resolveArrow(target, popup, direction)
        styles['--arrow-size'] = `${arrowRect.size}px`
        styles['--arrow-left'] = `${arrowRect.left}px`
        styles['--arrow-top'] = `${arrowRect.top}px`
        styles['--arrow-rotate'] = `${arrowRect.rotate}deg`
    }

    if (['top', 'bottom'].includes(direction)) {
        const tempGap = direction === 'top' ? -(popupRect.height + arrowRect.length) : (targetRect.height + arrowRect.length)
        styles['top'] = `${targetRect.top + tempGap}px`
    }

    if (['left', 'right'].includes(direction)) {
        const extraGap = edgeGap + arrowRect.size
        popupRect.width = targetRect[direction] - extraGap > popupRect.width ? popupRect.width : targetRect[direction] - extraGap
        styles['max-width'] = `${popupRect.width}px`

        const tempGap = direction === 'left' ? -(popupRect.width + arrowRect.length) : (targetRect.width + arrowRect.length)
        styles['left'] = `${targetRect.left + tempGap}px`
    }

    return styles
}

// 横向位置样式
function horizontalStyles(direction, maxWidth, targetRect, resolvePopup) {
    const { top, left, height, width } = targetRect
    let { width: popupWidth, height: popupHeight } = resolvePopup

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

// 计算target位置
function resolveTarget(target, popup, direction, needArrow) {

    if (target.rect) {
        console.log('use cache target.rect')
        return target.rect
    } else {
        target.rect = {}

        const targetSize = getElementSize(target)
        const { top, left, right, bottom, width, height } = getPosition(targetSize)
        const halfTargetWidth = width / 2
        const halfTargetHeight = height / 2
        const halfPopupWidth = popup.rect.width / 2
        const halfPopupHeight = popup.rect.height / 2

        target.rect.top = top
        target.rect.left = left
        target.rect.right = right
        target.rect.bottom = bottom
        target.rect.width = width
        target.rect.height = height

        let distance

        if (['top', 'bottom'].includes(direction)) {

            distance = left > right ? right : left
            target.rect.trend = left > right ? 'right' : 'left'
            target.rect.distance = distance - halfPopupWidth < edgeGap ? edgeGap : (left + halfTargetWidth - halfPopupWidth)
        }

        if (['left', 'right'].includes(direction)) {
            distance = top > bottom ? bottom : top
            target.rect.trend = top > bottom ? 'bottom' : 'top'
            target.rect.distance = distance - halfPopupHeight < edgeGap ? edgeGap : (top + halfTargetHeight - halfPopupHeight)
        }

        return target.rect
    }
}

// 计算popup宽度
function resolvePopup(popup, maxWidth) {

    if (popup.rect && popup.rect.state >= 2) {
        console.log('use cache popup.rect')
        return popup.rect
    } else {
        popup.rect = popup.rect ? popup.rect : { state: 0 }
        popup.rect.state++

        const popupSize = getElementSize(popup)
        const { left, top, right, bottom, width, height } = getPosition(popupSize)
        const autoWidth = bodyWidth - width > edgeGap * 2 ? width : bodyWidth - edgeGap * 2
        popup.rect.width = maxWidth && maxWidth !== 'auto' ? Number(maxWidth) : autoWidth
        popup.rect.height = height
        popup.rect.left = left
        popup.rect.top = top
        popup.rect.right = right
        popup.rect.bottom = bottom

        return popup.rect
    }
}

// 计算arrow位置
function resolveArrow(target, popup, direction) {
    if (popup.arrow && popup.arrow.state >= 2) {
        console.log('use cache popup.arrow')
        return popup.arrow

    } else {
        popup.arrow = popup.arrow ? popup.arrow : { state: 0, size: arrowSize, length: arrowLength }
        popup.arrow.state++

        if (['top', 'bottom'].includes(direction)) {
            const temp = direction === 'top' ? popup.rect.height : 0
            popup.arrow.rotate = temp ? -45 : 135
            popup.arrow.top = temp - popup.arrow.size / 2
            popup.arrow.left = target.rect.left - popup.rect.left + target.rect.width / 2 - popup.arrow.size / 2
        }

        if (['left', 'right'].includes(direction)) {
            const temp = direction === 'left' ? popup.rect.width : 0
            popup.arrow.rotate = temp ? 225 : 45
            popup.arrow.left = temp - popup.arrow.size / 2
            popup.arrow.top = popup.rect.height / 2 - popup.arrow.size / 2
        }
        
        return popup.arrow
    }
}

// 根据元素rect数据重新计算位置信息
function getPosition(rect) {
    const { left, top, right, bottom, width, height } = rect
    return {
        left,
        right: bodyWidth - right,
        top,
        bottom: bodyHeight - bottom,
        width,
        height
    }
}

export {
    directions,
    setDirection
}