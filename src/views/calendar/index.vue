<template>
  <m-calendar
    :selectable="selectable"
    :locale="locale"
    :headerToolbar="headerToolbar"
    :dateClick="dateClick"
    :events="events"
    :eventContent="eventContent"
  ></m-calendar>
  <m-modal-form v-model:dialogVisible="visible" :options="options" title="新增事项">
    <template #footer="scope">
      <span class="dialog-footer">
        <el-button @click="reset(scope.form)">重置</el-button>
        <el-button type="primary" @click="submit((scope.form))">提交</el-button>
      </span>
    </template>
  </m-modal-form>
</template>

<script lang='ts'>
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { EventItem } from '../../components/calendar/src/types'
import { FormOptions } from '../../components/form/src/types/types'

export default defineComponent({
  setup() {
    let selectable = ref<boolean>(true)
    let locale = ref<string>('zh-cn')
    let headerToolbar = ref<any>({
      start: 'title', // will normally be on the left. if RTL, will be on the right
      center: '',
      end: 'today prevYear,prev,next,nextYear',
    })
    let events = ref<EventItem[]>([
      {
        title: '敲代码',
        start: '2022-02-03',
        end: '2022-02-10',
      },
    ])

    let visible = ref<boolean>(false)
    let options = ref<FormOptions[]>([
      {
        type: 'input',
        value: '',
        label: '标题',
        prop: 'title',
        placeholder: '请输入待办事项',
        rules: [
          {
            required: true,
            message: '事项不能为空',
            trigger: 'blur',
          },
        ],
        attrs: {
          clearable: true,
        },
      },
      {
        type: 'input',
        value: '',
        label: '开始日期',
        prop: 'startStr',
        placeholder: '请输入开始日期',
        rules: [
          {
            required: true,
            message: '开始日期不能为空',
            trigger: 'blur',
          },
        ],
        attrs: {
          clearable: true,
        },
      },
      {
        type: 'input',
        value: '',
        label: '结束日期',
        prop: 'endStr',
        placeholder: '请输入结束日期',
        rules: [
          {
            required: true,
            message: '结束日期不能为空',
            trigger: 'blur',
          },
        ],
        attrs: {
          clearable: true,
        },
      },
    ])

    let dateClick = (info: any) => {
      options.value.map((item) => {
        if (item.prop === 'startStr') {
          item.value = info.dateStr
        }
        return item
      })
      visible.value = !visible.value
    }
    // 自定义渲染事件
    let eventContent = () => {}
    let reset = (form: any) => {
      if (form.resetFields) {
        form.resetFields()
      }
    }
    let submit = (form: any) => {
      let validate = form.form.validate
      validate((valid: boolean) => {
        if (valid) {
          const data = form.getFormData()
          ElMessage.success('验证成功')
          visible.value = false

          events.value.push({
            title: data.title,
            start: data.startStr,
            end: data.endStr,
          })
        } else {
          ElMessage.error('表单填写有误,请检查')
        }
      })
    }
    return {
      selectable,
      locale,
      headerToolbar,
      events,
      visible,
      options,
      dateClick,
      eventContent,
      reset,
      submit,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>