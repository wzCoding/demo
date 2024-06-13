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
                <div class="preview-clip" @mousedown="handleMouseDown" :style="clipRectStyle">
                    <div v-for="point in clipPoints" :key="point" :class="point" class="clip-area">
                        <span class="clip-point" :data-point="point"></span>
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
const clipStart = ref(false)

let initRect = null
let startRect = null
let startPoint = { x: 0, y: 0, point: '' }
const clipRect = reactive({ x: 0, y: 0, width: 0, height: 0 })
const clipRectStyle = computed(() => {
    return {
        width: `${clipRect.width}px`,
        height: `${clipRect.height}px`,
        transform: `translate(${clipRect.x}px,${clipRect.y}px)`
    }
})

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

const handleToolClick = (tool) => {
    console.log(tool)
    if (tool === 'cancel') {
        clipReady.value = false
        fileInput.value.value = ''
        clearRect()
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

        initRect = previewImg.value.getBoundingClientRect()
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

const handleMouseMove = rafThrottle((e) => {

    //表示坐标点在 x 轴移动的变化量
    let diffx = 0

    //表示坐标点在 y 轴移动的变化量
    let diffy = 0

    //表示矩形宽度的变化量
    let diffw = 0

    //表示矩形高度的变化量
    let diffh = 0

    if (clipStart.value) {
        const { x, y, point } = startPoint
        if (point.includes('top')) {
            let safey = e.y < initRect.top ? initRect.top : (e.y + initRect.height / 4 >= initRect.bottom ? initRect.bottom - initRect.height / 4 : e.y)
            diffy = safey - y
            diffh = -diffy
        }
        if (point.includes('bottom')) {
            let safey = e.y > initRect.bottom ? initRect.bottom : (e.y - initRect.height / 4 < initRect.top ? initRect.top - initRect.height / 4 : e.y)
            diffh = safey - y

        }
        if (point.includes('left')) {
            let safex = e.x < initRect.left ? initRect.left : (e.x + initRect.width / 4 >= initRect.right ? initRect.right - initRect.width / 4 : e.x)
            diffx = safex - x
            diffw = -diffx
        }

        if (point.includes('right')) {
            let safex = e.x > initRect.right ? initRect.right : (e.x - initRect.width / 4 < initRect.left ? initRect.left - initRect.width / 4 : e.x)
            diffw = safex - x
        }
    }

    clipRect.y = startRect.y + diffy < 0 ? 0 : startRect.y + diffy
    clipRect.height = startRect.height + diffh > initRect.height ? initRect.height : startRect.height + diffh

    clipRect.x = startRect.x + diffx < 0 ? 0 : startRect.x + diffx
    clipRect.width = startRect.width + diffw > initRect.width ? initRect.width : startRect.width + diffw

    if (clipRect.width < initRect.width / 4) {
        clipRect.width = initRect.width / 4
    }
    if (clipRect.height < initRect.height / 4) {
        clipRect.height = initRect.height / 4
    }
})
const getX = (x) => {

}
const handleMouseDown = (e) => {
    const point = e.target.dataset.point
    if (point && clipPoints.includes(point)) {
        clipStart.value = true
        startPoint.point = point
        startPoint.x = e.x
        startPoint.y = e.y
        startRect = deepClone(clipRect)

        console.log('mouse down')
        console.log(startRect)
        console.log(startPoint)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseUp = (e) => {
    console.log('mouse up')
    clipStart.value = false

    console.log(startRect)
    console.log(startPoint)
    //clearStart()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
}
const clearStart = () => {
    startRect = null
    startPoint.x = 0
    startPoint.y = 0
    startPoint.point = ''
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
            //transition: all var(--transition-time);
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

            &.top-left {
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

            &.top {
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

            &.top-right {
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

            &.left {
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

            &.center {
                grid-area: center;
                border: unset;
            }

            &.right {
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

            &.bottom-left {
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

            &.bottom {
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

            &.bottom-right {
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
