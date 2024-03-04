import { getxAxis, getyAxis, getDirection } from "./direction"
import { resolveEl, resolveRect, resolveArrow, resolveOption, addStylesheetRules } from "./resolve"
import { popupStyle } from "./option"

class Popup {
    constructor(target, popup, options = {}) {
        if (!target || !popup) {
            return
        }

        this.popup = resolveEl(popup)
        this.target = resolveEl(target)
        this.options = options

        addStylesheetRules([popupStyle.popup], 'popup-style')

        if (this.options.needArrow) {
            addStylesheetRules([popupStyle.arrow], 'popup-arrow-style')
        }

        if (this.options.useCache) {
            this.state = 0
            this.styles = {}
        }

        const styles = this.computeStyle()
        this.applyStyle(styles)

    }

    computeStyle() {

        if (this.options.useCache) {

            console.log('useCache')

            if (this.state >= 2) return this.styles

            this.state++

        }

        const { direction, maxWidth, needArrow, offset, gap, arrowSize, background, color } = resolveOption(this.options)

        const targetRect = resolveRect(this.target)

        const popupRect = resolveRect(this.popup, maxWidth, offset.offsetX)

        const offsetOptions = { offset, gap, arrowSize }

        const resolvedDir = getDirection(targetRect, popupRect, direction, offsetOptions)

        const { popupX, width, arrowX } = getxAxis(targetRect, popupRect, resolvedDir, offsetOptions)

        const { popupY, arrowY } = getyAxis(targetRect, popupRect, resolvedDir, offsetOptions)

        const styles = {
            '--popup-x': `${popupX}px`,
            '--popup-y': `${popupY}px`,
            '--popup-width': `${width}px`,
            '--popup-background': `${background}`,
            '--popup-color': `${color}`
        }

        if (needArrow) {
            styles['--arrow-x'] = `${arrowX}px`
            styles['--arrow-y'] = `${arrowY}px`
            styles['--arrow-size'] = `${arrowSize}px`
            styles['--arrow-rotate'] = `${resolveArrow(resolvedDir)}deg`
        }

        this.options.direction = resolvedDir

        return styles
    }

    applyStyle(styles) {
        if (this.styles) this.styles = styles
        for (let key in styles) {
            this.popup.style.setProperty(key, styles[key])
        }
    }

    update(customStyle) {
        const styles = this.computeStyle()
        this.applyStyle(styles)
        return this.styles
    }

}

export {
    Popup
}