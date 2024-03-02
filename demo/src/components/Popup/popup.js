import { getElement, getElementSize } from "@/utils/index"
import { rootWidth, rootHeight, verticals, horizontals, getxAxis, getyAxis, resolveDirection } from "./direction"
import { popupOption } from "./option"

function resolveRect(el) {
    el = getElement(el)
    const { left, top, right, bottom, width, height } = getElementSize(el)
    return {
        left,
        right: rootWidth - right,
        top,
        bottom: rootHeight - bottom,
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

function resolveArrow(direction) {
    let rotate = 0

    if (verticals.includes(direction)) {
        rotate = direction.includes('top') ? -45 : 135
    }
    if (horizontals.includes(direction)) {
        rotate = direction.includes('left') ? 225 : 45
    }

    return rotate
}

function resolveOption(options) {
    return Object.assign({}, popupOption, options)
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

        const { direction, maxWidth, needArrow, offset, gap, arrowSize } = resolveOption(this.options)

        const targetRect = resolveRect(this.target)

        const popupRect = resolvePopup(this.popup, maxWidth, offset.offsetX)

        const offsetOptions = { offset, gap, arrowSize }

        const resolvedDir = resolveDirection(targetRect, popupRect, direction, offsetOptions)
        
        const { x, width, arrowX } = getxAxis(targetRect, popupRect, resolvedDir, offsetOptions)

        const { y, arrowY } = getyAxis(targetRect, popupRect, resolvedDir, offsetOptions)

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
            styles['--arrow-rotate'] = `${resolveArrow(resolvedDir)}deg`
        }
        console.log(styles)
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
    Popup
}