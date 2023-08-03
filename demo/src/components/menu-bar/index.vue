<script src="./index"></script>
<template>
    <div class="menu-container" :class="collapseClass">
        <el-menu :mode="mode" :collapse="collapse" :unique-opened="uniqueOpen" :default-active="defaultActive">
            <el-sub-menu v-for="menu in menus" :key="menu.index" :index="menu.index">
                <template #title>
                    <img v-if="menu.icon" :src="menu.icon" :alt="menu.title" class="title-icon">
                    <span class="title-text">{{ menu.title }}</span>
                </template>
                <el-menu-item v-for="item in menu.children" :key="item.index" :index="item.index"
                    @click="toPage(item.path)">
                    {{ item.title }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
        <div class="menu-ctrl" @click="ctrlMenu">
            <el-icon class="ctrl-arrow" :class="ctrlArrow">
                <ArrowLeft />
            </el-icon>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.menu-container {
    height: 100%;
    border-right: 1px solid var(--el-menu-border-color);
    position: relative;
    z-index: 10;
    .el-menu {
        border-right: none;
        height: 100%;

        .el-sub-menu__title {
            .title-icon {
                width: 1.5rem;
            }

            .title-text {
                padding-left: .8rem;
            }
        }
    }

    .el-menu .el-sub-menu {
        min-width: unset;
    }

    .menu-ctrl {
        padding: .75rem 2px;
        position: absolute;
        right: -21px;
        top: 50%;
        margin-top: -20px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border: 1px solid var(--el-menu-border-color);
        border-left: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        .el-icon {
            transition: all .5s ease-in-out;
        }

        .left-arrow {
            transform: rotate(0deg);
        }

        .right-arrow {
            transform: rotate(180deg);
        }
    }
}
</style>