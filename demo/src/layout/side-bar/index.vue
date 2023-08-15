<script src="./index"></script>
<template>
    <div class="side-bar" v-show="showMenu">
        <el-menu :collapse="isCollapse" :default-active="defaultActive" :unique-opened="uniqueOpen">
            <template v-if="isSimpleMenu">
                <el-menu-item v-for="menu in menus" :key="menu.title" @click="toPage(menu.path)">
                    <el-icon>
                        <slot name="icon">
                            <img :src="menu.icon" alt="icon">
                        </slot>
                    </el-icon>
                    <template #title><slot>{{ menu.title }}</slot></template>
                </el-menu-item>
            </template>
            <template v-else>

            </template>
        </el-menu>
    </div>
</template>
<style lang="scss" scoped>
@import "@/assets/css/index.scss";
.side-bar {
    background-color:var(--theme-header-background);
    position:absolute;
    right:0;
    top:75px;
    border-radius: 8px;
    transform:translateY(-200%);
    transition:all .3s ease;
    .el-menu{
        border-radius: 8px;
        .el-menu-item{
            .el-icon{
                img{
                    width:1.5rem;
                    border-radius:8px;
                    @extend .box-gradient;
                }
            }
        }
    }
}
</style>