<template>
  <m-progress :percentage="58" :isAnimate="false"></m-progress>
  <br><br><br>
  <m-progress :percentage="58" :isAnimate="true" type="circle" status="warning"></m-progress>
  <br><br><br>
  <m-progress type="dashboard" :percentage="58" :isAnimate="true"></m-progress>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss" scoped>

</style>