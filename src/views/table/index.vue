<template>
  <m-table
    :tableData="data" 
    :tableOption="options" 
    :currentPage="currentPage"
    :pageSize="pageSize"
    :total="total"
    border 
    stripe
    :editIndex="editIndex"
    @confirm="confirm"
    @cancel="cancel"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
    <template #date="{ scope }">
      <icon-timer></icon-timer>
      <span>{{ scope.row.date }}</span>
    </template>
    <template #name="{ scope }">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
          <div>address: {{ scope.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <template #editRow="{ scope }">
      <el-button
        size="small" 
        @click="handleEdit(scope.$index, scope.row)"
        type="primary"
      >完成</el-button>
      <el-button
        size="small"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)"
      >取消</el-button>
    </template>
    <template #action="{ scope }">
      <el-button
        size="small" 
        @click="handleEdit(scope.$index, scope.row)"
        type="primary"
      >编辑</el-button>
      <el-button
        size="small"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)"
      >删除</el-button>
    </template>
  </m-table>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import { TableOptions } from '../../components/table/src/types'
import axios from 'axios'

interface DataList {
  date: string,
  name: string,
  address: string
}
export default defineComponent({
  setup() {
    // 表单数据
    let data = ref<DataList[]>([])
    // 表单配置
    const options: TableOptions[] = [
      {
        prop: 'date',
        label: '日期',
        slot: 'date',
        editable: true
      },
      {
        prop: 'name',
        label: '姓名',
        slot: 'name'
      },
      {
        prop: 'address',
        label: '地址',
        editable: true
      },
      {
        prop: 'action',
        label: '操作',
        slot: 'action',
        action: true
      }
    ]
    // 编辑行的index
    let editIndex = ref<number | null>(null)
    // 编辑状态
    let isEdit = ref<boolean>(false)
    // 上次编辑行
    let oldIndex = ref<number | null>(null)
    // 当前页
    let currentPage = ref<number>(1)
    // 当前每页数据数量
    let pageSize = ref<number>(10)
    // 总数据量
    let total = ref<number>(0)

    const confirm = (val: any) => {

    }
    const cancel = (val: any) => {
      
    }

    const handleEdit = (col: number, row: any) => {
      isEdit.value = !isEdit.value
      if (isEdit.value || col !== oldIndex.value) {
        editIndex.value = col
        oldIndex.value = col
      } else {
        editIndex.value = null
      }
    }
    const handleDelete = (col: number, row: any) => {
      isEdit.value = false
      editIndex.value = null
    }
    const handleSizeChange = (val: number) => {
      pageSize.value = val
      getData()
    }
    const handleCurrentChange = (val: number) => {
      currentPage.value = val
      getData()
    }

    const getData = () => {
      axios.post('api/list', {
        current: currentPage.value,
        pageSize: pageSize.value
      }).then(res => {
        console.log(res.data.data);
        const dataList = res.data.data
        data.value = dataList.data
        total.value = dataList.total
      })
    }

    onMounted(() => {
      getData()
    })

    return {
      data,
      options,
      editIndex,
      isEdit,
      currentPage,
      pageSize,
      total,
      confirm,
      cancel,
      handleEdit,
      handleDelete,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="scss" scoped>
svg {
  width: 1rem;
  height: 1rem;
  margin-right: 10px;
}
</style>