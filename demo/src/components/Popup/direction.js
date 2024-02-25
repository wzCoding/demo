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
    const styles = popupStyles(
        direction,
        maxWidth,
        targetRect,
        popupRect,
    )

    return styles
}

// popup位置样式
function popupStyles(direction, maxWidth, target, popup) {

    const getPopup = resolvePopup(popup, maxWidth)
    const popupRect = getPopup()

    const getTarget = resolveTarget(direction, target, popupRect)
    const targetRect = getTarget()

    const getArrow = resolveArrow(direction, targetRect, popupRect)
    const arrowRect = getArrow()

    const styles = {
        [targetRect.trend]: `${targetRect.distance}px`,
        'max-width': `${popupRect.width}px`,
        '--arrow-size': `${arrowSize}px`,
        '--arrow-left': `${arrowRect.left}px`,
        '--arrow-top': `${arrowRect.top}px`,
        '--arrow-rotate': `${arrowRect.rotate}deg`
    }

    if(['top', 'bottom'].includes(direction)){
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
function resolveTarget(direction, targetRect, popupRect) {

    const cacheTarget = {} //缓存target位置尺寸信息

    return function () {
        if (!cacheTarget.trend && !cacheTarget.distance) {
            console.log('没有缓存target位置尺寸信息')
            const { top, left, right, bottom, width, height } = getPosition(targetRect)
            const halfTargetWidth = width / 2
            const halfTargetHeight = height / 2
            const halfPopupWidth = popupRect.width / 2
            const halfPopupHeight = popupRect.height / 2

            cacheTarget.top = top
            cacheTarget.left = left
            cacheTarget.right = right
            cacheTarget.bottom = bottom
            cacheTarget.width = width
            cacheTarget.height = height

            let distance

            if (['top', 'bottom'].includes(direction)) {

                distance = left > right ? right : left
                cacheTarget.trend = left > right ? 'right' : 'left'
                cacheTarget.distance = distance - halfPopupWidth < edgeGap ? edgeGap : (left + halfTargetWidth - halfPopupWidth)
            }

            if (['left', 'right'].includes(direction)) {
                distance = top > bottom ? bottom : top
                cacheTarget.trend = top > bottom ? 'bottom' : 'top'
                cacheTarget.distance = distance - halfPopupHeight < edgeGap ? edgeGap : (top + halfTargetHeight - halfPopupHeight)
            }
        }
        console.log(cacheTarget)
        return cacheTarget
    }
}

// 计算popup宽度
function resolvePopup(popupRect, maxWidth) {

    const cachePopup = { state: 0 } //缓存popup位置尺寸信息

    return function () {

        if (cachePopup.state < 2) {

            cachePopup.state++

            const { left, top, right, bottom, width, height } = getPosition(popupRect)
            const autoWidth = bodyWidth - width > edgeGap * 2 ? width : bodyWidth - edgeGap * 2
            cachePopup.width = maxWidth && maxWidth !== 'auto' ? Number(maxWidth) : autoWidth
            cachePopup.height = height
            cachePopup.left = left
            cachePopup.top = top
            cachePopup.right = right
            cachePopup.bottom = bottom

        }

        return cachePopup
    }

}

// 计算arrow位置
function resolveArrow(direction, targetRect, popupRect) {

    const cacheArrow = { state: 0 } //缓存arrow位置尺寸信息

    return function () {

        if (cacheArrow.state < 2) {

            cacheArrow.state++
            cacheArrow.size = arrowSize
            cacheArrow.length = arrowLength
            // 计算箭头位置
            if (['top', 'bottom'].includes(direction)) {
                const temp = direction === 'top' ? popupRect.height : 0
                cacheArrow.rotate = temp ? -45 : 135
                cacheArrow.top = temp - cacheArrow.size / 2
                cacheArrow.left = targetRect.left - popupRect.left + targetRect.width / 2 - cacheArrow.size / 2
            }

            if (['left', 'right'].includes(direction)) {
                const temp = direction === 'left' ? popupRect.width : 0
                cacheArrow.rotate = temp ? 225 : 45
                cacheArrow.left = temp - cacheArrow.size / 2
                cacheArrow.top = popupRect.height / 2 - cacheArrow.size / 2
            }
        }

        return cacheArrow
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