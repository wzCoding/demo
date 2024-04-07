<template>
    <div class="map map-page">
        <div class="map-info">
            <div class="info-left">{{ mapInfo }}</div>
            <div class="info-right">
                <e-button size="default" type="primary" @click="back">返回</e-button>
                <e-button size="default" type="primary" @click="reset">重置</e-button>
            </div>
        </div>
        <div class="map-box"></div>
    </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { getData } from '@/utils/service'
import * as echarts from 'echarts'
import EButton from '@/components/Button'

const dataType = 'map'
const mapId = ref('china')
const mapInfo = computed(() => {
    let path = '全国地图'
    if (area.value && area.value.length) {
        path = area.value.map(item => item.name).join('/')
    }
    return `当前地图：${path}`
})
const area = ref([])
const back = () => {
    if (!area.value.length) return
    const lastIndex = area.value.length - 1
    area.value.splice(lastIndex, 1)
    if (area.value.length === 0) {
        reset()
        return
    }
    const backIndex = area.value.length - 1
    const backAdcode = area.value[backIndex].adcode
    getData(backAdcode, dataType).then(res => {
        initChart(backAdcode, res)
    })
}
const reset = () => {
    area.value = []
    getData(mapId.value, dataType).then(res => {
        initChart(mapId.value, res)
    })
}
const handleChartClick = (params) => {
    const { adcode, name, level, hasChildren } = params.data
    if (!hasChildren) return
    getData(adcode, dataType).then(res => {
        area.value.push({ name, adcode, level })
        initChart(adcode, res)
    })
}
const handleMapData = (data) => {
    const dimensions = ['name', 'value', 'hasChildren']
    const source = data.features.map(item => {
        return {
            name: item.properties.name,
            value: Math.round(Math.random() * 100),
            adcode: item.properties.adcode,
            level: item.properties.level,
            center: item.properties.center,
            parent: item.properties.parent || null,
            hasChildren: item.properties.adcode < 142000 && item.properties.level !== 'district',
        }
    })
    return { dimensions, source }
}
const regionStyle = (data) => {
    const colorList = ['#fcd3d3', '#d1edc4', '#c6e2ff', '#79bbff']
    return data.map((item, index) => {
        return {
            name: item.name,
            itemStyle: {
                borderWidth: 0.5,
                borderColor: '#337ecc',
                areaColor: item.hasChildren ? colorList[index] : '#ecf5ff',
            }
        }
    })
}
const initChart = (mapId, data) => {
    const { dimensions, source } = handleMapData(data)
    const options = {
        dataset: { dimensions, source },
        geo: [
            {
                map: mapId,
                regions: regionStyle(source),
                zoom: 3,
                roam: true,
                selectedMode: 'single',
                layoutCenter: ['40%', '100%'],
                layoutSize: '100%',
                scaleLimit: {
                    min: 1.2,
                    max: 6
                },
                label: {
                    show: true,
                    color: '#333',
                    fontSize: 12,
                    fontWeight: 400,
                },
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10
            },
        ],
        series: [
            {
                name: mapId,
                type: 'map',
                geoIndex: 0,
                map: mapId,
            }
        ]
    }

    echarts.registerMap(mapId, { geoJSON: data })
    const chartDom = document.querySelector('.map-box')
    const instance = echarts.getInstanceByDom(chartDom)
    if (instance) {
        instance.setOption(options, { notMerge: true, lazyUpdate: true })
    } else {
        const myChart = echarts.init(chartDom)
        myChart.setOption(options)
        myChart.on('click', handleChartClick)
    }
}
getData(mapId.value, dataType).then(res => {
    initChart(mapId.value, res)
})
// onMounted(() => {
//     initChart('china')
// })
// onBeforeUnmount(() => { })

</script>
<style lang="scss" scoped>
.map-page {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .map-info {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .info-left {
            font-size: 16px;
            font-weight: 500;
            color: #333;
        }

        .info-right {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;
        }
    }

    .map-box {
        width: 100%;
        flex: 1;
    }
}
</style>