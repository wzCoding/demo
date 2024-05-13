<template>
    <div class="parallax" ref="parallax" :class="scrollClass" v-loading="loading">
        <div class="parallax-item" v-for="image in showImages" :key="image.index" :class="image.name"
            :data-index="image.index">
            <img :src="image.url" alt="img">
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { getImage } from '@/utils/index'
import { Timer } from '@/utils/timer'
import { Message } from '@/components/Message'
//加载图片
const loading = ref(true)
const images = ['c8.jpg', 'c10.jpg', 'c13.jpg', 'c15.jpg', 'c16.jpg']
const imageList = reactive([])
const showImages = reactive([])

//默认数据
let activeIndex = 0
let isTransition = false
const parallax = ref(null)
const scrollClass = ref('')

Promise.all(images.map(getImage)).then((res) => {
    //模拟加载
    imageList.push(...res)
    showImages.push(...getImageByIndex(activeIndex))
    Message.info({
        showClose: true,
        text: '在图片上滑动鼠标滚轮可自由切换图片',
        duration: 3000
    })
    loading.value = false
})

//根据index获取图片
const getImageByIndex = (index) => {
    const prev = index - 1 < 0 ? imageList.length - 1 : index - 1
    const next = index + 1 > imageList.length - 1 ? 0 : index + 1
    const res = [
        { name: 'prev', url: imageList[prev], index: prev },
        { name: 'curr', url: imageList[index], index: index },
        { name: 'next', url: imageList[next], index: next }
    ]
    return res
}

//计算index
const setActiveIndex = (isScrollDown) => {
    scrollClass.value = isScrollDown ? 'scroll-down' : 'scroll-up'
    if (isScrollDown) {
        activeIndex = activeIndex + 1 > imageList.length - 1 ? 0 : activeIndex + 1
    } else {
        activeIndex = activeIndex - 1 < 0 ? imageList.length - 1 : activeIndex - 1
    }
}

//处理鼠标滚轮事件
const handleWheel = (e) => {
    if (!e.deltaY || isTransition) {
        return
    }
    stopAutoScroll()
    //更新显示的图片
    isTransition = true
    setActiveIndex(e.deltaY > 0)
}

//处理过渡结束事件
//过渡结束时，更新显示的图片
const handleTransitionEnd = () => {
    isTransition = false
    scrollClass.value = ''
    //更新显示的图片
    showImages.splice(0, showImages.length, ...getImageByIndex(activeIndex))
}

//自动滚动
let timer = new Timer()
let interval = null
const delay = 2000
const autoScroll = () => {
    interval = timer.interval(() => setActiveIndex(true), delay)
}
const stopAutoScroll = () => {
    timer.clear(interval)
    interval = null
}

onMounted(() => {
    autoScroll()
    parallax.value.addEventListener('wheel', handleWheel)
    parallax.value.addEventListener('transitionend', handleTransitionEnd)
    parallax.value.addEventListener('mouseenter', stopAutoScroll)
    parallax.value.addEventListener('mouseleave', autoScroll)
})

onBeforeUnmount(() => {
    parallax.value.removeEventListener('wheel', handleWheel)
    parallax.value.removeEventListener('transitionend', handleTransitionEnd)
    parallax.value.removeEventListener('mouseenter', stopAutoScroll)
    parallax.value.removeEventListener('mouseleave', autoScroll)
    timer = null
})
</script>
<style lang="scss" scoped>
.parallax {
    width: 100%;
    height: 100%;
    position: relative;

    .parallax-item {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;


        img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;

        }

        &.prev,
        &.next {
            height: 0;
            z-index: 1;

        }

        &.prev {
            top: 0;

            img {
                top: 0;
            }
        }

        &.next {
            bottom: 0;

            img {
                bottom: 0;
            }
        }
    }

    &.scroll-up {
        .curr {
            img {
                transition: 1s ease;
                transform: translateY(10%);
            }
        }

        .prev {
            height: 100%;
            transition: 1s ease;

            img {
                transform: translateY(0);
            }
        }
    }

    &.scroll-down {
        .curr {
            img {
                transition: 1s ease;
                transform: translateY(-10%);
            }
        }

        .next {
            height: 100%;
            transition: 1s ease;

            img {
                transform: translateY(0);
            }
        }
    }
}
</style>
