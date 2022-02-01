<template>
  <m-choose-area @submitable="submitArea"></m-choose-area>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const submitArea = (value: any) => {
      console.log(value);
    }
    return {
      submitArea
    }
  }
})
</script>

<style lang="scss" scoped>

</style>