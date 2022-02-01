<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    :router="router"
  >
    <template v-for="(item, x) in data" :key="x">
      <el-sub-menu v-if="item[children]" :index="item[index]">
        <template #title>
          <component :is="`icon${toLine(item[icon])}`" v-if="item[icon]"></component>
          <span>{{ item[title] }}</span>
        </template>
        <template v-for="(el, i) in item[children]" :key="i">
          <el-menu-item :index="el[index]">
            <component :is="`icon${toLine(el[icon])}`" v-if="el[icon]"></component>
            <span>{{ el[title] }}</span>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item :index="item[index]" v-else>
        <component :is="`icon${toLine(item[icon])}`" v-if="item[icon]"></component>
        <span>{{ item[title] }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang='ts' setup>
import { PropType } from "vue";
import { toLine } from '../../../utils'
import { MenuItem } from './type'

let props = defineProps({
  // 导航菜单数据
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true
  },
  // 默认选中菜单
  defaultActive: {
    type: String,
    default: ''
  },
  // 是否路由模式
  router: {
    type: Boolean,
    default: false
  },
  // 菜单标题键名
  title: {
    type: String,
    default: 'title'
  },
  // 菜单标识键名
  index: {
    type: String,
    default: 'index'
  },
  // 菜单图标键名
  icon: {
    type: String,
    default: 'icon'
  },
  // 菜单子菜单键名
  children: {
    type: String,
    default: 'children'
  }
})
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
  margin-right: 4px;
}
</style>