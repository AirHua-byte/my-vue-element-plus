<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <nav-side :isCollapse="isCollapse"></nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:isCollapse="isCollapse"></nav-header>
      </el-header>
      <el-scrollbar>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import NavSide from './navSide/index.vue'
import NavHeader from './navHeader/index.vue'

export default defineComponent({
  components: {
    NavSide,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    return {
      isCollapse
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>