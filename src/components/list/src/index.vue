<template>
  <div class="list-tabs__item">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="item.title" :name="item.index" v-for="(item, index) in list" :key="index">
        <el-scrollbar max-height="300px">
          <template v-if="item.content.length">
            <div class="container" v-for="(el, idx) in item.content" :key="idx" @click="clickItem(el)">
              <div class="avatar" v-if="el.avatar">
                <el-avatar :src="el.avatar" :size="30"></el-avatar>
              </div>
              <div class="content">
                <div class="text">{{ el.title }}</div>
                <div class="desc" v-if="el.desc">{{ el.desc }}</div>
                <div class="time">{{ el.time }}</div>
              </div>
              <el-tag class="ml-2" :type="el.tagType" v-if="el.tag">{{ el.tag }}</el-tag>
            </div>
          </template>
          <template v-else>
            <div class="info">
              <span v-if="item.title === '通知'">没有新通知</span>
              <span v-if="item.title === '关注'">没有关注事项</span>
              <span v-if="item.title === '代办'">暂无代办事项</span>
            </div>
          </template>
        </el-scrollbar>
      </el-tab-pane>
      <div class="actions">
        <div class="item" v-for="(item, index) in actions" :key="index" @click="clickAction(item)">
          <div class="text">{{ item.text }}</div>
          <component :is="`icon${toLine(item.icon)}`"></component>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref} from 'vue'
import { ListItem, ListOptions, ActionOptions } from './type'
import { toLine } from '../../../utils'

export default defineComponent({
  props: {
    // 列表内容
    list: {
      type: Array as PropType<ListOptions[]>,
      required: true
    },
    // 操作内容
    actions: {
      type: Array as PropType<ActionOptions[]>,
      default: () => []
    }
  },

  emits: ['clickItem', 'clickAction'],
  setup(props, context) {
    const activeName = ref('0')
    const clickItem = ((item: ListItem) => {
      context.emit('clickItem', item)
    })
    const clickAction = ((item: ActionOptions) => {
      context.emit('clickAction', item)
    })
    return {
      activeName,
      toLine,
      clickItem,
      clickAction
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6ff;
  }
  .avatar {
    flex: 1;
  }
  .content {
    flex: 3;
    margin-right: 10px;
    .desc, .time {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
  }
}
.actions {
  display: flex;
  align-items: center;
  border-top: 2px solid #eee;
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-right: 2px solid #eee;
    cursor: pointer;
    &:last-child {
      border: none;
    }
  }
}
svg {
  width: 1em;
  height: 1em;
}
.info {
  text-align: center;
  padding: 20px;
  color: #999;
}
</style>