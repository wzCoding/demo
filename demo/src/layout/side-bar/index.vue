<script src="./index"></script>
<template>
    <div class="side-bar">
        <div class="side-bar-button" @click="handleClick">
            <IconButton :class="{ active: sideBarActive }" />
        </div>
        <el-drawer v-model="isShow" title="I am the title" :with-header="false" @close="handleClose">
            <span>Hi there!</span>
        </el-drawer>
    </div>
</template>
<style lang="scss" scoped>
@import "@/assets/css/index.scss";

.side-bar {
    .side-bar-button {
        position: relative;
        padding: 10px;
        z-index: 3;
        cursor: pointer;

        .btn-container {
            position: relative;
            width: 1.5rem;
            height: 3px;
            border-radius: 2px;
            @extend .background-gradient;

            &::before,
            &::after {
                content: "";
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 2px;
                transition: all .3s ease;
                @extend .background-gradient;
            }

            &::before {
                top: -8px;
            }

            &::after {
                top: 8px;
            }

            &.active {
                background: transparent;

                &::before {
                    top: -5px;
                    transform: rotate(45deg) translate(15%, 100%);
                }

                &::after {
                    top: 5px;
                    transform: rotate(-45deg) translate(15%, -100%);
                }
            }
        }
    }
}
</style>