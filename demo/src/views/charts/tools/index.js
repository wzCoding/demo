import { debounce } from "@/utils/index"
import { onMounted, onUnmounted } from "vue"
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
//echart公共配置
function getEchartOption(options = {}) {
    const chartOptions = {
        legend: {
            show: true,
            itemWidth: 20,
            itemHeight: 12,
            textStyle: { color: '#333' },
            bottom: '10%',
            data: []
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            confine: true,
            padding:0,
            borderWidth:0,
            borderRadius:4,
            backgroundColor:'unset',
            axisPointer: {
                type: 'shadow'
            }
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                start: 0,
                end: 10,
                xAxisIndex: [0],
                bottom: '5%',
                height: 16,
                handleSize: 0,
                zoomLock: true
            }
        ],
        grid: {
            top: '10%',
            left: '1%',
            right: '1%',
            bottom: '20%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                show: true,
                data: [],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    color: '#333',
                },
                axisLine: {
                    lineStyle: { color: 'transparent' }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: true,
                axisLabel: {
                    color: '#333',
                }
            },
            {
                type: 'value',
                show: true,
                min: 0,
                max: 100,
                interval: 20,
                splitLine: {
                    lineStyle: {
                        color: ['#ccc']
                    }
                },
                axisLabel: {
                    color: '#333',
                    formatter: function (value) {
                        return value + '%';
                    }
                }
            }
        ],
        series: []
    }

    return chartOptions
}
//页面缩放
function pageScale(el, callback) {
    const scale = () => {
        //获取元素的宽高
        const targetWidth = el.clientWidth || 1920
        const targetHeight = el.clientHeight || 1080
        //计算元素宽高比
        const targetRatio = targetWidth / targetHeight || 16 / 9

        //获取当前页面宽高
        const rootWidth = document.documentElement.clientWidth || document.body.clientWidth
        const rootHeight = document.documentElement.clientHeight || document.body.clientHeight

        //默认用宽度计算缩放比例
        let scaleRatio = targetWidth / rootWidth

        //计算页面宽高比
        const currentRatio = rootWidth / rootHeight

        //设置缩放样式
        let scaleStyle = `width:${targetWidth}px;height:${targetHeight}px;`
        if (currentRatio > targetRatio) {
            //当前页面宽高比大于目标宽高比，说明页面过宽，需要通过缩小高度来适应
            scaleRatio = targetHeight / rootHeight
            scaleStyle += `transform: scale(${scaleRatio}) translateX(-50%); left: 50%;`
        } else {
            //当前页面宽高比小于目标宽高比，说明页面过高，需要通过缩小宽度来适应
            scaleRatio = targetWidth / rootWidth
            scaleStyle += `transform: scale(${scaleRatio});`
        }
        callback && callback(scaleRatio)
    }
    scale()
    const resize = debounce(scale, 300)
    return resize
}
export {
    getMapData,
    getEchartOption,
    pageScale
}