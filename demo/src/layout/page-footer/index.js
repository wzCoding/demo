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