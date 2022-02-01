<template>
  <div class="trend">
    <div class="text">
      <slot v-if="solts.default"></slot>
      <div :style="{ color: textColor }" v-else>{{ text }}</div>
    </div>
    <div class="icon">
      <component
        :is="`icon${toLine(upIcon)}`"
        v-if="type === 'up'"
        :style="{ color: !reverseColor ? upIconColor : '#52c41a' }"
      ></component>
      <component
        :is="`icon${toLine(downIcon)}`"
        v-else
        :style="{ color: !reverseColor ? downIconColor : '#f5222d' }"
      ></component>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { toLine } from '../../../utils'

export default defineComponent({
  props: {
    // 标记当前趋势up | down
    type: {
      type: String,
      default: 'up'
    },
    // 趋势显示文字
    text: {
      type: String,
      default: '测试文字'
    },
    // 上升趋势图标的颜色
    upIconColor: {
      type: String,
      default: '#f5222d'
    },
    // 下降趋势图标颜色
    downIconColor: {
      type: String,
      default: '#52c41a'
    },
    // 上升趋势文字的颜色
    upTextColor: {
      type: String,
      default: '#000'
    },
    // 下降趋势文字颜色
    downTextColor: {
      type: String,
      default: '#000'
    },
    // 颜色反转, 仅在默认颜色模式生效
    reverseColor: {
      type: Boolean,
      default: false
    },
    // 上升图标
    upIcon: {
      type: String,
      default: 'ArrowUp'
    },
    // 下降
    downIcon: {
      type: String,
      default: 'ArrowDown'
    }
  },

  setup(props, context) {
    const solts = context.slots
    const textColor = computed(() => {
      return props.type === 'up' ? props.upTextColor : props.downTextColor
    })
    return {
      textColor,
      solts,
      toLine
    }
  }
})
</script>

<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    margin-right: 4px;
    font-size: 14px;
  }
  .icon {
    svg {
      height: 0.8em;
      width: 0.8em;
    }
  }
}
</style>