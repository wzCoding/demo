<template>
    <footer class="footer">
        <div class="footer-content">Copyright © {{ date }} <a :href="blog" target="_blank"
                rel="noopener noreferrer">wzCoding</a></div>
    </footer>
</template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
export default {
    name:"PageFooter",
    setup(){
        const blog = "https://wzcoding.github.io/blog/"
        const date = new Date().getFullYear()
        return{
            blog,
            date
        }
    }
}
</script>
