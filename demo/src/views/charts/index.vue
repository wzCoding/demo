<template>
    <div class="chart-page">
        <div class="table-container">
            <el-table header-cell-class-name="header-cell" :data="pageData" border stripe lazy row-key="code"
                :cell-class-name="handleCellClass" :empty-text="emptyText"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :load="loadData"
                @cell-click="handleCellClick">
                <template #default>
                    <el-table-column v-for="column in tableColumns" :key="column.prop" :prop="column.prop"
                        :label="column.label" :align="column.align" :formatter="formatterCellValue"></el-table-column>
                </template>
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
import { ElTable, ElTableColumn, ElPagination, ElConfigProvider } from 'element-plus'
import { getData } from '@/utils/service'
import { getRadom } from '@/utils/index'
import { ref, reactive, computed } from 'vue'
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
const layout = ref('total, sizes, prev, pager, next, jumper')
const currentPage = ref(1)
const pageSize = ref(8)
const dataType = 'map'
const mapId = ref('china')
const emptyText = ref('暂无数据')
const tableData = ref([])
const pageData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = currentPage.value * pageSize.value
    return tableData.value.slice(start, end)
})
const total = computed(() => tableData.value.length)
const pageSizes = computed(() => [pageSize.value, pageSize.value * 2, pageSize.value * 3, tableData.value.length])
const tableColumns = reactive([
    {
        prop: 'province', label: '省份/直辖市', align: 'left'
    },
    {
        prop: 'apple', label: '苹果', align: 'right'
    },
    {
        prop: 'banana', label: '香蕉', align: 'right'
    },
    {
        prop: 'orange', label: '橙子', align: 'right'
    },
    {
        prop: 'pear', label: '梨', align: 'right'
    },
    {
        prop: 'grape', label: '葡萄', align: 'right'
    },
    {
        prop: 'watermelon', label: '西瓜', align: 'right'
    },
    {
        prop: 'pineapple', label: '菠萝', align: 'right'
    },
    {
        prop: 'strawberry', label: '草莓', align: 'right'
    }

])
const handleTableData = (data) => {
    const result = data.map(item => {
        const { fullname, code, level, childrenNum } = item.properties
        const obj = {
            code,
            level,
            hasChildren: childrenNum > 0,
        }
        for (const column of tableColumns) {
            obj[column.prop] = column.prop === 'province' ? fullname : (getRadom(0, 100000) > 90000 ? 0 : getRadom(0, 100000))
        }
        return obj
    })
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
}
const formatterCellValue = (row, column, cellValue, index) => {
    if (column.property !== 'province') {
        cellValue = cellValue.toLocaleString()
    }
    return cellValue
}
const handleCellClick = (cell) => {
    if (cell.columnIndex === 0) return
}
const loadData = async (row, treeNode, resolve) => {
    const { code } = row
    const res = await getData(code, dataType)
    resolve(handleTableData(res.objects.default.geometries))
}

getData(mapId.value, dataType).then(res => {
    console.log(res)
    tableData.value = handleTableData(res.objects.default.geometries)
    console.log(tableData.value)
})
</script>
<style lang="scss" scoped>
.chart-page {
    padding: 1rem;
    box-sizing: border-box;

    .table-container {
        width: 100%;

        .table-pagination {
            display: flex;
            justify-content: flex-end;
            margin-top: 1rem;
        }
    }
}
</style>
<style lang="scss">
.el-table {
    color: #333;

}

.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
    background-color: #ecf5ff;
}

.header-cell {
    background-color: #f5f5f5 !important;
    color: #333;
    font-weight: bold;
}

.cell-not-zero {
    color: #409eff;
    text-decoration: underline;
    cursor: pointer;
}
</style>