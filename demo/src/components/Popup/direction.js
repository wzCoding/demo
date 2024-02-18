import { convertCssUnit, getElementSize } from "@/utils/index"
import { ref,nextTick } from "vue"

const arrowSize = 10  //箭头尺寸
const directions = ['top', 'right', 'left', 'bottom'] //popup位置选项

async function setDirection(options = {
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
    await nextTick()

    const { left, top, width, height } =getElementSize(target)

    const popupWidth = maxWidth && maxWidth !== 'auto' ? maxWidth : getElementSize(popup).width
    const popupHeight = maxHeight && maxHeight !== 'auto' ? maxHeight : getElementSize(popup).height
   
    const arrowLength = Math.sqrt(Math.pow(arrowSize, 2) * 2)
    console.log('arrowLength: ', arrowLength)

    console.log("top: ", top)
    console.log("left: ", left)
    console.log("width: ", width)
    console.log("height: ", height)
    console.log("popupWidth: ", popupWidth)
    console.log("popupHeight: ", popupHeight)

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
        styles.top = `${(top + (height / 2)) - (popupHeight / 2)}px`
        styles['--arrow-top'] = `${(popupHeight/2 - arrowSize / 2).toFixed(2)}px`

        // left
        if (direction === 'left') {
            styles.left = `${left - popupWidth - arrowLength / 2 - arrowSize / 2}px`
            styles['--arrow-left'] = `${popupWidth - arrowLength / 2}px`
            styles['--arrow-rotate'] = '225deg'
        }

        // right
        if (direction === 'right') {
            styles.left = `${left + width + arrowLength / 2 + arrowSize / 2}px`
            styles['--arrow-left'] = `${-arrowSize / 2}px`
            styles['--arrow-rotate'] = '45deg'
        }
    }
    return styles
}
//纵向
function VerticalStyle(direction, interval) {

}
//横向
function HorizontalStyle(direction) {

}
export {
    directions,
    setDirection
}