<template>
  <el-button type="primary" @click="handleClick">
    <slot></slot>
  </el-button>
  <div class="m-choose-icon-dialog-body-height">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="50%"
    >
      <el-scrollbar>
        <div class="container">
          <div
            class="item"
            v-for="(item, index) in Object.keys(Icons)"
            :key="index"
            @click.prevent="CopyItem(item)"
            >
              <div>
                <component :is="`icon${toLine(item)}`"></component>
              </div>
              <p>{{ item }}</p>
            </div>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'
import { toLine } from '../../utils'
import { useCopy } from '../../hooks/useCopy'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['update:visible'],
  setup(props, context) {
    const Icons:any = ElIcons
    // 拷贝父组件visible
    const dialogVisible = ref<boolean>(props.visible)
    const handleClick = () => {
      context.emit('update:visible', !props.visible)
    }
    const CopyItem = (item: string) => {
      const text = `<icon${toLine(item)} />`
      useCopy(text)
      dialogVisible.value = false
    }
    watch(() => props.visible, val => {
      dialogVisible.value = val
    })
    watch(() => dialogVisible.value, val => {
      context.emit('update:visible', val)
    })
    return {
      handleClick,
      dialogVisible,
      toLine,
      Icons,
      CopyItem
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: center;
  .item {
    width: 25%;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 70px;
    margin-bottom: 20px;
    cursor: pointer;
    padding: 10px 0;
    &:hover {
      border-radius: 4%;
      background-color: #e6f6ff;
    }
    svg {
      width: 2em;
      height: 2em;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>