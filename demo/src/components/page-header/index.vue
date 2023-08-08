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
    }
}</style>