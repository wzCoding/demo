import { deepClone } from "@/utils/index"
async function getMapData(code) {
    if (!code) return
    const url = `https://geojson.cn/api/data/${code}.topo.json`
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    //返回Stream流数据
    const result = await fetch(url, options)
    //读取流数据
    const read = await result.body.getReader().read()
    const decoder = new TextDecoder('utf-8')
    const data = decoder.decode(read.value, { stream: true })
    //json数据太大（>=300kb），解析会偶发性报错
    return JSON.parse(data)
}
const chartOptions = {
    color: ['#409eff'],
    tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '消耗量',
            type: 'bar',
            barWidth: '20',
            data: []
        }
    ]
}
function getChartOptions(data = {}) {
    const options = deepClone(chartOptions)
    data.forEach(item => {
        if(data.color) options.color = data.color
        if(data.series){
            
        }
    })
    return options
}
export {
    getMapData,
    getChartOptions
}