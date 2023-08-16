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
    
}
</style>