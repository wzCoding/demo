<script src="./index"></script>
<template>
    <header class="header">
        <div class="header-main">
            <div class="header-left">
                <slot name="left">
                    <IconButton class="header-title" :icon="titleIcon" :text="title"/>
                </slot>
            </div>
            <div class="header-right">
                <slot name="right">
                    <template v-if="headerLinks.length">
                        <div class="header-links">
                            <a v-for="item in  headerLinks " :key="item.title" class="link-item" :href="item.path"
                                target="_blank" rel="noopener noreferrer">
                                <IconButton :icon="item.icon" :text="item.title" />
                            </a>
                        </div>
                    </template>
                    <template v-if="themeControl">
                        <div class="theme-control">
                            <div class="theme-btn" :class="themeClass">
                                <IconButton v-for=" item  in  themeIcon " :key="item.theme" :icon="item.icon"
                                    :class="item.theme" gap="0" @click="themeChange(item.toChangeTheme)" />
                            </div>
                        </div>
                    </template>
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
    z-index: 996;
    transition: all .3s ease;

    .header-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 5;
        padding: 0 2rem;

        .header-left {
            display: flex;

            .header-title {
                font-size: 1.5rem;
                font-weight: 600;

                :deep(.icon img) {
                    border-radius: 50%;
                }

                :deep(.text) {
                    @extend .text-gradient;
                }
            }

            .side-icon {
                display: none;
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
                    font-weight: 600;
                    text-decoration: none;
                    color: var(--theme-text-color);

                    &:hover {
                        @extend .text-gradient;
                    }

                    :deep(.icon img) {
                        border-radius: 8px;
                        width: 1.5rem;
                        @extend .box-gradient;
                    }

                    :deep(.text) {
                        transition: background .3s linear;
                    }
                }
            }

            .theme-control {
                position: relative;
                width: 1.5rem;
                height: 1.5rem;
                overflow: hidden;

                .theme-btn {
                    transition: all .3s ease;

                    :deep(.icon img) {
                        width: 1.5rem;
                    }

                    &.dark {
                        transform: translateY(-1.5rem);
                    }
                }

                :deep(.icon img) {
                    width: 100%;
                }
            }
        }
    }
}
</style>