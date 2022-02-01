<template>
  <m-notification :value="value">
    <m-list :list="dataList" :actions="actions" @clickItem="getItem" @clickAction="getAction"></m-list>
  </m-notification>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { onMounted } from 'vue-demi'
import { list, actions } from './data'

export default defineComponent({
  setup() {
    let dataList = ref<any>(list)
    let value = ref<Number>(0)

    onMounted(() => {
      dataList.value.forEach((element: any) => {
        value.value += element.content.length
      });
    })

    const getItem = (item: any) => {
      console.log(item);
    }
    const getAction = (item: any) => {
      if (item.icon === 'Delete') {
        dataList.value.map((el: any) => {
          el.content = []
        })
      }
      console.log(item);
    }
    return {
      dataList,
      value,
      actions,
      getItem,
      getAction
    }
  }
})
</script>

<style lang="scss" scoped>

</style>