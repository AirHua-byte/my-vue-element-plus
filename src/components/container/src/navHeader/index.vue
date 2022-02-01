<template>
  <div class="header">
    <span @click="toggle">
      <el-icon v-if="isCollapse"><icon-expand></icon-expand></el-icon>
      <el-icon v-else><icon-fold></icon-fold></el-icon>
    </span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isCollapse: Boolean
  },
  emits: ['update:isCollapse'],
  setup(props, context) {
    const toggle = () => {
      context.emit('update:isCollapse', !props.isCollapse)
    }
    return {
      toggle
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>