<template>
    <div class="canvas-box">
        <div class="upload-box" @click="selectFile">
            <e-svg name="add" color="--theme-gradient-color-2"></e-svg>
            <input type="file" accept="image/*" class="file-input" ref="fileInput" @change="fileChange">
        </div>
        <transition name="fade-in">
            <div class="image-edit" v-show="clipReady">
                <canvas id="preview-img" ref="previewImg"></canvas>
                <div class="preview-tools">
                    <e-svg v-for="tool in editTools" :key="tool" :name="tool" size="24"
                        @click="handleToolClick(tool)"></e-svg>
                </div>
                <div class="preview-clip" ref="previewClip" @mousedown="handleMouseDown" :style="clipRectStyle">
                    <div v-for="point in clipPoints" :key="point" :data-area="point" class="clip-area">
                        <span :data-point="point" class="clip-point"></span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { myCanvas } from './resouce/canvas/canvas'
import { Message } from '@/components/Message'
import { rafThrottle, deepClone } from '@/utils/index'
import ESvg from '@/components/Svg'

//dom元素
const fileInput = ref(null)
const previewImg = ref(null)
const previewClip = ref(null)

//canvas图片相关
const canvas = ref(null)
const image = ref(null)
const context = computed(() => {
    return canvas.value.context
})

//clip剪裁相关
const clipReady = ref(false)
const pointMove = ref(false)
const areaMove = ref(false)

//剪裁开始的点的数据
let startPoint = { x: 0, y: 0, point: '' }

//初始剪裁的矩形的数据（即图片原本矩形的大小）
let initRect = { x: 0, y: 0, width: 0, height: 0 }
//上一次剪裁的矩形的数据
let prevRect = initRect
//剪裁完成的矩形的数据
const clipRect = reactive(initRect)

//剪裁完成的矩形的样式
const clipRectStyle = computed(() => {
    return {
        width: `${clipRect.width}px`,
        height: `${clipRect.height}px`,
        transform: `translate(${clipRect.x}px,${clipRect.y}px)`
    }
})

//最小剪裁矩形的比例
const minClipRatio = 0.25

//clip剪裁工具相关
const editTools = ['recover', 'done', 'cancel']
const previewTools = ['download', 'delete']
const clipPoints = ['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right']

//事件处理
const selectFile = () => fileInput.value.click()
const fileChange = (e) => {
    console.log('file change')
    const file = e.target.files[0]
    if (!file.type.includes('image/')) {
        Message.warning({ text: "请选择图片类型的文件!", showClose: true })
        return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
        console.log('reader load')
        clipReady.value = true
        drawImage(e.target.result)
    }
    reader.onerror = () => {
        Message.error({ text: "图片加载出错!", showClose: true })
    }
}

const drawImage = (base64) => {
    const img = new Image()
    img.onload = () => {
        const { width, height } = canvas.value
        const maxWidth = img.width > width ? width : img.width
        const maxHeight = img.height > height ? height : img.height
        canvas.value.resetSize(maxWidth, maxHeight)
        context.value.drawImage(img, 0, 0, maxWidth, maxHeight)

        initRect = getInitRect(previewImg.value)
        drawMask(maxWidth, maxHeight)
        drawClip(maxWidth, maxHeight)
    }
    img.src = base64
    image.value = img
}

const drawMask = (width, height) => {
    console.log('draw mask')
    context.value.fillStyle = 'rgba(0,0,0,0.5)'
    context.value.fillRect(0, 0, width, height)
}

const drawClip = (width, height) => {
    // context.value.clearRect(0, 0, width, height)
    // context.value.drawImage(image.value, 0, 0, width, height)
    clipRect.width = +width
    clipRect.height = +height

}

const getInitRect = (el) => {
    const rect = el.getBoundingClientRect()
    return {
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
        top: Math.floor(rect.top),
        left: Math.floor(rect.left),
        right: Math.floor(rect.right),
        bottom: Math.floor(rect.bottom),
        minWidth: Math.floor(rect.width * minClipRatio),
        minHeight: Math.floor(rect.height * minClipRatio)
    }
}

const handleToolClick = (tool) => {
    console.log(tool)
    if (tool === 'cancel') {
        clipReady.value = false
        fileInput.value.value = ''
        clearRect()
    }
}

const handleMouseMove = rafThrottle((e) => {

    //表示坐标点在 x 轴移动的变化量
    let diffX = 0

    //表示坐标点在 y 轴移动的变化量
    let diffY = 0

    //表示矩形宽度的变化量
    let diffW = 0

    //表示矩形高度的变化量
    let diffH = 0

    //表示剪裁的点移动的安全坐标
    let safeX, safeY

    const { pageX, pageY } = e
    const { top, bottom, left, right, width, height, minWidth, minHeight } = initRect
    const { x: pointX, y: pointY, point } = startPoint
    const { x: prevX, y: prevY, width: prevW, height: prevH } = prevRect

    //计算上下左右所有剪裁点的移动变化量，以左上边界的点为起点 (0, 0) 计算
    if (pointMove.value) {

        //上边界剪裁点移动变化量与高度变化量计算
        if (point.includes('top')) {
            safeY = pageY < top ? top : (pageY + minHeight >= bottom ? bottom - minHeight : pageY)
            diffY = safeY - pointY
            diffH = -diffY
        }

        //下边界剪裁点移动变化量与高度变化量计算
        if (point.includes('bottom')) {
            safeY = pageY > bottom ? bottom : (pageY - minHeight < top ? top - minHeight : pageY)
            diffH = safeY - pointY

        }

        //左边界剪裁点移动变化量与高度变化量计算
        if (point.includes('left')) {
            safeX = pageX < left ? left : (pageX + minWidth >= right ? right - minWidth : pageX)
            diffX = safeX - pointX
            diffW = -diffX
        }

        //右边界剪裁点移动变化量与高度变化量计算
        if (point.includes('right')) {
            safeX = pageX > right ? right : (pageX - minWidth < left ? left - minWidth : pageX)
            diffW = safeX - pointX
        }

        //更新剪裁框的坐标与宽高
        clipRect.y = prevY + diffY < 0 ? 0 : prevY + diffY
        clipRect.height = prevH + diffH > height ? height : prevH + diffH

        clipRect.x = prevX + diffX < 0 ? 0 : prevX + diffX
        clipRect.width = prevW + diffW > width ? width : prevW + diffW

        //最小宽度限制
        if (clipRect.width < minWidth) {
            clipRect.width = minWidth
            pointMove.value = false
        }
        if (clipRect.height < minHeight) {
            clipRect.height = minHeight
            pointMove.value = false
        }

    }
    //计算剪裁区域的移动变化量
    else if (areaMove.value) {
        //计算最大可移动的距离
        const maxDiffX = width - prevW
        const maxDiffY = height - prevH
        //计算移动的变化量
        diffX = prevX + (pageX - pointX)
        diffY = prevY + (pageY - pointY)
        //更新剪裁框的坐标完成移动
        clipRect.x = diffX < 0 ? 0 : (diffX >= maxDiffX ? maxDiffX : diffX)
        clipRect.y = diffY < 0 ? 0 : (diffY >= maxDiffY ? maxDiffY : diffY)
    }
})


const handleMouseDown = (e) => {
    const { point, area } = e.target.dataset
    if (point && clipPoints.includes(point)) {
        areaMove.value = false
        pointMove.value = true
        startPoint.point = point
    }
    else if (!point && area) {
        pointMove.value = false
        areaMove.value = true
        startPoint.point = area
    }
    startPoint.x = e.pageX
    startPoint.y = e.pageY
    prevRect = deepClone(clipRect)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseUp = (e) => {
    console.log('mouse up')
    pointMove.value = false
    areaMove.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
}

const clearRect = () => {
    clipRect.x = 0
    clipRect.y = 0
    clipRect.width = 0
    clipRect.height = 0
}

onMounted(() => {
    const { width, height } = getComputedStyle(previewImg.value)
    canvas.value = new myCanvas({
        id: previewImg.value.id,
        parent: previewImg.value.parentNode,
        width: +width.replace('px', ''),
        height: +height.replace('px', ''),
        styles: {
            position: 'relative'
        }
    })
})
onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
})

</script>
<style lang="scss" scoped>
.canvas-box {
    padding: 20px;

    .upload-box {
        width: 160px;
        height: 160px;
        border: 2px dashed #ddd;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all var(--transition-time);

        &:hover {
            border-color: var(--theme-gradient-color-2);
        }

        .file-input {
            display: none;
        }
    }

    .image-edit {
        --gap: 10px;
        background-color: #f5f5f5;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        padding: var(--gap);
        gap: var(--gap);

        canvas#preview-img {
            width: 800px;
            height: 500px;
            background-color: #ddd;
        }

        .preview-tools {
            width: 100%;
            display: flex;
            gap: var(--gap);
            justify-content: center;
            align-items: center;
            cursor: pointer;

            svg {
                fill: var(--theme-gradient-color-2);
                transition: all var(--transition-time);

                &:hover {
                    fill: var(--theme-gradient-color-1);
                }
            }
        }

        .preview-clip {
            position: absolute;
            left: var(--gap);
            top: var(--gap);
            border: 1px solid var(--theme-gradient-color-2);
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            grid-template-areas:
                "top-left top top-right"
                "left center right"
                "bottom-left bottom bottom-right";
        }

        .clip-area {
            --pointSize: 10px;
            --pointSite: calc(var(--pointSize) / -2);
            position: relative;
            box-sizing: border-box;
            display: flex;
            border: 1px dashed var(--theme-gradient-color-2);

            .clip-point {
                display: none;
                border-radius: 50%;
                width: var(--pointSize);
                height: var(--pointSize);
                background-color: var(--theme-gradient-color-1);
            }

            &[data-area='top-left'] {
                grid-area: top-left;
                border-left: unset;
                border-top: unset;

                .clip-point {
                    display: block;
                    transform: translate(var(--pointSite), var(--pointSite));

                    &:hover {
                        cursor: nw-resize;
                    }

                }
            }

            &[data-area='top'] {
                grid-area: top;
                border-top: unset;
                border-left: unset;
                border-right: unset;
                justify-content: center;

                .clip-point {
                    display: block;
                    transform: translate(0, var(--pointSite));

                    &:hover {
                        cursor: n-resize;
                    }

                }
            }

            &[data-area='top-right'] {
                grid-area: top-right;
                border-right: unset;
                border-top: unset;
                justify-content: flex-end;

                .clip-point {
                    display: block;
                    transform: translate(calc(0px - var(--pointSite)), var(--pointSite));

                    &:hover {
                        cursor: ne-resize;
                    }

                }
            }

            &[data-area='left'] {
                grid-area: left;
                border-left: unset;
                border-top: unset;
                border-bottom: unset;
                align-items: center;

                .clip-point {
                    display: block;
                    transform: translate(var(--pointSite), 0);

                    &:hover {
                        cursor: w-resize;
                    }

                }
            }

            &[data-area='center'] {
                grid-area: center;
                border: unset;
            }

            &[data-area='right'] {
                grid-area: right;
                border-right: unset;
                border-top: unset;
                border-bottom: unset;
                justify-content: flex-end;
                align-items: center;

                .clip-point {
                    display: block;
                    transform: translate(calc(0px - var(--pointSite)), 0);

                    &:hover {
                        cursor: w-resize;
                    }

                }
            }

            &[data-area='bottom-left'] {
                grid-area: bottom-left;
                border-left: unset;
                border-bottom: unset;
                align-items: flex-end;

                .clip-point {
                    display: block;
                    transform: translate(var(--pointSite), calc(0px - var(--pointSite)));

                    &:hover {
                        cursor: ne-resize;
                    }

                }
            }

            &[data-area='bottom'] {
                grid-area: bottom;
                border-bottom: unset;
                border-left: unset;
                border-right: unset;
                justify-content: center;
                align-items: flex-end;

                .clip-point {
                    display: block;
                    transform: translate(0, calc(0px - var(--pointSite)));

                    &:hover {
                        cursor: n-resize;
                    }

                }
            }

            &[data-area='bottom-right'] {
                grid-area: bottom-right;
                border-right: unset;
                border-bottom: unset;
                justify-content: flex-end;
                align-items: flex-end;

                .clip-point {
                    display: block;
                    transform: translate(calc(0px - var(--pointSite)), calc(0px - var(--pointSite)));

                    &:hover {
                        cursor: nw-resize;
                    }

                }
            }
        }
    }


}
</style>
