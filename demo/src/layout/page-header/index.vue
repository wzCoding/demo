<script src="./index"></script>
<template>
    <header class="header">
        <div class="header-main">
            <div class="header-left">
                <slot name="left">
                    <IconButton class="header-title" :icon="titleIcon" direction="horizontal" :text="title" gap="10" />
                </slot>
            </div>
            <div class="header-right">
                <slot name="right">
                    <template v-if="headerLinks.length">
                        <div class="header-links">
                            <a v-for="item in headerLinks" :key="item.title" class="link-item" :href="item.path"
                                target="_blank" rel="noopener noreferrer">
                                <IconButton direction="horizontal" :icon="item.icon" :text="item.title" />
                            </a>
                        </div>
                    </template>
                    <template v-if="themeControl">
                        <div class="theme-control">
                            <div class="theme-btn" :class="themeClass">
                                <IconButton v-for="item in themeIcon" :key="item.theme" :icon="item.icon"
                                    :class="item.theme" gap="0" @click="themeChange(item.toChangeTheme)" />
                            </div>
                        </div>
                    </template>
                    <div class="header-menu">
                        <Hamburger type="primary" :active="hamburgerActive" @hamburgerClick="showMenu"></Hamburger>
                        <el-drawer v-model="hamburgerActive" :with-header="false" direction="ttb">
                            <div class="menu-container">
                                <template v-if="headerLinks.length">
                                    <div class="header-menu-links">
                                        <a v-for="item in headerLinks" :key="item.title" class="link-item" :href="item.path"
                                            target="_blank" rel="noopener noreferrer">
                                            <IconButton direction="horizontal" :icon="item.icon" :text="item.title" />
                                        </a>
                                    </div>
                                </template>
                                <template v-if="themeControl">
                                    <div class="header-menu-theme">
                                        <div class="theme-btn" :class="themeClass">
                                            <IconButton v-for="item in themeIcon" :key="item.theme" :icon="item.icon"
                                                :class="item.theme" :text="item.theme" direction="horizontal" iconSite="left" gap="0" @click="themeChange(item.toChangeTheme)" />
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </el-drawer>
                    </div>
                </slot>
            </div>
        </div>
    </header>
</template>
<style lang="scss" scoped>
@import '@/assets/css/index.scss';

.header {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem 0;
    background-color: var(--theme-header-background);
    box-shadow: 0px 2px 8px var(--theme-box-shadow-color);
    z-index: 11;
    transition: all .3s ease;

    .header-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 5;
        padding: 0 2rem;

        .header-left {
            .header-title {
                font-size: 1.5rem;
                font-weight: 600;

                :deep(.btn-icon img) {
                    border-radius: 50%;
                }

                :deep(.btn-text) {
                    @extend .text-gradient;
                }
            }
        }

        .header-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 0 1.2rem;

            .header-links {
                display: flex;
                gap: 0 1.5rem;
            }

            .theme-control {
                position: relative;
                width: 1.5rem;
                height: 1.5rem;
                overflow: hidden;

                :deep(.btn-icon img) {
                    width: 100%;
                }
            }

            .header-menu {
                position: relative;
                display: none;

                :deep(.el-overlay) {
                    top: 60px !important;

                    .el-drawer__body {
                        background: var(--theme-header-background) !important;
                    }
                }

                .menu-container{
                    .header-menu-links{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        gap:5px 0;
                        .btn-container{
                            border-bottom:1px dashed var(--theme-text-color);
                        }
                    }
                }
            }
        }

        .link-item {
            // font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            font-weight: 600;
            text-decoration: none;
            color: var(--theme-text-color);


            &:hover {
                :deep(.btn-text) {
                    @extend .text-gradient;
                }
            }

            :deep(.btn-icon img) {
                border-radius: 8px;
                width: 1.5rem;
                @extend .box-gradient;
            }

            :deep(.btn-text) {
                transition: background .3s linear;
            }
        }

        .header-menu-theme {
            position: relative;
            height: 1.5rem;
            overflow: hidden;
            color:var(--theme-text-color);
            .theme-btn {
                transition: all .3s ease;
                :deep(.btn-icon img){
                    width: 1.5rem;
                }
                &.dark {
                    transform: translateY(-1.5rem);
                }
            }
        }

    }



}
</style>