<template>
  <m-modal-form v-model:dialogVisible="visible" :options="options">
    <template #uploadArea>
      <el-icon class="el-icon--upload">
        <icon-upload-filled />
      </el-icon>
      <div class="el-upload__text">
        拖拽上传或
        <em>点击上传</em>
      </div>
    </template>

    <template #uploadTip>
      <div class="el-upload__tip">jpg/png 文件大小不能超过500kb</div>
    </template>

    <template #footer="scope">
      <span class="dialog-footer">
        <el-button @click="reset(scope.form)">重置</el-button>
        <el-button type="primary" @click="submit((scope.form))">提交</el-button>
      </span>
    </template>
  </m-modal-form>
  <el-button type="primary" @click="handle">点击</el-button>
</template>

<script lang='ts'>
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'
import {
  FormInstance,
  FormOptions,
} from '../../components/form/src/types/types'

interface MyForm {
  form: FormInstance
  model: any
  resetFields?: Function
}
export default defineComponent({
  setup() {
    let visible = ref<boolean>(false)
    const options: FormOptions[] = [
      {
        type: 'input',
        value: '',
        label: '用户名',
        prop: 'username',
        placeholder: '请输入用户名',
        rules: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 15,
            message: '用户名在2-15长度之间',
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
        label: '密码',
        prop: 'password',
        placeholder: '请输入密码',
        rules: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
          },
        ],
        attrs: {
          clearable: true,
          showPassword: true,
        },
      },
      {
        type: 'rate',
        value: null,
        prop: 'movieRate',
        label: '评分',
        attrs: {
          colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        },
      },
      {
        type: 'slider',
        prop: 'slider',
        value: 0,
        label: '进度条',
      },
      {
        type: 'upload',
        label: '请上传头像',
        prop: 'pic',
        uploadAttrs: {
          action: 'https://fileadm.huabyte.com/upload',
          drag: true,
          multiple: true,
        },
        rules: [
          {
            required: true,
            message: '图片不能为空',
            trigger: 'blur',
          },
        ],
      },
      {
        type: 'editor',
        prop: 'editor',
        value: '',
        label: '简介',
        placeholder: '快来填写您的个人简介吧',
        rules: [
          {
            required: true,
            message: '简介不能为空',
            trigger: 'blur',
          },
        ],
      },
    ]

    const handle = () => {
      visible.value = !visible.value
    }
    const reset = (form: any) => {
      if (form.resetFields) {
        form.resetFields()
      }
    }
    const submit = (form: any) => {
      let validate = form.form.validate
      validate((valid: boolean) => {
        if (valid) {
          console.log(form.getFormData)
          ElMessage.success('验证成功')
          visible.value = false
        } else {
          ElMessage.error('表单填写有误,请检查')
        }
      })
    }
    return {
      visible,
      options,
      handle,
      reset,
      submit,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>