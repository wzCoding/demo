<template>
    <div class="card-box" ref="cardBox">
        <div v-for="item in cardMap" :key="item.num" class="card-item"
            :style="{ '--order': item.order, color: item.color }" @click="handleClick">
            <div class="front" :data-num="item.num">
                <div class="card-num top">{{ item.num }}</div>
                <div class="card-icon">{{ item.icon }}</div>
                <div class="card-num bottom">{{ item.num }}</div>
            </div>
            <div class="back"></div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getRandom } from '@/utils/index'
//卡片配置
const cardIcons = [{ color: '#ff0000', icon: '♦️' }, { color: '#635994', icon: '♣️' }, { color: '#ff0000', icon: '♥️' }, { color: '#635994', icon: '♠️' }]
const cardNums = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
//卡片数量
const totalCards = 7
let order = 0 - (totalCards - 1) / 2
//卡片元素
const cardBox = ref(null)
const cardMap = reactive([])

function handleClick(e) {
    if (!e.currentTarget.className.includes('card-item')) return
    // 移除其他卡片的激活状态
    const prevCard = [...cardBox.value.children].filter(item => item.className.includes('active'))[0]
    if (prevCard && prevCard !== e.currentTarget) {
        prevCard.classList.remove('active')
    }
    // 切换当前卡片的激活状态
    e.currentTarget.classList.toggle('active')
}

function createCard(total) {
    const iconRandom = getRandom(0, cardIcons.length - 1)
    const numRandom = getRandom(0, cardNums.length - 1)
    const icon = cardIcons[iconRandom]
    const num = cardNums[numRandom]
    const exist = cardMap.filter(item => item.num === num && item.icon === icon.icon)
    if (exist.length > 0) {
        return createCard(total)
    }
    total--
    if (total > 0) {
        createCard(total)
    }
    // 创建卡牌
    const res = {
        num,
        order: order++,
        ...icon
    }
    cardMap.push(res)
}

onMounted(() => createCard(totalCards))

</script>
<style lang="scss" scoped>
.card-box {
    width: 100%;
    height: 100%;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover {
        .card-item {
            transform: rotate(calc(var(--order) * 8deg)) translate(calc(var(--order) * 120px));
        }

    }

    .card-item {
        width: 160px;
        height: 240px;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        bottom: 180px;
        transition: 0.8s;
        position: absolute;
        transform-origin: 50% 100%;
        transform: rotate(calc(var(--order) * 5deg));

        &.active {
            transform: translate(0, -250px);

            .front {
                transform: rotateY(0deg);
            }

            .back {
                transform: rotateY(180deg);
            }
        }

        .front,
        .back {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            transition: 0.8s;
            backface-visibility: hidden;
        }

        .back {
            background-color: #64a9ed;
            box-sizing: border-box;
            border: 8px solid #409eff;

        }

        .front {
            background-color: #f5f5f5;
            transform: rotateY(180deg);
            display: flex;
            justify-content: center;
            align-items: center;

            .card-icon {
                font-size: 5rem;
            }

            .card-num {
                font-size: 2rem;
                position: relative;
                &.top {
                    align-self: flex-start;
                }

                &.bottom {
                    align-self: flex-end;
                }
            }

            &[data-num="10"]{
                .card-num {
                    &.top {
                        left: 15px;
                    }

                    &.bottom {
                        right: 15px;
                    }
                }
            }
            &[data-num="Q"] {
                .card-num {
                    &.top {
                        left: 10px;
                    }

                    &.bottom {
                        right: 10px;
                    }
                }

            }
            &[data-num="K"]{
                .card-num {
                    
                    &.top {
                        left: 5px;
                    }

                    &.bottom {
                        right: 5px;
                    }
                }
            }
        }
    }
}
</style>