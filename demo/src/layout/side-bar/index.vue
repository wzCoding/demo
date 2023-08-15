<script src="./index"></script>
<template>
    <div class="side" v-show="showMenu">
        <el-menu :collapse="isCollapse" :default-active="defaultActive" :unique-opened="uniqueOpen">
            <template v-if="isSimpleMenu">
                <el-menu-item v-for="menu in menus" :key="menu.title">
                    <span class="el-icon">
                        <img :src="menu.icon" alt="icon">
                    </span>
                    <span>{{ menu.title }}</span>
                </el-menu-item>
            </template>
            <template v-else>

            </template>
        </el-menu>
    </div>
</template>
<style lang="scss" scoped>
.side {
    padding: 1rem;
    background-color: var(--theme-page-background);
    border-radius: 8px;
}
</style>