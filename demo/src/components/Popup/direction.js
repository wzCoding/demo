import { convertCssUnit, getElementSize } from "@/utils/index"

const arrowSize = 10  //箭头尺寸
const directions = ['top', 'right', 'left', 'bottom'] //popup位置选项
const triggerEvents = {   //触发事件选项
    'click': ['click'],
    'hover': ['mouseenter', 'mouseleave']
}

function setDirection(options = {}) {
    const { target, popup, direction, w, h } = options
    if (!target) return
    const styles = {
        "width": convertCssUnit(w),
        "height": convertCssUnit(h)
    }

    const { left, top, width, height } = getElementSize(target)

    const popupWidth = getElementSize(popup).width
    const popupHeight = getElementSize(popup).height
    const arrowLength = Math.sqrt(Math.pow(arrowSize, 2) * 2)

    if (['top', 'bottom'].includes(direction)) {

        // common
        styles.left = `${(left + width / 2) - popupWidth / 2}px`
        styles['--arrow-size'] = `${arrowSize}px`
        styles['--arrow-left'] = `${(popupWidth / 2 - arrowSize / 2).toFixed(2)}px`

        // top
        if (direction === 'top') {
            styles['top'] = `${top - (popupHeight + arrowLength)}px`
            styles['--arrow-top'] = `${popupHeight - arrowSize / 2}px`
            styles['--arrow-rotate'] = '-45deg'
        }

        // bottom
        if (direction === 'bottom') {
            styles['top'] = `${top + (height + arrowLength)}px`
            styles['--arrow-top'] = `-${arrowSize / 2}px`
            styles['--arrow-rotate'] = '135deg'
        }

    } else if (['left', 'right'].includes(direction)) {
        styles.top = `${top + height / 2}px`
        styles.left = `${(left + width / 2) - popupWidth / 2}px`
        styles['--arrow-top'] = `${(popupHeight / 2 - arrowLength / 2).toFixed(2)}px`
    }
    return styles
}

export {
    triggerEvents,
    directions,
    setDirection
}