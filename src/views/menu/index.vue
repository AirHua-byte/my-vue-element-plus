<template>
  <div class="menu">
    <div class="item" style="flex: 1">
      <m-menu :data="data1" defaultActive='1'></m-menu>
    </div>
    <div class="item" style="flex: 1">
      <m-infinite-menu :data="data2" defaultActive='1'></m-infinite-menu>
    </div>
  </div>
</template>

<script lang='ts' setup>
let data1 = [
  {
    title: '导航1',
    index: '1',
    icon: 'Document'
  },
  {
    title: '导航2',
    index: '2',
    icon: 'Document'
  },
  {
    title: '导航3',
    index: '3',
    icon: 'Document',
    children: [
      {
        title: '导航3-1',
        index: '3-1',
        icon: 'Document',
      },
      {
        title: '导航3-2',
        index: '3-2',
        icon: 'Document',
      }
    ]
  }
]
let data2 = [
  {
    title: '导航1',
    index: '1',
    icon: 'Document'
  },
  {
    title: '导航2',
    index: '2',
    icon: 'Document'
  },
  {
    title: '导航3',
    index: '3',
    icon: 'Document',
    children: [
      {
        title: '导航3-1',
        index: '3-1',
        icon: 'Document',
        children: [
          {
            title: '导航3-1-1',
            index: '3-1-1',
            icon: 'Document',
            children: [
              {
                title: '导航3-1-1-1',
                index: '3-1-1-1',
                icon: 'Document',
                children: [
                  {
                    title: '导航3-1-1-1-1',
                    index: '3-1-1-1-1',
                    icon: 'Document',
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
}
</style>