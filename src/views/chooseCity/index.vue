<template>
  <m-choose-city @changeCity="changeCity"></m-choose-city>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const changeCity = (val: any) => {
      console.log(val);
    }

    return {
      changeCity
    }
  }
})
</script>

<style lang="scss" scoped>

</style>