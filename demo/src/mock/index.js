const Mock = require('mockjs')
Mock.setup({ timeout: '200-600' })
const serviceUrl = "https://localhost:5173/mock/data"
Mock.mock(serviceUrl, {
    "menus": [
        {
            index: "1",
            title: "css",
            icon: require("../../public/images/css.svg"),
            children: [
                {
                    index: "1-1",
                    title: "卡片",
                    path: "/card"
                },
                {
                    index: "1-2",
                    title: "卡片轮播",
                    path: "/card-carousel"
                }
            ]
        },
        {
            index: "2",
            title: "echarts",
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
            title: "three.js",
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
})