import { convertCssUnit, getElementSize } from "@/utils/index"

const arrowSize = 10  //箭头尺寸
const directions = ['top', 'right', 'left', 'bottom'] //popup位置选项

function setDirection(options = {
    target: null,
    popup: null,
    direction: 'top',
    maxWidth: 'auto',
    maxHeight: 'auto'
}) {
    const { target, popup, direction, maxWidth, maxHeight } = options
    if (!target) return
    const styles = {
        "max-width": convertCssUnit(maxWidth),
        "max-height": convertCssUnit(maxHeight)
    }

    const { left, top, width, height } = getElementSize(target)

    const popupWidth = maxWidth && maxWidth !== 'auto' ? maxWidth : getElementSize(popup).width
    const popupHeight = maxHeight && maxHeight !== 'auto' ? maxHeight : getElementSize(popup).height
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
    directions,
    setDirection
}