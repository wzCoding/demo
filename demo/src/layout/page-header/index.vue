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
                    <div class="header-links">
                        <template v-if="headerLinks.length">
                            <a v-for="item in headerLinks" :key="item.title" class="link-item" :href="item.path"
                                target="_blank" rel="noopener noreferrer">
                                <IconButton direction="horizontal" :icon="item.icon" :text="item.title" />
                            </a>
                        </template>
                    </div>
                    <div class="theme-control">
                        <template v-if="themeControl">
                            <div class="theme-btn-container" :class="themeClass">
                                <IconButton v-for="item in themeIcon" :key="item.theme" :icon="item.icon" class="theme-btn"
                                    :class="item.theme" gap="0" @click="themeChange(item.toChangeTheme)" />
                            </div>
                        </template>
                    </div>
                    <div class="header-menu">
                        <!-- <div class="menu-button" @click="menuClick">
                            <IconButton :class="{ active: menuActive }" />
                        </div> -->
                        <Hamburger type="default"></Hamburger>
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

                .link-item {
                    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                    font-weight: 600;
                    transition: background .3s linear;
                    text-decoration: none;
                    color: var(--theme-text-color);

                    &:hover {
                        @extend .text-gradient;
                    }

                    :deep(.btn-icon img) {
                        border-radius: 8px;
                        width: 1.5rem;
                        @extend .box-gradient;
                    }
                }
            }

            .theme-control {
                position: relative;
                width: 1.5rem;
                height: 1.5rem;
                overflow: hidden;

                .theme-btn-container {
                    transition: all .3s ease;

                    &.dark {
                        transform: translateY(-1.5rem);
                    }
                }

                :deep(.btn-icon img) {
                    width: 100%;
                }
            }

            .header-menu {
                position: relative;
                // display: none;

                .menu-button {
                    --button-width: 1rem;
                    position: relative;
                    padding: 10px;
                    z-index: 3;
                    cursor: pointer;

                    .btn-container {
                        position: relative;
                        width: var(--button-width);
                        height: 3px;
                        border-radius: 2px;
                        @extend .background-gradient;

                        &::before,
                        &::after {
                            content: "";
                            display: block;
                            position: absolute;
                            // width: 100%;
                            height: 100%;
                            border-radius: 2px;
                            transition: all .3s ease;
                            @extend .background-gradient;
                        }

                        &::before {
                            width: calc(var(--button-width) + 5px);
                            top: -8px;
                        }

                        &::after {
                            width: calc(var(--button-width) + 2px);
                            top: 8px;
                            right: -2px;
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
        }


    }



}
</style>