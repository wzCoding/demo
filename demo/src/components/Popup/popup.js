import { getxAxis, getyAxis, getDirection } from "./direction"
import { resolveEl, resolveRect, resolvePopup, resolveArrow, resolveOption, addStylesheetRules } from "./resolve"

const defaultStyles = {
    popup: [
        ".popup",
        ["position", "absolute"],
        ["z-index", "2"],
        ["inset", "0 0 auto"],
        ["box-shadow", "0px 0px 6px rgba(0, 0, 0, 0.2)"],
        ["border-radius", "4px"],
        ["padding", "8px"],
        ["background-color", "var(--popup-background)"],
        ["color", "var(--popup-text)"],
        ["transform", "translate(var(--popup-x), var(--popup-y))"],
        ["max-width", "var(--popup-width)"]
    ],
    arrow: [
        ".popup.arrow-popup::after",
        ["content", "''"],
        ["display", "block"],
        ["position", "absolute"],
        ["inset", "0 0 auto"],
        ["background-color", "var(--popup-background)"],
        ["width", "var(--arrow-size)"],
        ["height", "var(--arrow-size)"],
        ["left", "var(--arrow-x)"],
        ["top", "var(--arrow-y)"],
        ["transform", " rotate(var(--arrow-rotate))"],
        ["z-index", "-1"],
        ["box-shadow", "-1px 1px 1px rgba(0, 0, 0, 0.1)"]
    ]
}


class Popup {
    constructor(target, popup, options = {}) {
        if (!target || !popup) {
            return
        }
        
        this.popup = resolveEl(popup)
        this.target = resolveEl(target)
        this.options = options

        addStylesheetRules([defaultStyles.popup],'popup-style')

        if(this.options.needArrow){
            addStylesheetRules([defaultStyles.arrow],'popup-arrow-style')
        }

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

        const resolvedDir = getDirection(targetRect, popupRect, direction, offsetOptions)

        const { x, width, arrowX } = getxAxis(targetRect, popupRect, resolvedDir, offsetOptions)

        const { y, arrowY } = getyAxis(targetRect, popupRect, resolvedDir, offsetOptions)

        const styles = {
            '--popup-x': `${x}px`,
            '--popup-y': `${y}px`,
            '--popup-width': `${width}px`
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

    applyStyles(styles) {
        if (this.styles) this.styles = styles
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