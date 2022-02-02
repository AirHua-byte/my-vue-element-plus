<template>
  <el-time-select
    v-model="startTime"
    :start="startSelectTime"
    :max-time="endTime"
    :step="step"
    :end="endSelectTime"
    :placeholder="startPlaceholder"
    style="margin-right: 10px"
  ></el-time-select>
  <el-time-select
    v-model="endTime"
    :start="startSelectTime"
    :min-time="startTime"
    :step="step"
    :end="endSelectTime"
    :placeholder="endPlaceholder"
  ></el-time-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    // 定义时间间隔
    step: {
      type: String,
      default: '00:30',
    },
    // 开始可选择时间
    startSelectTime: {
      type: String,
      default: '00:00',
    },
    // 结束可选择时间
    endSelectTime: {
      type: String,
      default: '23:30',
    },
    // 提示
    startPlaceholder: {
      type: String,
      default: '请选择开始时间',
    },
    endPlaceholder: {
      type: String,
      default: '请选择结束时间',
    },
  },
  setup() {
    // 开始时间
    let startTime = ref('')
    // 结束时间
    let endTime = ref('')
    // 是否禁用
    let endTimeDisabled = ref<boolean>(true)

    return {
      startTime,
      endTime,
      endTimeDisabled,
    }
  },
})
</script>


<style lang="scss" scoped>
</style>