<template>
    <div class="canvas-box">
        <div class="upload-box" :class="{ active: selectActive }" ref="uploadBox" @[fileEvent]="selectFile">
            <e-svg name="add" color="--theme-gradient-color-2"></e-svg>
            <input type="file" accept="image/*" class="file-input" ref="fileInput" @change="fileChange">
            <transition name="fade-in">
                <canvas id="preview-img" ref="previewImg"></canvas>
            </transition>
            <div class="preview-tools" :class="{ active: showPreviewTools }" v-show="showPreviewTools">
                <e-svg v-for="tool in previewTools" :key="tool.name" :name="tool.name" size="24"
                    @click="tool.event"></e-svg>
            </div>
        </div>
        <transition name="fade-in">
            <div class="image-clip" ref="imageBox" v-show="clipReady">
                <canvas id="clip-img" ref="clipImg"></canvas>
                <div class="clip-tools">
                    <e-svg v-for="tool in clipTools" :key="tool.name" :name="tool.name" size="24"
                        @click="tool.event"></e-svg>
                </div>
                <div class="clip-rect" @mousedown="handleMouseDown" :style="clipRectStyle">
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
import ClickOutside from '@/utils/clickOutSide'
import ESvg from '@/components/Svg'
import clickOutSide from '@/utils/clickOutSide'

//剪裁框上可拖动的点的位置
const clipPoints = ['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right']

//dom元素
const fileInput = ref(null)
const uploadBox = ref(null)
const imageBox = ref(null)
const clipImg = ref(null)
const previewImg = ref(null)

//给文件选择框添加 active 样式
let cleanSelectActive
const selectActive = ref(false)

const fileEvent = computed(() => {
    return showPreviewTools.value ? '' : 'click'
})

//canvas图片相关
const image = ref(null)
const clipCvs = ref(null)
const clipCtx = computed(() => clipCvs.value.context)
const previewCvs = ref(null)
const previewCtx = computed(() => previewCvs.value.context)

//clip剪裁相关
const clipReady = ref(false)
const showPreviewTools = ref(false)
const pointMove = ref(false)
const areaMove = ref(false)

//最小剪裁矩形的比例
const minClipRatio = 0.25

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

//剪裁工具剪裁取消事件处理
const handleCancel = () => {
    clipReady.value = false
    clearClip()
}

//剪裁工具剪裁完成事件处理
const handleClipDone = () => {

    clipReady.value = false
    showPreviewTools.value = true

    const { scaleX, scaleY } = initRect
    const { x, y, width, height } = clipRect
    const { width: pw, height: ph } = previewCvs.value

    previewCtx.value.clearRect(0, 0, pw, ph)
    previewCtx.value.drawImage(image.value, x * scaleX, y * scaleY, width * scaleX, height * scaleY, 0, 0, pw, ph)

    clearClip()
}

//预览工具撤销事件处理
const handleRecover = () => {

    clipRect.x = prevRect.x
    clipRect.y = prevRect.y
    clipRect.width = prevRect.width
    clipRect.height = prevRect.height

    drawClip()
}

//预览工具下载事件处理
const handledownLoad = () => {
    previewCvs.value.canvas.toBlob((blob) => {
        //将预览canvas上绘制的图像转化为dataUrl
        const dataUrl = URL.createObjectURL(blob)
        //设置a标签并使用dataUrl下载图像
        const downloadEl = document.createElement('a')

        downloadEl.href = dataUrl
        downloadEl.download = `${Date.now()}.png`

        document.body.appendChild(downloadEl)
        downloadEl.click()
        URL.revokeObjectURL(dataUrl)
        document.body.removeChild(downloadEl)

    }, 'image/png')
}

//预览工具删除事件处理
const handleDelete = () => {
    const { width, height } = previewCvs.value
    previewCtx.value.clearRect(0, 0, width, height)

    showPreviewTools.value = false
}

//clip剪裁工具相关
const clipTools = [
    { name: 'recover', event: handleRecover },
    { name: 'done', event: handleClipDone },
    { name: 'cancel', event: handleCancel },
]
const previewTools = [
    { name: 'download', event: handledownLoad },
    { name: 'delete', event: handleDelete },
]


//事件处理
const selectFile = () => {
    selectActive.value = true
    fileInput.value.click()
}

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
        clipReady.value = true
        loadImage(e.target.result)
    }
    reader.onerror = () => {
        clipReady.value = false
        Message.error({ text: "图片加载出错!", showClose: true })
    }
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

const loadImage = (dataUrl) => {
    const img = new Image()
    img.onload = () => {
        //在这里初始化 clipCvs 相关设置
        const { width, height } = clipCvs.value
        const maxWidth = img.width > width ? width : img.width
        const maxHeight = img.height > height ? height : img.height
        clipCvs.value.resetSize(maxWidth, maxHeight)

        //获取并设置原始矩形数据（即原始图片尺寸数据）
        initRect = getInitRect(clipImg.value)
        //获取图片在 clipCvs 的宽高下的缩放比例
        initRect.scaleX = img.width / maxWidth
        initRect.scaleY = img.height / maxHeight

        //设置初始剪裁框尺寸
        clipRect.width = maxWidth
        clipRect.height = maxHeight

        drawImage()
        drawClip()
    }

    img.src = dataUrl
    image.value = img
}

const drawImage = () => {
    //绘制图片
    clipCtx.value.drawImage(image.value, 0, 0, initRect.width, initRect.height)

    //绘制遮罩层
    clipCtx.value.fillStyle = 'rgba(0,0,0,0.5)'
    clipCtx.value.fillRect(0, 0, initRect.width, initRect.height)
}

const drawClip = () => {
    //重新绘制图片与遮罩层大小
    drawImage()

    //更新剪裁区域
    const { scaleX, scaleY } = initRect
    const { x, y, width, height } = clipRect

    clipCtx.value.clearRect(x, y, width, height)
    clipCtx.value.drawImage(image.value, x * scaleX, y * scaleY, width * scaleX, height * scaleY, x, y, width, height)
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

    const { pageX, pageY } = e
    const { top, bottom, left, right, width, height, minWidth, minHeight } = initRect
    const { x: pointX, y: pointY, point } = startPoint
    const { x: prevX, y: prevY, width: prevW, height: prevH } = prevRect

    //计算上下左右所有剪裁点的移动变化量，以左上边界的点为起点 (0, 0) 计算
    if (pointMove.value) {
        //表示剪裁的点移动的安全坐标
        let safeX, safeY

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

    //画出 clip 区域图像
    drawClip()
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

    toggleMouseEvent('add')
}

const handleMouseUp = () => {
    pointMove.value = false
    areaMove.value = false

    toggleMouseEvent('remove')
}

const clearClip = () => {
    clipRect.x = 0
    clipRect.y = 0
    clipRect.width = 0
    clipRect.height = 0

    pointMove.value = false
    areaMove.value = false

    fileInput.value.value = ''

    toggleMouseEvent('remove')

    cleanSelectActive = clickOutSide(uploadBox.value, () => {
        !clipReady.value && (selectActive.value = false)
        cleanSelectActive && cleanSelectActive()
    }, imageBox.value)
}

//鼠标事件的绑定与移除切换
const toggleMouseEvent = (toggle = 'add') => {
    document[`${toggle}EventListener`]('mousemove', handleMouseMove)
    document[`${toggle}EventListener`]('mouseup', handleMouseUp)
}

onMounted(() => {
    const { width: cw, height: ch } = getComputedStyle(clipImg.value)
    const { width: pw, height: ph } = getComputedStyle(previewImg.value)
    clipCvs.value = new myCanvas({
        id: clipImg.value.id,
        parent: clipImg.value.parentNode,
        width: +cw.replace('px', ''),
        height: +ch.replace('px', ''),
        styles: {
            position: 'relative'
        }
    })
    previewCvs.value = new myCanvas({
        id: previewImg.value.id,
        parent: previewImg.value.parentNode,
        width: +pw.replace('px', ''),
        height: +ph.replace('px', ''),
    })
})
onUnmounted(() => {

    toggleMouseEvent('remove')
    cleanSelectActive && cleanSelectActive()
})

</script>
<style lang="scss" scoped>
.canvas-box {
    --gap: 10px;
    padding: 20px;

    svg {
        fill: var(--theme-gradient-color-2);
        transition: all var(--transition-time);

        &:hover {
            fill: var(--theme-gradient-color-1);
        }
    }

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
        position: relative;

        &.active {
            border-color: var(--theme-gradient-color-2);
        }

        &:hover {
            @extend .active;

            .preview-tools.active {
                transform: translate(0, 0);
            }
        }

        .file-input {
            display: none;
        }

        canvas#preview-img {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        .preview-tools {
            position: absolute;
            z-index: 1;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: var(--gap);
            background-color: rgba(0, 0, 0, 0.7);
            transform: translate(0, -100%);
            transition: transform var(--transition-time);
        }
    }

    .image-clip {

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

        canvas#clip-img {
            width: 800px;
            height: 500px;
            background-color: #ddd;
        }

        .clip-tools {
            width: 100%;
            display: flex;
            gap: var(--gap);
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        .clip-rect {
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
