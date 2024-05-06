<template>
    <div class="chart-page screen-page">
        <div class="screen-header">
            <div class="header-left date">{{ date }}</div>
            <h3 class="header-middle title">{{ title }}</h3>
            <div class="header-right time">{{ weekDay }} {{ time }}</div>
        </div>
        <div class="screen-chart-container">
            <div class="chart-container container-1">
                <div v-for="item in chartOptions.slice(0, 3)" :key="item.id" class="chart-box" :class="item.class">
                    <span class="box-border" v-for="i in 4" :key="i"></span>
                    <div class="chart-title">
                        <span>{{ item.title }}</span>
                        <div v-if="item.tableTitle" class="table-title">
                            <span v-for="(title, index) in item.tableTitle" :key="title.text"
                                :class="{ active: title.active }" @click="chartUpdate(index)">{{ title.text }}
                            </span>
                        </div>
                    </div>
                    <div class="chart-table" v-if="item.table">
                        <div v-for="t in item.table" :key="t.name" class="table-item">
                            <span class="item-data" v-if="item.tableTitle">{{ t.data[chartIndex] }}</span>
                            <span class="item-data" v-else>{{ t.data }}</span>
                            <span class="item-name">{{ t.name }}</span>
                        </div>
                    </div>
                    <div class="chart-content" :id="item.id"></div>
                </div>
            </div>
            <div class="chart-container container-2">
                <div v-for="item in chartOptions.slice(3)" :key="item.id" class="chart-box" :class="item.class">
                    <span class="box-border" v-for="i in 4" :key="i"></span>
                    <template v-if="!item.option && item.table">
                        <div class="data-table">
                            <div class="table-title">{{ item.title }}</div>
                            <div class="table-header">
                                <span v-for="column in item.table.columns" :key="column.prop">{{ column.title }}
                                </span>
                            </div>
                            <ul class="table-content">
                                <transition-group name="list" tag="ul" class="transition-box">
                                    <li v-for="data in item.table.data" :key="data.name">
                                        <span>{{ data.name }}</span>
                                        <span>{{ numberFormatter(data.total, '吨') }}</span>
                                        <span>{{ numberFormatter(data.money, '万元') }}</span>
                                    </li>
                                </transition-group>
                            </ul>
                        </div>
                    </template>
                    <template v-else>
                        <span class="box-border" v-for="i in 4" :key="i"></span>
                        <div class="chart-title">{{ item.title }}</div>
                        <div class="chart-content" :id="item.id"></div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { Timer } from '@/utils/timer'
import { getEchartOption, pageScale } from './tools'
import { getRandom } from '@/utils/index'
import * as echarts from 'echarts'
const timer = new Timer()
const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const day = new Date().getDate()
const hour = ref(new Date().getHours())
const minute = ref(new Date().getMinutes())
const second = ref(new Date().getSeconds())
const getWeekDay = () => {
    const weekDay = new Date().getDay()
    const weekDayMap = ['日', '一', '二', '三', '四', '五', '六']
    return `星期${weekDayMap[weekDay]}`
}
const weekDay = getWeekDay()
const timeFormatter = (num) => num < 10 ? '0' + num : num
const timeOut = ref(0)
const timeNow = () => {
    hour.value = new Date().getHours()
    minute.value = new Date().getMinutes()
    second.value = new Date().getSeconds()
    timeOut.value = timer.timeout(timeNow, 1000)
}
const title = `全国各地区水果产量统计`
const date = ref(`${year}年${timeFormatter(month)}月${timeFormatter(day)}日`)
const time = computed(() => `${timeFormatter(hour.value)}:${timeFormatter(minute.value)}:${timeFormatter(second.value)}`)
timeNow()

const chartOptions = [
    {
        id: 'chart-0',
        class: 'chart-box-0',
        title: '全国水果产量构成',
        option: () => {
            const options = getEchartOption()

            options.xAxis[0].show = false
            options.yAxis[0].show = false
            options.yAxis[1].show = false
            options.dataZoom[0].show = false
            options.color = ['#8fc31f', '#f35833', '#00ccff', '#ffcc00', '#f5e965', '#a74faf', '#ff9668']
            options.tooltip = {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)",
                borderColor: 'transparent',
                backgroundColor: 'rgba(50,50,50,0.7)',
                textStyle: { color: '#fff' },
                padding: 5
            },
                options.series = [
                    {
                        name: '水果产量构成',
                        type: 'pie',
                        radius: '40%',
                        center: ['50%', '50%'],
                        data: [
                            { value: 435, name: '苹果' },
                            { value: 1794, name: '香蕉' },
                            { value: 3481, name: '菠萝' },
                            { value: 480, name: '西瓜' },
                            { value: 679, name: '橙子' },
                            { value: 848, name: '葡萄' },
                            { value: 2348, name: '草莓' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                        },
                        label: {
                            show: true,
                            formatter: '{b} : {c}吨 ({d}%)',
                            color: 'inherit'
                        },
                        labelLine: { show: true }
                    }]
            return options
        }
    },
    {
        id: 'chart-1',
        class: 'chart-box-1',
        title: '全国水果产量统计',
        table: [
            { name: '水果产量', data: getRandom(0, 10000) },
            { name: '水果合格产量', data: getRandom(0, 10000) },
            { name: '水果销量', data: getRandom(0, 10000) }
        ],
        option: () => {
            const options = getEchartOption()
            const datas = [
                { name: '水果产量', color: 'rgba(137, 189, 27, $alpha)' },
                { name: '水果合格产量', color: 'rgba(219, 50, 51, $alpha)' },
                { name: '水果销量', color: 'rgba(0, 136, 212, $alpha)' }
            ]
            options.yAxis[1].show = false
            options.dataZoom = null
            options.yAxis = [{
                type: 'value',
                splitNumber: 5,
                max: 4000,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a0a8b9'
                    }
                },
                axisLabel: {
                    margin: 10,
                    fontSize: 14
                },
                splitLine: {
                    lineStyle: {
                        color: '#2b3646'
                    }
                },
                axisTick: {
                    show: false
                }
            }]
            options.xAxis = [{
                type: 'category',
                data: (() => Array(9).fill(0).map((_, index) => `${index + 1}月`))(),
                boundaryGap: false,
                axisLabel: {
                    interval: 0,
                    fontSize: 14
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a0a8b9'
                    }
                },
                axisTick: {
                    show: false
                },
                offset: 10
            }]
            options.legend = {
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 10,
                top: '16',
                right: '10',
                data: (() => datas.map(item => item.name))(),
                textStyle: {
                    fontSize: 14,
                    color: '#a0a8b9'
                }
            }
            options.tooltip = {
                trigger: 'axis',
                formatter: (params) => {
                    var res = '';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                    }
                    return res;
                },
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: 'rgba(50,50,50,0.7)',
                borderRadius: 8,
                borderWidth: 2,
                padding: [5, 10],
                textStyle: { color: '#fff' },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                }
            }
            options.grid = {
                top: '46',
                left: '13%',
                right: '10',
                containLabel: false
            }
            options.series = (() => {
                return datas.map((item, index) => {
                    return {
                        name: item.name,
                        type: 'line',
                        data: (() => options.xAxis[0].data.map(() => getRandom(0, (4 - index) * 1000)))(),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: { width: 2, color: item.color.replace("$alpha", "1") },
                        itemStyle: { color: item.color.replace("$alpha", "1") },
                        areaStyle: {
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: item.color.replace("$alpha", "0.3") // 0% 处的颜色
                                }, {
                                    offset: 0.8, color: item.color.replace("$alpha", "0") // 100% 处的颜色
                                }]
                            }
                        },
                    }
                })
            })()
            return options
        }
    },
    {
        id: 'chart-2',
        class: 'chart-box-2',
        title: '全国水果销量统计',
        tableTitle: [{ text: '苹果', active: true }, { text: '香蕉', active: false }, { text: '西瓜', active: false }],
        table: [
            { name: '水果产量', data: Array(3).fill(0).map(() => getRandom(0, 10000)) },
            { name: '水果合格产量', data: Array(3).fill(0).map(() => getRandom(0, 10000)) },
            { name: '水果销量', data: Array(3).fill(0).map(() => getRandom(0, 10000)) }
        ],
        option: () => {
            const options = getEchartOption()
            const datas = [
                { name: '水果产量', color: 'rgba(137, 189, 27, $alpha)' },
                { name: '水果合格产量', color: 'rgba(219, 50, 51, $alpha)' },
                { name: '水果销量', color: 'rgba(0, 136, 212, $alpha)' }
            ]
            options.yAxis[1].show = false
            options.dataZoom = null
            options.yAxis = [{
                type: 'value',
                splitNumber: 5,
                max: 4000,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a0a8b9'
                    }
                },
                axisLabel: {
                    margin: 10,
                    fontSize: 14
                },
                splitLine: {
                    lineStyle: {
                        color: '#2b3646'
                    }
                },
                axisTick: {
                    show: false
                }
            }]
            options.xAxis = [{
                type: 'category',
                data: (() => Array(9).fill(0).map((_, index) => `${index + 1}月`))(),
                boundaryGap: false,
                axisLabel: {
                    interval: 0,
                    fontSize: 14
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a0a8b9'
                    }
                },
                axisTick: {
                    show: false
                },
                offset: 10
            }]
            options.legend = {
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 10,
                top: '16',
                right: '10',
                data: (() => datas.map(item => item.name))(),
                textStyle: {
                    fontSize: 14,
                    color: '#a0a8b9'
                }
            }
            options.tooltip = {
                trigger: 'axis',
                formatter: (params) => {
                    var res = '';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                    }
                    return res;
                },
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: 'rgba(50,50,50,0.7)',
                borderRadius: 8,
                borderWidth: 2,
                padding: [5, 10],
                textStyle: { color: '#fff' },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                }
            }
            options.grid = {
                top: '46',
                left: '13%',
                right: '10',
                containLabel: false
            }
            options.series = (() => {
                return datas.map((item, index) => {
                    return {
                        name: item.name,
                        type: 'line',
                        data: (() => options.xAxis[0].data.map(() => getRandom(0, (4 - index) * 1000)))(),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: { width: 2, color: item.color.replace("$alpha", "1") },
                        itemStyle: { color: item.color.replace("$alpha", "1") },
                        areaStyle: {
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: item.color.replace("$alpha", "0.3") // 0% 处的颜色
                                }, {
                                    offset: 0.8, color: item.color.replace("$alpha", "0") // 100% 处的颜色
                                }]
                            }
                        },
                    }
                })
            })()
            return options
        }
    },
    {
        id: 'chart-3',
        class: 'chart-box-3',
        title: '水果销量情况',
        table: {
            columns: [
                { title: '水果名称', prop: 'name' },
                { title: '销售总量', prop: 'total' },
                { title: '销售金额', prop: 'money' },
            ],
            data: reactive(
                [
                    { name: '苹果', total: getRandom(1000, 10000), money: getRandom(3000, 10000) },
                    { name: '香蕉', total: getRandom(1000, 10000), money: getRandom(3000, 10000) },
                    { name: '西瓜', total: getRandom(1000, 10000), money: getRandom(3000, 10000) },
                    { name: '葡萄', total: getRandom(1000, 10000), money: getRandom(3000, 10000) },
                    { name: '草莓', total: getRandom(1000, 10000), money: getRandom(3000, 10000) },
                    { name: '樱桃', total: getRandom(1000, 10000), money: getRandom(3000, 10000) },
                    { name: '橙子', total: getRandom(1000, 10000), money: getRandom(3000, 10000) },
                    { name: '菠萝', total: getRandom(1000, 10000), money: getRandom(3000, 10000) },
                ]
            )
        }
    },
    {
        id: 'chart-4',
        class: 'chart-box-4',
        title: '水果销量统计',
        option: () => {
            const datas = { name: '水果销量', types: ['bar', 'line'] }
            const options = getEchartOption()
            options.yAxis[1].show = false
            options.dataZoom = null
            options.color = ['#c23531']
            options.grid = {
                top: '40',
                left: '10%',
                right: '10',
                containLabel: false
            }
            options.tooltip = {
                trigger: "axis",
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: 'rgba(50,50,50,0.7)',
                borderRadius: 8,
                borderWidth: 2,
                padding: [5],
                formatter: function (params) {
                    return `<div><span>${params[0].seriesName}</span><div>${params[0].axisValueLabel}：${params[0].data
                        }</div></div>`
                },
                textStyle: { color: '#fff' },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                }
            }
            options.yAxis = [
                {
                    type: 'value',
                    splitNumber: 5,
                    max: 5000,
                    axisTick: { show: false },
                    splitLine: { show: false },
                    splitArea: { show: false },
                    axisLabel: { color: '#9faeb5', fontSize: 16, },
                    axisLine: { show: true, lineStyle: { width: 2, color: '#4d4d4d' } }
                }
            ]
            options.xAxis = [
                {
                    axisTick: { show: false },
                    splitLine: { show: false },
                    splitArea: { show: false },
                    axisLabel: { fontSize: 14, fontWeight: 100, color: '#9faeb5' },
                    interval: 0,
                    data: (() => Array(9).fill(0).map((_, index) => `${index + 1}月`))(),
                }
            ]
            options.series = (() => {
                const itemStyle = {
                    borderRadius: 15,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#00d386' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#0076fc' // 100% 处的颜色
                        }]
                    }
                }
                const seriesData = (() => options.xAxis[0].data.map(() => getRandom(500, 5000)))()
                return datas.types.map(item => {
                    const series = {
                        type: item,
                        name: item === 'bar' ? datas.name : '',
                        itemStyle: item === 'bar' ? itemStyle : null,
                        label: item === 'bar' ? { show: true, position: 'top', color: '#fff', fontSize: 10 } : { show: false },
                        data: seriesData,
                        barWidth: 16,
                    }
                    return series
                })
            })()
            return options
        }
    },
    {
        id: 'chart-5',
        class: 'chart-box-5',
        title: '水果销量统计',
        option: () => {
            const datas = { name: '水果销量', types: ['bar', 'line'] }
            const options = getEchartOption()
            options.yAxis[1].show = false
            options.dataZoom = null
            options.color = ['#4a4df0', '#c7b198']
            options.grid = {
                top: '40',
                left: '10%',
                right: '10',
                containLabel: false
            }
            options.legend = {
                right: '24',
                top: "10",
                itemWidth: 8,
                itemHeight: 12,
                textStyle: { color: '#fff', fontSize: 14 },
                data: ['水果销量'],
            }
            options.tooltip = {
                trigger: "axis",
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: 'rgba(50,50,50,0.7)',
                borderRadius: 8,
                borderWidth: 2,
                padding: [5],
                formatter: function (params) {
                    return `<div><span>${params[0].seriesName}</span><div>${params[0].axisValueLabel}：${params[0].data
                        }</div></div>`
                },
                textStyle: { color: '#fff' },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                }
            }
            options.yAxis = [
                {
                    type: 'value',
                    max: 7000,
                    axisTick: { show: false },
                    splitLine: { show: false },
                    splitArea: { show: false },
                    axisLabel: { color: '#9faeb5', fontSize: 14, },
                    axisLine: { show: true, lineStyle: { width: 2, color: '#4d4d4d' } }
                }
            ]
            options.xAxis = [
                {
                    axisTick: { show: false },
                    splitLine: { show: false },
                    splitArea: { show: false },
                    axisLabel: { fontSize: 14, fontWeight: 100, color: '#9faeb5' },
                    interval: 0,
                    data: ['苹果', '香蕉', '橙子', '菠萝', '西瓜', '葡萄', '草莓', '樱桃', '梨子'],
                }
            ]
            options.series = (() => {
                const seriesData = (() => options.xAxis[0].data.map(() => getRandom(500, 7000)))()
                return datas.types.map(item => {
                    const series = {
                        type: item,
                        name: item === 'bar' ? datas.name : '',
                        label: item === 'bar' ? { show: true, position: 'top', color: '#fff', fontSize: 10 } : { show: false },
                        data: seriesData,
                        barWidth: 16,
                    }
                    return series
                })
            })()
            return options
        }
    },
    {
        id: 'chart-6',
        class: 'chart-box-6',
        title: '水果销量统计',
        option: () => {
            const datas = { name: '水果销量', types: ['bar', 'line'] }
            const options = getEchartOption()
            options.yAxis[1].show = false
            options.dataZoom = null
            options.color = ['#ff2600', '#ffc000', '#00ad4e', '#0073c2', '#165868', '#e76f00', '#316194', '#723761', '#00b2f1', '#4d6022', '#4b83bf', '#f9c813', '#0176c0']
            options.grid = {
                top: '40',
                left: '10%',
                right: '10',
                containLabel: false
            }
            options.tooltip = {
                trigger: "axis",
                backgroundColor: 'rgba(50,50,50,0.7)',
                borderColor: 'rgba(50,50,50,0.7)',
                borderRadius: 8,
                borderWidth: 2,
                padding: [5],
                formatter: function (params) {
                    return `<div><span>${params[0].seriesName}</span><div>${params[0].axisValueLabel}：${params[0].data
                        }</div></div>`
                },
                textStyle: { color: '#fff' },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                }
            }
            options.yAxis = [
                {
                    type: 'value',
                    splitNumber: 5,
                    max: 6000,
                    axisTick: { show: false },
                    splitLine: { show: false },
                    splitArea: { show: false },
                    axisLabel: { color: '#9faeb5', fontSize: 14, },
                    axisLine: { show: false }
                }
            ]
            options.xAxis = [
                {
                    axisTick: { show: false },
                    splitLine: { show: false },
                    splitArea: { show: false },
                    axisLine: { show: false },
                    axisLabel: { fontSize: 14, fontWeight: 100, color: '#9faeb5' },
                    interval: 0,
                    data: ['苹果', '香蕉', '橙子', '菠萝', '西瓜', '葡萄', '草莓', '樱桃', '梨子'],
                }
            ]
            options.series = (() => {
                const seriesData = (() => options.xAxis[0].data.map(() => getRandom(500, 5000)))()
                return datas.types.map(item => {
                    const series = {
                        type: item,
                        name: item === 'bar' ? datas.name : '',
                        label: item === 'bar' ? { show: true, position: 'top', color: '#fff', fontSize: 10 } : { show: false },
                        itemStyle: item === 'bar' ? { color: (params) => options.color[params.dataIndex] } : null,
                        lineStyle: { color: '#d3d5fd' },
                        data: seriesData,
                        barWidth: 16,
                    }
                    return series
                })
            })()
            return options
        }
    }
]
const initChart = (id, option) => {
    const chartDom = document.getElementById(id)
    const instance = echarts.getInstanceByDom(chartDom)
    if (instance) {
        instance.setOption(option, { notMerge: true })
    } else {
        const myChart = echarts.init(chartDom)
        myChart.setOption(option)
    }
}
const resizeCharts = () => {
    for (const item of chartOptions) {
        if (item.option) {
            const chartDom = document.getElementById(item.id)
            const instance = echarts.getInstanceByDom(chartDom)
            instance && instance.resize()
        }
    }
}
const chartIndex = ref(0)
const chartUpdate = (_index) => {
    const index = 2
    chartIndex.value = _index
    chartOptions[index].tableTitle.forEach((item, i) => {
        item.active = i === _index
    })
    initChart(chartOptions[index].id, chartOptions[index].option())
}
const tableUpdate = () => {
    const index = 3
    const table = chartOptions[index].table.data
    const first = 0
    const firstItem = table[first]
    const last = table.length - 1
    table.splice(first, 1)
    table.splice(last, 1, firstItem)
}
const numberFormatter = (num, unit) => {
    num = num.toLocaleString() + unit
    return num
}
const timeInterval = timer.interval(() => {
    chartIndex.value++
    if (chartIndex.value > 2) {
        chartIndex.value = 0
    }
    chartUpdate(chartIndex.value)
    tableUpdate()
}, 3000)

onMounted(() => {
    for (const item of chartOptions) {
        const option = item.option && item.option()
        if (option) {
            initChart(item.id, option)
        }
    }
    window.addEventListener('resize', pageScale(document.querySelector('.screen-page'), resizeCharts))
})
onBeforeUnmount(() => {
    timer.clear(timeOut.value)
    timer.clear(timeInterval)
    window.removeEventListener('resize', pageScale(document.querySelector('.screen-page'), resizeCharts))
})
</script>
<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}

.list-leave-active {
    position: absolute;
}

.transition-box {
    position: relative;
}

.screen-page {
    width: 100%;
    position: relative;
    background-color: #081325;
    background-image: url("../../assets/images/screen-bg.png");
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0 20px;

    .screen-header {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 80px;
        align-items: center;
        box-sizing: border-box;
        align-items: end;

        .title {
            color: #fff;
            text-align: center;
            padding-bottom: 20px;
            font-size: 24px;
        }

        .date {
            text-align: center;
        }

        .time {
            text-align: center;
        }

        .date,
        .time {
            color: #fff;
            font-size: 20px;
            background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#5ec0d2));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    .screen-chart-container {
        width: 100%;
        position: relative;

        .chart-container {
            width: 100%;
            display: grid;
            gap: 10px;

            &.container-1 {
                margin-top: 25px;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: 360px;
            }

            &.container-2 {
                margin-top: 10px;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(2, 360px);

                .chart-table {
                    width: 100%
                }

            }

            .chart-box {
                flex: 1;
                padding: 16px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
            }

            .chart-title {
                color: #1bb4f9;
                font-size: 16px;
                padding: 0;
                width: 100%;
                text-align: left;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .table-title {
                    span {
                        color: #82849d;
                        padding: 2px 10px;
                        cursor: pointer;

                        &.active {
                            color: #fff;
                            background-color: #417b95;
                            border-radius: 4px;
                            ;
                        }
                    }
                }
            }

            .chart-table {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: 44px;
                border: 1px solid #1f4191;
                margin: 10px 0 20px 0;
                padding: 4px 0;
                box-sizing: border-box;
                background-image: url("../../assets/images/table-bg.jpg");
                background-position: 0 0;
                background-repeat: no-repeat;
                background-size: 100% 100%;

                .table-item {
                    display: flex;
                    gap: 2px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    border-right: solid 1px #1f4191;
                    font-size: 14px;

                    &:last-child {
                        border-right: none;
                    }

                    .item-name {
                        color: #1bb9f9;
                    }

                    .item-data {
                        color: #fff;
                    }
                }
            }

            .chart-content {
                width: 100%;
                height: 100%;

            }

            .chart-box {
                background: url("../../assets/images/chart-bg-1.jpg");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                position: relative;

                span.box-border {
                    position: absolute;
                    width: 13px;
                    height: 13px;
                    display: block;

                    &:nth-child(1) {
                        left: 0;
                        top: 0;
                        border-left: 2px solid #045291;
                        border-top: 2px solid #045291;
                    }

                    &:nth-child(2) {
                        top: 0;
                        right: 0;
                        border-right: 2px solid #045291;
                        border-top: 2px solid #045291;
                    }

                    &:nth-child(3) {
                        right: 0;
                        bottom: 0;
                        border-right: 2px solid #045291;
                        border-bottom: 2px solid #045291;
                    }

                    &:nth-child(4) {
                        left: 0;
                        bottom: 0;
                        border-left: 2px solid #045291;
                        border-bottom: 2px solid #045291;
                    }
                }

                .data-table {
                    width: 100%;
                    height: 100%;
                    position: relative;

                    .table-title {
                        color: #1bb4f9;
                        font-size: 16px;
                        padding-bottom: 20px;
                        width: 100%;
                        text-align: left;
                    }

                    .table-header {
                        color: #1b96ee;
                        font-size: 14px;
                        font-weight: 500;
                        padding: 10px 20px;
                        border-bottom: 1px solid #1b96ee;
                        display: grid;
                        grid-template-columns: 2fr 1fr 1fr;
                    }

                    .table-content {
                        padding: 10px 20px;
                        width: 100%;
                        height: 220px;
                        list-style-type: none;
                        overflow: hidden;

                        li {
                            display: grid;
                            grid-template-columns: 2fr 1fr 1fr;

                            span {
                                padding: 10px 0;
                                color: #76dbd1;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>