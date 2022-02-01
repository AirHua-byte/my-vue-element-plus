<template>
  <el-progress
    :percentage="value"
    v-bind="$attrs"
    :type="type"
    v-if="type !== 'dashboard'"
  />

  <el-progress type="dashboard" :percentage="value" v-else v-bind="$attrs">
    <template #default="{ percentage }">
      <span class="percentage-value">{{ percentage }}%</span>
      <br>
      <span class="percentage-label">完成率</span>
    </template>
  </el-progress>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  props: {
    // 进度条值
    percentage: {
      type: Number,
      required: true
    },
    // 是否有动画效果
    isAnimate: {
      type: Boolean,
      default: false
    },
    // 动画时长(ms)
    durationTime: {
      type: Number,
      default: 3000
    },
    // 进度条类型
    type: {
      type: String,
      default: 'line'
    }
  },
  setup(props) {
    let value = ref(0)
    onMounted(() => {
      if (props.isAnimate) {
        const gap = Math.ceil(props.durationTime / props.percentage)
        const timer = setInterval(() => {
          if (value.value < props.percentage) {
            value.value += 1
          } else {
            clearInterval(timer)
          }
        }, gap)
      } else {
        value.value = props.percentage
      }
    })

    return {
      value
    }
  }
})
</script>

<style lang="scss" scoped>

</style>