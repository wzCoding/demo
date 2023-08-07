<script src="./index"></script>
<template>
    <div class="menu">
        <div class="menu-wrap">
            <div class="menu-grid">
                <div class="menu-item">
                    <div class="menu-btn">
                        <span class="menu-icon">
                            <img src="../../assets/images/css-light.svg" alt="">
                        </span>
                        <span class="menu-text">css</span>
                    </div>
                </div>
                <div class="menu-item"></div>
                <div class="menu-item"></div>
                <div class="menu-item">4</div>
                <div class="menu-item">5</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.menu {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .menu-wrap {
        transform: translateY(95px);
    }

    .menu-grid {
        width: 220px;
        max-width: 220px;
        float: none;
        display: block;
        padding-left: 0;
        padding-right: 0;
        height: 220px;
        filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.35));
        transform: rotate(-45deg);
        position: relative;
        z-index: 2;

        .menu-item {
            float: left;
            clear: none;
            text-align: inherit;
            width: 50%;
            margin-left: 0%;
            margin-right: 0%;
            height: 110px;
            background: linear-gradient(135deg, #F8B127, #CB26B6);
            overflow: hidden;
            transition: .3s;

            .menu-btn {
                height: calc(100% + 62px);
                width: calc(100% + 62px);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                color: #fff;
                transform: rotate(45deg) translate(-43px, 0);
                transition: .3s;
                cursor: pointer;
                .menu-icon{
                    img{
                        color: #fff;
                    }
                }
            }

            &::after {
                content: "";
                display: table;
                clear: both;
            }

            &:nth-child(1) {
                border-radius: 10px 10px 0 0;
            }

            &:nth-child(2) {
                position: relative;
                top: 50%;
                border-radius: 0 10px 0 0;
            }

            &:nth-child(3) {
                border-radius: 0 0 0 10px;
            }

            &:nth-child(4) {
                position: relative;
                top: 50%;
                left: 50%;
                border-radius: 0 10px 10px 0;
            }

            &:nth-child(5) {
                position: relative;
                left: 50%;
                border-radius: 0 0 0 10px;
            }

        }
    }
}
</style>