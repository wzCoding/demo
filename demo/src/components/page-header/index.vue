<script src="./index"></script>
<template>
    <div class="header">
        <div class="container">
            <div class="header-left">
                <slot name="left">
                    <iconButton class="header-title" :icon="titleIcon" direction="horizontal" gap="10">{{ title }}
                    </iconButton>
                </slot>
            </div>
            <div class="header-right">
                <slot name="right">
                    <div class="header-links">
                        <template v-if="headerLinks.length">
                            <a v-for="item in headerLinks" :key="item.name" class="link-item" :href="item.link" target="_blank"
                                rel="noopener noreferrer">
                                <iconButton  direction="horizontal" :icon="item.icon">{{
                                    item.name }}</iconButton>
                            </a>
                        </template>
                    </div>
                    <div class="theme-control">
                        <template v-if="themeControl">
                            <iconButton v-for="item in themeIcons" :key="item.theme" :icon="item.icon" :class="item.theme"></iconButton>
                        </template>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.header {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem 0;
    background-color: #fff;
    box-shadow: 0px 5px 25px -5px rgba(0, 0, 0, 0.05);
    z-index: 11;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 2rem;

        .header-left {
            .header-title {
                font-size: 1.5rem;
                font-weight: 600;

                :deep(.btn-text) {
                    color: transparent;
                    background: linear-gradient(135deg, #F8B127, #CB26B6);
                    background-clip: text;
                }
            }
        }

        .header-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: 0 2rem;

            .header-links {
                display: flex;
                gap: 0 1.5rem;
                .link-item{
                    text-decoration: none;
                    color: #333;
                    background: #fff;
                    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                    font-weight: 600;
                    transition:background .3s linear;
                    &:hover{
                        color: transparent;
                        background: linear-gradient(135deg, #F8B127, #CB26B6);
                        -webkit-background-clip: text;
                    }
                }
                :deep(.btn-icon img) {
                    background: linear-gradient(135deg, #F8B127, #CB26B6);
                    -webkit-background-clip: border-box;
                    border-radius: 8px;
                    width: 1.5rem;
                }
            }
            .theme-control{
                display: flex;
            }
        }
    }
}
</style>