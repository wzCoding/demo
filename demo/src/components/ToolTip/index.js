export default {
    name:"ToolTip",
    props:{
        text:{
            type:String,
            default:""
        }
    },
    setup(props){
        const text = props.text
        return {
           text
        }
    }
}