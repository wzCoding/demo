import { ref } from "vue"
const menus = {
    mode: ref("vertical"),
    collapse: ref(true),
    options: [
        {
            index: "1",
            title: "css-demo",
            icon: require("../../public/images/css.svg"),
            children: [
                {
                    index: "1-1",
                    title: "卡片"
                },
                {
                    index: "1-2",
                    title: "卡片轮播"
                }
            ]
        },
        {
            index: "2",
            title: "echarts-demo",
            icon: require("../../public/images/chart.svg"),
            children: [
                {
                    index: "2-1",
                    title: "报表1"
                },
                {
                    index: "2-2",
                    title: "报表2"
                }
            ]
        },
        {
            index: "3",
            title: "three.js-demo",
            icon: require("../../public/images/cubes.svg"),
            children: [
                {
                    index: "3-1",
                    title: "海面"
                },
                {
                    index: "3-2",
                    title: "飞鸟"
                }
            ]
        }
    ]
}

export { menus }