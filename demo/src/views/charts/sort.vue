<template>
    <div class="chart-sort">
        <div class="sort-container" v-loading="loading">
            <div class="sort-header">
                <el-select v-model="selectValue" placeholder="请选择排序方法" @change="selectChange">
                    <el-option v-for="item in sorts" :key="item.name" :lable="item.name" :value="item.value">{{ item.name }}</el-option>
                </el-select>
            </div>
            <div class="sort-content" ref="chartContent">

            </div>
        </div>
    </div>
</template>
<script setup>
import { ElSelect, ElOption, ElButton } from 'element-plus'
import { debounce, getRandom } from '@/utils/index'
import { getEchartOption } from './tools'
import { ref, reactive, watch, computed, onUnmounted, onMounted } from 'vue'
import { useThemeStore } from '@/store/useThemeStore'
import * as echarts from 'echarts'

const loading = ref(false)
const chartContent = ref(null)
const chartOptions = getEchartOption()
const selectValue = ref('冒泡排序')
const sorts = [
    {
        name: '冒泡排序',
        value: 1
    },
    {
        name: '选择排序',
        value: 2
    },
    {
        name: '插入排序',
        value: 3
    },
    {
        name: '快速排序',
        value: 4
    }
]

const selectChange = (val)=>{
    console.log(val)
}

const setData = (count = 15) => {
    const list = []
    for (let i = 0; i < count; i++) {
        list.push(getRandom())
    }
    return list
}
const setChartOptions = () => {
    const themeStore = useThemeStore()
    const color = themeStore.theme === 'dark' ? '#adbac7' : '#333'

    chartOptions.yAxis[0].axisLabel.color = color
    chartOptions.yAxis[1].axisLabel.color = color
    chartOptions.xAxis[0].axisLabel.color = color
    chartOptions.legend.textStyle.color = color
    chartOptions.dataZoom = null
    chartOptions.tooltip.padding = 10
    chartOptions.tooltip.backgroundColor = '#fff'
    chartOptions.yAxis[1].show = false
}


const initChart = (data) => {
    const chartInstance = echarts.getInstanceByDom(chartContent.value)
    if (!chartInstance) {
        chartOptions.xAxis[0].data = data
        chartOptions.series = [{
            name: 'random',
            type: 'bar',
            data: data,
            barWidth: '25',
            barGap: '10%'
        }]
        const myChart = echarts.init(chartContent.value)
        myChart.setOption(chartOptions)
    } else {
        chartOptions.series[0].data = data
        chartInstance && chartInstance.setOption(chartOptions)
    }
}

function sleep(ms) {
    let p = new Promise(resolve => {
        let t = setTimeout(() => {
            resolve()
            clearTimeout(t)
            t = null
            p = null
        }, ms)
    })
    return p
}

//冒泡排序
async function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                //[arr[j],arr[j+1]] = [arr[j+1],arr[j]]
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                //延迟
                await sleep(1000);
                initChart(arr)
            }
        }
    }
    initChart(arr)
    return arr;
}
let count = 0
//选择排序
async function selectionSort(arr) {
    let len = arr.length;
    let minIndex, temp;
    for (let i = 0; i < len - 1; i++) {
        count++
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }

        //[arr[i],arr[minIndex]] = [arr[minIndex],[arr[i]]]
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        await sleep(1000);
        if (count === arr.length - 1) {
            console.log('success')
        }
        initChart(arr);
    }
    initChart(arr)
    return arr;
}

//插入排序
async function insertionSort(arr) {
    let len = arr.length;
    let preIndex, current;
    for (let i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
        await sleep(1000);
        initChart(arr);
    }
    initChart(arr);
    return arr;
}

//快速排序
async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let partitionIndex = await partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}
//快速排序分割方法
async function partition(arr, left, right) {
    let pivot = left;
    let index = pivot + 1;
    for (let i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            [arr[i], arr[index]] = [arr[index], arr[i]];
            index++;
            await sleep(1000)
            initChart(arr)
        }
    }
    [arr[pivot], arr[index - 1]] = [arr[index - 1], arr[pivot]];

    initChart(arr)
    return index - 1;
}

const data = setData()

onMounted(() => {

    setChartOptions()
    //bubbleSort(data)
    //selectionSort(data)
    //insertionSort(data)
    //quickSort(data)
    //mergeSort(data)
})
</script>
<style lang="scss" scoped>
.chart-sort {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding: 10px;

    .sort-container {
        background-color: var(--theme-page-background);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .sort-header {
            width: 100%;
            height: 120px;
            background-color: bisque;
        }

        .sort-content {
            flex: 1;
            width: 100%;
        }
    }
}
</style>