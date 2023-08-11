<script src="./index"></script>
<template>
    <header class="header">
        <div class="container">
            <div class="header-left">
                <slot name="left">
                    <iconButton class="header-title" :icon="titleIcon" direction="horizontal" gap="10">{{ title }}</iconButton>
                </slot>
            </div>
            <div class="header-right">
                <slot name="right">
                    <div class="header-links">
                        <template v-if="headerLinks.length">
                            <a v-for="item in headerLinks" :key="item.name" class="link-item" :href="item.link"
                                target="_blank" rel="noopener noreferrer">
                                <iconButton direction="horizontal" :icon="item.icon" :text="item.name"/>
                            </a>
                        </template>
                    </div>
                    <div class="theme-control">
                        <template v-if="themeControl">
                            <div class="theme-btn-container" :class="themeClass">
                                <iconButton v-for="item in themeIcons" :key="item.theme" :icon="item.icon" class="theme-btn"
                                    :class="item.theme" gap="0" @click="themeChange(item.toChangeTheme)" />
                            </div>
                        </template>
                    </div>
                </slot>
            </div>
        </div>
    </header>
</template>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';

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
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 2rem;

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
            margin: 0 2rem;
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
                }

                :deep(.btn-icon img) {
                    @extend .box-gradient;
                    border-radius: 8px;
                    width: 1.5rem;
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
        }
    }
}</style>