<template>
    <div class="canvas-box">
        <div class="upload-box" @click="selectFile">
            <e-svg name="add" color="--theme-gradient-color-2"></e-svg>
            <input type="file" accept="image/*" class="file-input" ref="fileInput" @change="fileChange">
        </div>
        <transition name="fade-in">
            <div class="image-edit" v-show="imageLoaded">
                <canvas id="preview-box"></canvas>
                <div class="preview-tools">
                    <e-svg v-for="tool in tools" :key="tool" :name="tool" color="--theme-gradient-color-2"
                        size="24" @click="handleToolClick(tool)"></e-svg>
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { myCanvas } from './resouce/canvas/canvas'
import { Message } from '@/components/Message'
import ESvg from '@/components/Svg'

const fileInput = ref(null)

const imageLoaded = ref(true)
const tools = ['download', 'copy', 'recover', 'done', 'cancel']
const selectFile = () => fileInput.value.click()
const fileChange = (e) => {
    const files = Object.entries(e.target.files).map(([_, file]) => {
        if (!file.type.includes('image/')) {
            Message.warning({
                text: "请选择图片类型的文件!",
                showClose: true
            })
            return false
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = drawImage
        reader.onerror = (e) => {
            Message.error({
                text: "图片加载出错!",
                showClose: true
            })
            return false
        }
        return file
    })

    console.log(files)
}
const handleToolClick = (tool) => {
    console.log(tool)
}
const drawImage = (e) => {
    console.log(e)
    imageLoaded.value = true
}
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

        background-color: #f5f5f5;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap: 10px;

        canvas#preview-box {
            width: 800px;
            height: 500px;
            background-color: #ddd;
        }

        .preview-tools {
            width: 100%;
            display: flex;
            gap: 10px;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }

}
</style>
