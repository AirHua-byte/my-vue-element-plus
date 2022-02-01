<template>
  <el-table
    :data="tableData"
    v-loading="isLoading"
    size="large"
    style="width: 100%"
    v-bind="$attrs"
  >
    <template v-for="(item, index) in tableOption" :key="index">
      <el-table-column
        v-if="item.prop && !item.action"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="editIndex === scope.$index">
            <div class="action">
              <el-input v-model="scope.row[item.prop]" size="small"></el-input>
            </div>
          </template>
          <template v-else>
            <template v-if="scope.$index + scope.column.id === currentEditItem">
              <div class="action">
                <el-input v-model="scope.row[item.prop]" size="small"></el-input>
                <icon-check class="check" @click="check(scope)" />
                <icon-close class="close" @click="close(scope)" />
              </div>
            </template>
            <template v-else>
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop] }}</span>
              <component 
                :is="'icon-edit'" 
                @click="editItemIcon(scope)" 
                class="icon"
                v-if="item.editable"
              ></component>
            </template>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-if="item.action"
        :prop="item.prop"
        :label="item.label"
      >
        <template #default="scope">
          <slot name="editRow" :scope="scope" v-if="editIndex === scope.$index"></slot>
          <slot :name="item.slot" :scope="scope" v-else></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>

  <div class="demo-pagination-block pagination">
    <el-pagination
      :currentPage="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { TableOptions }  from './types'

export default defineComponent({
  emits: ['confirm', 'cancel', 'size-change', 'current-change'],
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableOption: {
      type: Array as PropType<TableOptions[]>,
      required: true
    },
    editIndex: {
      type: Number
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 1
    }
  },

  setup(props, context) {
    // 编辑标识
    let isEdit = ref<boolean>(false)
    // 点击的编辑项
    let currentEditItem = ref<string>('')
    // 控制表格加载
    let isLoading = computed(() => !props.tableData || !props.tableData.length)
    // 开启编辑
    const editItemIcon = (item: any) => {
      currentEditItem.value = item.$index + item.column.id
    }
    // 确认编辑保存
    const check = (scope: any) => {
      context.emit('confirm', scope)
      currentEditItem.value = ''
    }
    // 取消编辑内容
    const close = (scope: any) => {
      context.emit('cancel', scope)
      currentEditItem.value = ''
    }
    // 每页数据量控制
    const handleSizeChange = (val: number) => {
      console.log('handleSizeChange', val);
      context.emit('size-change', val)
    }
    // 控制当前页
    const handleCurrentChange = (val: number) => {
      console.log('handleCurrentChange', val);
      context.emit('current-change', val)
    }

    return {
      isEdit,
      currentEditItem,
      isLoading,
      editItemIcon,
      check,
      close,
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
  margin-left: 14px;
}
.icon {
  cursor: pointer;
}
.action {
  display: flex;
  align-items: center;
  .check {
    color: green;
  }
  .close {
    color: red;
  }
}
.pagination {
  margin-top: 20px;
}
</style>