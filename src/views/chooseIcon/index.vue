<template>
  <div>
    <m-choose-icon v-model:visible="visible" title="选择图标">选择图标</m-choose-icon>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref<boolean>(false)
    return {
      visible
    }
  }
})
</script>

<style lang="scss" scoped>

</style>