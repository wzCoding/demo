<template>
    <div class="chart-sort">
        <div class="sort-container" v-loading="loading">
            <div class="sort-header">
                <el-select v-model="selectValue" placeholder="请选择排序方法" :disabled="disabled" @change="selectChange">
                    <el-option v-for="item in sorts" :key="item" :value="item">{{ item }}</el-option>
                </el-select>
            </div>
            <div class="sort-content" ref="chartContent"></div>
        </div>
    </div>
</template>
<script setup>
import { ElSelect, ElOption, ElButton } from 'element-plus'
import { getRandom } from '@/utils/index'
import { getEchartOption } from './tools'
import { ref, reactive, watch, onMounted } from 'vue'
import { useThemeStore } from '@/store/useThemeStore'
import * as echarts from 'echarts'

const loading = ref(false)
const chartContent = ref(null)
const chartOptions = getEchartOption()
const chartInstance = ref(null)
const selectValue = ref('冒泡排序')
const sorts = ['冒泡排序', '选择排序', '插入排序', '快速排序']
const data = reactive(setData(10))
const counter = ref(0)
const disabled = ref(true)
const delay = 500
const selectChange = (val) => {
    disabled.value = true
    chartInstance.value.clear()
    const clone = JSON.parse(JSON.stringify(data))
    switch (val) {
        case '冒泡排序':
            bubbleSort(clone)
            break;
        case '选择排序':
            selectionSort(clone)
            break;
        case '插入排序':
            insertionSort(clone)
            break;
        case '快速排序':
            quickSort(clone)
            break;
        default: bubbleSort(clone)
    }
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
    chartInstance.value = echarts.getInstanceByDom(chartContent.value)
    if (!chartInstance.value) {
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
        chartInstance.value && chartInstance.value.setOption(chartOptions)
    }
}


function setData(count = 15) {
    const list = []
    for (let i = 0; i < count; i++) {
        list.push(getRandom())
    }
    return list
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
                await sleep(delay);
                initChart(arr)
            }
        }
        counter.value++
        if (counter.value == len - 1) {
            counter.value = 0
            disabled.value = false
        }
    }
    initChart(arr)
    return arr;
}
//选择排序
async function selectionSort(arr) {
    let len = arr.length;
    let minIndex, temp;
    for (let i = 0; i < len - 1; i++) {
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

        await sleep(delay);
        initChart(arr)

        counter.value++
        if (counter.value == len - 1) {
            counter.value = 0
            disabled.value = false
        }
    }
    initChart(arr)
    return arr;
}

//插入排序
async function insertionSort(arr) {
    let len = arr.length;
    let preIndex, current;
    for (let i = 1; i < len; i++) {
        //从最后往前
        preIndex = i - 1;
        //取当前起始值
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            //当前一个值大于当前值，就将前一个值与当前值交换
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
        await sleep(delay);
        initChart(arr);
    }
    initChart(arr);
    return arr;
}

//快速排序
async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        //将数组分割，堆每个部分进行快速排序
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
    //遍历分割后的每个部分，进行大小比较并交换比较后的值
    for (let i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            [arr[i], arr[index]] = [arr[index], arr[i]];
            index++;
            await sleep(delay)
            initChart(arr)
        }
    }
    [arr[pivot], arr[index - 1]] = [arr[index - 1], arr[pivot]];

    initChart(arr)
    return index - 1;
}

onMounted(() => {
    setChartOptions()
    const clone = JSON.parse(JSON.stringify(data))
    bubbleSort(clone)
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
            height: 80px;
        }

        .sort-content {
            flex: 1;
            width: 100%;
        }
    }
}
</style>