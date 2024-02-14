
function setPopupStyle(target, popup, styles) {
    if (!target) return
    if (typeof target === 'string') target = document.getElementsByClassName(target)[0] || document.getElementById(target)
    let arrowSize = 0 // 箭头大小
    if (popup.needArrow) arrowSize = 10 // 箭头大小
    const { left, top, width, height } = target.getBoundingClientRect()
    const popupWidth = popup.getBoundingClientRect().width
    const popupHeight = popup.getBoundingClientRect().height
    const arrowLength = Math.sqrt(Math.pow(arrowSize, 2) * 2)
    console.log('arrowLength:', arrowLength)
    console.log(`left:${left}, top:${top}, width:${width}, height:${height}`)
    console.log(`popupWidth:${popupWidth}, popupHeight:${popupHeight}`)

    let _flag = true
    if (_flag) {
        _flag = false
        styles["z-index"] = getComputedStyle(popup).zIndex ? getComputedStyle(popup).zIndex - 1 : -1
    }
    return
}

export { setPopupStyle }