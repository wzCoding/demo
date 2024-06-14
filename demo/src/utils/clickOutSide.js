/**
 * 
 * @param {Array<HTMLElement>} elements - 需要监听的元素数组，第一个元素是要监听的目标对象，剩下的是排除在外的元素
 * @param {Function} callback - 点击到elements中包含的元素以外的元素时触发的回调函数
 * @returns 
 */

function clickOutSide(target, callback, exclude) {
    if (!target) return
    //将需要排除的元素参数归一化处理
    if (!Array.isArray(exclude)) {
        exclude = [exclude]
    }
    const excludeElements = exclude.filter(Boolean)

    //点击事件的处理函数
    const handleClick = (event) => {

        //获取目标元素的尺寸与位置信息
        const { x, y, width, height } = target.getBoundingClientRect()

        //计算目标元素的结束位置
        const endX = x + width
        const endY = y + height

        //排除 exclude 参数中的元素
        if (excludeElements.length && excludeElements.some(item => item.contains(event.target))) return

        // 判断触发点击事件的元素的坐标位置是否与目标元素有重叠
        else if ((event.clientX > endX || event.clientX < x || event.clientY > endY || event.clientY < y)) {

            //执行回调
            callback && callback()
        }
    }

    //给页面绑定点击事件
    document.addEventListener('click', handleClick)

    //返回一个清除监听点击事件的函数，以便在合适的时候移除对整个页面点击事件的监听
    return () => {
        document.removeEventListener('click', handleClick)
    }

}

export default clickOutSide