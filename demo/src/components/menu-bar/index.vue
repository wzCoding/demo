<script src="./index"></script>
<template>
    <div class="menu">
        <div class="col-md-6 nav-col">
            <div class="nav-wrap">
                <div class="nav-grid">
                    <div class="single-item">
                        <a role="button" class="section-btn" data-section="about">
                            <span class="icon"><i class="fa-thin fa-circle-user"></i></span>
                            <span class="txt">ABOUT</span>
                        </a>
                    </div>
                    <div class="single-item">
                        <a role="button" class="section-btn" data-section="service">
                            <span class="icon"><i class="fa-thin fa-gear"></i></span>
                            <span class="txt">SERVICE</span>
                        </a>
                    </div>
                    <div class="single-item">
                        <a role="button" class="section-btn" data-section="portfolio">
                            <span class="icon"><i class="fa-thin fa-folder-open"></i></span>
                            <span class="txt">PORTFOLIO</span>
                        </a>
                    </div>
                    <div class="single-item">
                        <a role="button" class="section-btn" data-section="faq">
                            <span class="icon"><i class="fa-thin fa-circle-question"></i></span>
                            <span class="txt">FAQ</span>
                        </a>
                    </div>
                    <div class="single-item">
                        <a role="button" class="section-btn" data-section="gallery">
                            <span class="icon"><i class="fa-thin fa-image"></i></span>
                            <span class="txt">GALLERY</span>
                        </a>
                    </div>
                    <div class="single-item">
                        <a role="button" class="section-btn" data-section="blog">
                            <span class="icon"><i class="fa-thin fa-file-pen"></i></span>
                            <span class="txt">BLOG</span>
                        </a>
                    </div>
                    <div class="single-item">
                        <a role="button" class="section-btn" data-section="contact">
                            <span class="icon"><i class="fa-thin fa-user-plus"></i></span>
                            <span class="txt">CONTACT</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.menu {
    height: 100%;
    position: relative;

    .nav-col {
        -webkit-box-ordinal-group: 3;
        -ms-flex-order: 2;
        order: 2;

        .nav-wrap {
            -webkit-transform: translateY(95px);
            -ms-transform: translateY(95px);
            transform: translateY(95px);
        }

        .nav-grid {
            width: auto;
            max-width: 220px;
            float: none;
            display: block;
            margin-left: 65px;
            margin-top: -125px;
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

            &::after {
                content: "";
                position: absolute;
                top: -55px;
                left: -5px;
                width: 170px;
                height: 170px;
                //background: url(../images/dot-vector.png) center center no-repeat;
                background-size: cover;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
                opacity: 0.4;
                z-index: -1;
            }

            .single-item {
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

                &::before,
                &::after {
                    content: "";
                    display: table;
                }

                a {
                    display: block;
                    height: calc(100% + 62px);
                    width: calc(100% + 62px);
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    text-align: center;
                    color: #fff;
                    text-decoration: none;
                    -webkit-transform: rotate(45deg) translate(-43px, 0);
                    -ms-transform: rotate(45deg) translate(-43px, 0);
                    transform: rotate(45deg) translate(-43px, 0);
                    -webkit-transition: .3s;
                    -o-transition: .3s;
                    transition: .3s;

                    .icon {
                        font-size: 20px;
                        line-height: 100%;
                        width: 30px;
                        margin-bottom: 10px;
                    }

                    .txt {
                        font-size: 14px;
                    }

                    &:hover {
                        background: #9f2b83;
                    }

                }

                &:nth-child(1) {
                    border-radius: 10px 0 0 0;
                }

                &:nth-child(2) {
                    top: 0;
                }

                &:nth-child(3) {
                    position: relative;
                    top: calc(100% / 3);
                    border-radius: 0 10px 0 0;
                }

                &:nth-child(4) {
                    top: 0;
                    left: 0;
                    border-radius: 0 0 0 10px;
                }

                &:nth-child(5) {
                    border-radius: 0;
                }

                &:nth-child(6) {
                    position: relative;
                    top: calc(100% / 3);
                    border-radius: 0 0 10px 0;
                }

                &:nth-child(7) {
                    left: calc(100% / 3);
                    border-radius: 0 0 0 10px;
                }
            }
        }
    }
}
</style>