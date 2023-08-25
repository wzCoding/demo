<script src="./index"></script>
<template>
    <footer class="footer">
        <div class="footer-content">Copyright © {{ date }} <a :href="blog" target="_blank"
                rel="noopener noreferrer">wzCoding</a></div>
    </footer>
</template>
<style lang="scss" scoped>
@import '@/assets/css/index.scss';

.footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .75rem;
    color: var(--theme-text-color);
    .footer-content {
        padding: .75rem 0;
        a {
            text-decoration: none;
            font-weight: 600;
            @extend .text-gradient;
        }
    }

}</style>