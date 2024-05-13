<template>
    <div class="chart-page" v-loading="loading">
        <div class="chart-container">
            <div class="chart-box">
                <div class="chart-title">全国各地区水果产量统计图（单位：吨）</div>
                <div class="chart-content" id="chart-1"></div>
            </div>
        </div>
        <div class="table-container">
            <div class="table-title">
                <span>全国各地区水果产量统计表（单位：吨）</span>
                <el-button @click="exportData">导出</el-button>
            </div>
            <el-table header-cell-class-name="header-cell" :data="pageData" border stripe lazy row-key="adcode"
                :cell-class-name="handleCellClass" :empty-text="emptyText" :height="tableHeight"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :load="loadData"
                @cell-click="handleCellClick">
                <el-table-column v-for="column in tableColumns" :key="column.prop" :prop="column.prop"
                    :label="column.label" :align="column.align" :width="column.width ? column.width : ''"
                    :formatter="formatterCellValue" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="table-pagination">
                <ElConfigProvider :locale="locale">
                    <el-pagination :hide-on-single-page="false" :background="true" :current-page="currentPage"
                        :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="total"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </ElConfigProvider>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ElButton, ElTable, ElTableColumn, ElPagination, ElMessage, ElConfigProvider } from 'element-plus'
import { getData } from '@/utils/service'
import { getRandom } from '@/utils/index'
import { getEchartOption } from './tools'
import { ref, reactive, computed } from 'vue'
import { ElMapExportTable } from 'table-excel'
import * as echarts from 'echarts'
ElMessage({
    message: '本页面所有数据均为随机虚构，如有雷同，纯属巧合！',
    type: 'info',
    showClose: true,
    duration: 3000,
})
const locale = {
    name: 'zh-cn',
    el: {
        pagination: {
            "goto": "前往",
            "pagesize": "条/页",
            "total": "共 {total} 条",
            "pageClassifier": "页",
            "page": "页",
            "prev": "上一页",
            "next": "下一页",
            "currentPage": "第 {pager} 页",
            "prevPages": "向前 {pager} 页",
            "nextPages": "向后 {pager} 页"
        }
    }
}
let myChart = null
const loading = ref(true)
const dataType = 'map'
const defaultSize = 8
const layout = ref('total, sizes, prev, pager, next, jumper')
const currentPage = ref(1)
const pageSize = ref(defaultSize)
const mapId = ref('china')
const emptyText = ref('暂无数据')
const tableData = ref([])
const pageData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = currentPage.value * pageSize.value
    return tableData.value.slice(start, end)
})
const total = computed(() => tableData.value.length)
const pageSizes = computed(() => [defaultSize, defaultSize * 2, defaultSize * 3, tableData.value.length])
const tableHeight = computed(() => (Math.min(pageData.value.length, defaultSize) + 1) * 39.8)
const tableColumns = reactive([
    { prop: 'name', label: '省份/直辖市', align: 'left' },
    { prop: 'apple', label: '苹果', align: 'right', chartType: 'bar', color: '#e44812' },
    { prop: 'banana', label: '香蕉', align: 'right', chartType: 'bar', color: '#e7df36' },
    { prop: 'orange', label: '橙子', align: 'right', chartType: 'bar', color: '#e7ad36' },
    { prop: 'grape', label: '葡萄', align: 'right', chartType: 'bar', color: '#916ad7' },
    { prop: 'passrate', label: '合格率', align: 'right', chartType: 'line', color: '#409eff' }
])
const tooltipFormatter = (params) => {
    let startElement = `<div class='chart-tooltip'><div class='chart-tooltip-title'>${params[0].axisValueLabel}</div>`
    const endElement = `</div>`
    params.forEach(item => {
        const { color, seriesName, seriesType } = item
        const data = seriesType === 'line' ? item.data + '%' : item.data.toLocaleString()
        const content = `<div class='chart-tooltip-item'><div class='chart-tooltip-desc'><div class='${seriesType}-icon' style='--color:${color}'></div><div>${seriesName}</div></div><div class='chart-tooltip-data'>${data}</div></div>`
        startElement += content
    })
    return startElement + endElement
}

const handleChartData = (data) => {
    const legend = []
    const series = []
    const xAxis = []
    tableColumns.forEach(column => {
        if (column.chartType) {
            legend.push(column.label)
            series.push({
                name: column.label,
                prop: column.prop,
                type: column.chartType ? column.chartType : 'bar',
                yAxisIndex: Number(column.chartType === 'line'),
                barWidth: '20',
                data: [],
                itemStyle: {
                    color: column.color
                }
            })
        }
    })

    data.forEach(item => {
        xAxis.push(item.name)
        series.forEach(serie => {
            serie.data.push(item[serie.prop])
        })
    })
    return { xAxis, series, legend }
}
const initChart = (data) => {
    if (!myChart) {
        myChart = echarts.init(document.getElementById('chart-1'))
    }
    const { xAxis, series, legend } = handleChartData(data)
    const chartOptions = getEchartOption()
    chartOptions.tooltip.formatter = tooltipFormatter
    chartOptions.legend.data = legend
    chartOptions.xAxis[0].data = xAxis
    chartOptions.series = series
    chartOptions.dataZoom[0].show = xAxis.length > 6
    chartOptions.dataZoom[0].end = (6 / xAxis.length) * 100
    myChart.setOption(chartOptions)
}
const handleTableData = (data) => {
    const result = data.features.map(item => {
        const { adcode = '', level = '', name = '', childrenNum = 0 } = item.properties
        const obj = { adcode, level }
        obj.hasChildren = childrenNum > 0 && adcode < 150000
        for (const column of tableColumns) {
            if (column.prop === 'name') {
                obj[column.prop] = name
            } else if (column.prop !== 'passrate') {
                obj[column.prop] = getRandom(0, 100000) > 90000 ? 0 : getRandom(0, 100000)
            } else {
                obj.passrate = getRandom(0, 100)
            }
        }
        if (!obj.adcode) obj.adcode = name
        return obj
    })
    initChart(result)
    return result
}

const handleSizeChange = (val) => {
    pageSize.value = val
}
const handleCurrentChange = (val) => {
    currentPage.value = val
}
const handleCellClass = ({ columnIndex, row, column }) => {
    if (columnIndex > 0) {
        return row[column.property] === 0 ? 'cell-zero' : 'cell-not-zero'
    }
    return 'name-cell'
}
const formatterCellValue = (row, column, cellValue, index) => {
    if (column.property !== 'name') {
        cellValue = cellValue.toLocaleString()
    }
    if (column.property === 'passrate') {
        cellValue = cellValue + '%'
    }
    return cellValue
}
const handleCellClick = (row, column, cell) => {
    if (cell.columnIndex === 0) return
}
const loadData = async (row, treeNode, resolve) => {
    const { adcode } = row
    const res = await getData(adcode, dataType)
    const tableData = handleTableData(res)
    row.children = tableData
    resolve(tableData)
}
const exportData = () => {
    const sheetTitle = '全国各地区水果产量统计表（单位：吨）' + new Date().toLocaleString()
    const column = tableColumns.map(col => {
        return {
            title: col.label,
            dataIndex: col.prop
        }
    })
    const getExportData = (data) => {
        if (!data || !data.length) return []
        return data.map(item => {
            const rowObj = {
                children: getExportData(item.children)
            }
            tableColumns.forEach(column => {
                rowObj[column.prop] = item[column.prop]
            })
            return rowObj
        })
    }

    const sheetData = getExportData(tableData.value)
    const instance = new ElMapExportTable({
        column: column,
        data: sheetData,
        treeNode: true,
        treeField: "name",
    },
        {
            indentSize: 2,
        })
    instance.download(sheetTitle)

}
getData(mapId.value, dataType).then(res => {
    tableData.value = handleTableData(res)
    loading.value = false
})
</script>
<style lang="scss" scoped>
.chart-page {
    width: 100%;
    min-height: 100%;
    padding: 1rem;
    box-sizing: border-box;

    .chart-container {
        width: 100%;

        .chart-title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
        }

        .chart-content {
            width: 100%;
            height: 280px;
        }
    }

    .table-container {
        width: 100%;

        .table-title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;

            span {
                font-size: 16px;
                font-weight: bold;
                color: #333;
            }
        }

        .table-pagination {
            display: flex;
            justify-content: flex-end;
            margin-top: 0.5rem;
        }
    }
}
</style>
<style lang="scss">
.el-table {
    color: #333;
    transition: height var(--transition-time) ease;
}

.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
    background-color: #ecf5ff;
}

.header-cell {
    background-color: #f5f5f5 !important;
    color: #333;
    font-weight: bold;
}

.name-cell .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #409eff;
    text-decoration: underline;
    cursor: pointer;
}

.chart-tooltip {

    padding: 0 5px;
    color: #333;

    .chart-tooltip-title {
        font-weight: 600;
        padding: 4px 0;
    }

    .chart-tooltip-item {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        min-width: 120px;

        .chart-tooltip-desc {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .bar-icon {
                width: 20px;
                height: 12px;
                border-radius: 3px;
                background-color: var(--color);
                margin: 1px 4px 0 0;
            }

            .line-icon {
                width: 10px;
                height: 10px;
                box-sizing: border-box;
                border-radius: 50%;
                border: 2px solid var(--color);
                margin: 1px 8px 0 4px;
                position: relative;

                &::after,
                &::before {
                    content: '';
                    display: block;
                    width: 5px;
                    height: 2px;
                    background-color: var(--color);
                    position: absolute;
                }

                &::after {
                    top: 2px;
                    right: -5px;
                }

                &::before {
                    top: 2px;
                    left: -5px;
                }
            }
        }
    }
}
</style>