<template>
  <el-popover
    placement="bottom-start"
    :width="430"
    trigger="hover"
    v-model:visible="visible"
  >
    <template #reference>
      <div class="result" @click="controlView">
        <span class="address">{{ result }}</span>
        <icon-arrow-down :class="{ 'rotate': visible }" />
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="9">
          <el-radio-group v-model="labelValue">
            <el-radio-button label="按城市"></el-radio-button>
            <el-radio-button label="按省份"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :offset="1" :span="14">
          <el-select v-model="selectCity" class="m-2" placeholder="请搜索城市" filterable :filter-method="filterMethod">
            <el-option
              v-for="item in optionCity"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <template v-if="labelValue === '按城市'">
        <div class="city">
          <!-- 字母区域 -->
          <div class="letter-item" v-for="(item, index) in Object.keys(city.cities)" :key="index" @click="goToTarget(item)">
            {{ item }}
          </div>
        </div>
        <!-- 城市区域 -->
        <el-scrollbar max-height="300px">
          <div class="city-item" v-for="(value, key) in city.cities" :key="key" :id="key">
            <div class="title">{{ key }}</div>
            <div class="items">
              <div class="item" v-for="(item, idx) in value" :key="idx" @click="clickItem(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="province">
          <!-- 字母区域 -->
          <div class="letter-item" v-for="(item, index) in Object.keys(province)" :key="index" @click="goToTarget(item)">
            {{ item }}
          </div>
        </div>
        <!-- 城市区域 -->
        <el-scrollbar max-height="300px">
          <div class="city-item" v-for="(value, key) in Object.values(province)" :key="key">
            <div v-for="(el, i) in value" :key="i"  :id="el.id">
              <div class="title">{{ el.name }}</div>
              <div class="items">
                <div class="item" v-for="(item, idx) in el.data" :key="idx"  @click="clickItem(item)">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import province from '../lib/province.json'
import city from '../lib/city'
import { City } from './types'

export default defineComponent({
  emits: ['changeCity'],
  setup(porps, context) {
    // 最终结果
    let result = ref<string>('请选择')
    // 弹出层可见值
    let visible = ref<boolean>(false)
    // 单选框值 按城市|按省份
    let labelValue = ref<string>('按城市')
    // 全部城市
    let allCity = ref<City[]>([])
    // 可选城市
    let optionCity = ref<City[]>([])
    // 选中城市
    let selectCity = ref('')

    onMounted(() => {
      allCity.value = Object.values(city.cities).flat(2)
      optionCity.value = allCity.value
    })
    // 自定义搜索过滤
    const filterMethod = (val: string) => {
      if (val === '') {
        optionCity.value = allCity.value
      } else {
        optionCity.value = allCity.value.filter(item => {
          return item.name.includes(val) || item.spell.includes(val)
        })
      }
    }
    // 点击字母跳转位置
    const goToTarget = (val: string) => {
      const el = document.getElementById(val)
      if (el) el.scrollIntoView()
    }
    // 控制显示
    const controlView = () => {
      visible.value = !visible.value
      console.log(visible.value);
    }
    // 点击选择城市完成
    const clickItem = (item: City | string) => {
      // console.log(item);
      if (typeof(item) === 'string') {
        result.value = item
        const el = allCity.value.find(el => item === el.name)
        context.emit('changeCity', el)
      } else {
        result.value = item.name
        context.emit('changeCity', item)
      }
      visible.value = false
    }

    return {
      result,
      visible,
      labelValue,
      city,
      province,
      allCity,
      optionCity,
      selectCity,
      filterMethod,
      goToTarget,
      controlView,
      clickItem
    }
  }
})
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
  transition: all 0.25s linear;
}
.rotate {
  transform: rotate(180deg);
}
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  .address {
    margin-right: 2px;
  }
}
.title {
  margin-left: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #999;
}
.city, .province {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
  .letter-item {
    padding: 3px 6px;
    margin-right: 8px;
    margin-bottom: 8px;
    border: 1px solid #eee;
    cursor: pointer;
    &:hover {
      background-color: #e6f6ff;
    }
  }
}
.items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 8px 0;
  .item {
    padding: 6px 8px;
    cursor: pointer;
    &:hover {
      border-radius: 8%;
      background-color: #e6f6ff;
    }
  }
}
</style>