<script src="./index"></script>
<template>
    <div class="menu">
        <div class="menu-wrap">
            <div class="menu-grid">
                <div class="menu-item">1</div>
                <div class="menu-item">2</div>
                <div class="menu-item">3</div>
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
        -webkit-transform: translateY(95px);
        -ms-transform: translateY(95px);
        transform: translateY(95px);
    }

    .menu-grid {
        width: 200px;
        max-width: 220px;
        float: none;
        display: block;
        // flex-wrap: wrap;
        padding-left: 0;
        padding-right: 0;
        height: 220px;
        -webkit-filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.35));
        filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.35));
        -webkit-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
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
            background: -webkit-linear-gradient(315deg, #F8B127, #CB26B6);
            background: -o-linear-gradient(315deg, #F8B127, #CB26B6);
            background: linear-gradient(135deg, #F8B127, #CB26B6);
            overflow: hidden;
            -webkit-transition: .3s;
            -o-transition: .3s;
            transition: .3s;

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