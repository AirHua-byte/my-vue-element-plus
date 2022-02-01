<template>
  <el-popover
    placement="bottom"
    :width="300"
    trigger="click"
    popper-class="notification-popper-class"
  >
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <el-badge
        :value="value"
        class="item"
        style="cursor: pointer;"
        :icon="icon"
        :max="max"
        :is-dot="isDot"
      >
        <component :is="`icon${toLine(icon)}`"></component>
      </el-badge>
    </template>
  </el-popover>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { toLine } from '../../../utils'

export default defineComponent({
  props: {
    // 显示的图标
    icon: {
      type: String,
      default: 'Bell'
    },
    // 通知数量
    value: {
      type: [String, Number],
      default: ''
    },
    // 最大值
    max: {
      type: Number
    },
    // 是否显示为小圆点
    isDot: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return {
      toLine
    }
  }
})
</script>

<style lang="scss" scoped>
svg {
  width: 1.5em;
  height: 1.5em;
}
</style>