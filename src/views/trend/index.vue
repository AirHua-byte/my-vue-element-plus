<template>
  <h3>自定义图标</h3>
  <m-trend type="up" upIcon="CaretTop">观看量</m-trend>
  <m-trend text="点赞量" type="down" downIcon="CaretBottom"></m-trend>
  <h3>颜色反转</h3>
  <m-trend text="观看量" type="up" reverseColor></m-trend>
  <m-trend text="点赞量" type="down" reverseColor></m-trend>
  <h3>自定义图标颜色</h3>
  <m-trend text="观看量" type="up" upIconColor="#B404AE"></m-trend>
  <m-trend text="点赞量" type="down" downIconColor="#2E2EFE"></m-trend>
  <h3>自定义文本颜色</h3>
  <m-trend text="观看量" type="up" upTextColor="#B404AE"></m-trend>
  <m-trend text="点赞量" type="down" downTextColor="#2E2EFE"></m-trend>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
</style>