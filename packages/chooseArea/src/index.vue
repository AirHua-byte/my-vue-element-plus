<template>
  <div>
    <el-select clearable v-model="provice" class="m-2" placeholder="请选择省份" size="large">
      <el-option
        v-for="item in allData"
        :key="item.value"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
    <el-select clearable v-model="city" class="m-2" placeholder="请选择城市" size="large" :disabled="!provice">
      <el-option
        v-for="item in selectCity"
        :key="item.value"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
    <el-select clearable v-model="area" class="m-2" placeholder="请选择区域" size="large" :disabled="!city">
      <el-option
        v-for="item in selectArea"
        :key="item.value"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
    <el-select v-model="town" class="m-2" placeholder="请选择乡镇" size="large" :disabled="!area">
      <el-option
        v-for="item in selectTown"
        :key="item.value"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import allAreas from '../lib/pcas-code.json'

export interface AreaItem {
  name: string,
  code: string,
  children?: AreaItem[]
}
export interface Data {
  name: string,
  code: string
}
export default defineComponent({
  emits: ['submitable'],
  setup(props, context) {
    let provice = ref<string>('')
    let city = ref<string>('')
    let area = ref<string>('')
    let town = ref<string>('')
    
    let allData = ref<AreaItem[]>(allAreas)
    let selectCity = ref<AreaItem[]>([])
    let selectArea = ref<AreaItem[]>([])
    let selectTown = ref<AreaItem[]>([])

    watch(() => provice.value, val => {
      if (val) {
        selectCity.value = allData.value.find(item => item.code === val)!.children!
      }
      city.value = ''
      area.value = ''
      town.value = ''
    })
    watch(() => city.value, val => {
      if (val) {
        selectArea.value = selectCity.value.find(item => item.code === val)!.children!
      }
      area.value = ''
      town.value = ''
    })
    watch(() => area.value, val => {
      if (val) {
        selectTown.value = selectArea.value.find(item => item.code === val)!.children!
      }
      town.value = ''
    })
    watch(() => town.value, val => {
      if (val) {
        const proviceData: Data = {
          name: provice.value && allData.value.find(item => item.code === provice.value)!.name,
          code: provice.value
        }
        const cityData: Data = {
          name: city.value && selectCity.value.find(item => item.code === city.value)!.name,
          code: city.value
        }
        const areaData: Data = {
          name: area.value && selectArea.value.find(item => item.code === area.value)!.name,
          code: area.value
        }
        const townData: Data = {
          name: town.value && selectTown.value.find(item => item.code === town.value)!.name,
          code: town.value
        }
        context.emit('submitable', {
          provice: proviceData,
          city: cityData,
          area: areaData,
          town: townData
        })
      }
    })

    return {
      provice,
      city,
      area,
      town,
      allData,
      selectCity,
      selectArea,
      selectTown
    }
  }
})
</script>

<style lang="scss" scoped>
.m-2 {
  margin-right: 20px;
}
</style>