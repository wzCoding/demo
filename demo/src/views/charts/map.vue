<template>
    <div class="map map-page" v-loading="loading">
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
import { ref, computed } from 'vue'
import { getData } from '@/utils/service'
import EButton from '@/components/Button'
import * as echarts from 'echarts/core'
import { MapChart } from 'echarts/charts'
import { DatasetComponent, GeoComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    MapChart,
    DatasetComponent,
    GeoComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
])

const loading = ref(true)
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
    if (loading.value) return
    const lastIndex = area.value.length - 1
    area.value.splice(lastIndex, 1)
    if (area.value.length === 0) {
        reset()
        return
    }
    const backIndex = area.value.length - 1
    const backAdcode = area.value[backIndex].adcode
    loading.value = true
    getData(backAdcode, dataType).then(res => {
        loading.value = false
        initChart(backAdcode, res)
    })
}
const reset = () => {
    if (loading.value) return
    area.value = []
    loading.value = true
    getData(mapId.value, dataType).then(res => {
        loading.value = false
        initChart(mapId.value, res)
    })
}
const handleChartClick = (params) => {
    if (loading.value) return
    const { adcode, name, level, hasChildren } = params.data
    if (!hasChildren) return
    loading.value = true
    getData(adcode, dataType).then(res => {
        loading.value = false
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
    loading.value = false
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