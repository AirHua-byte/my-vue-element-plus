<template>
  <m-form ref="mForm" :options="options" @on-success="onSuccess" @on-preview="onPreview" @on-progress="onProgress">
    <template #uploadArea>
      <el-icon class="el-icon--upload"><icon-upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽上传或 <em>点击上传</em>
      </div>
    </template>

    <template #uploadTip>
      <div class="el-upload__tip">
        jpg/png 文件大小不能超过500kb
      </div>
    </template>

    <template #action>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </template>
  </m-form>
</template>

<script lang='ts'>
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { FormInstance, FormOptions } from '../../components/form/src/types/types'

interface MyForm {
  form: FormInstance,
  model: any
  resetFields?: Function
}

export default defineComponent({
  setup() {
    const mForm = ref<MyForm | null>(null)
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
            trigger: 'blur'
          },
          {
            min: 2,
            max: 15,
            message: '用户名在2-15长度之间',
            trigger: 'blur'
          }
        ],
        attrs: {
          clearable: true
        }
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
            trigger: 'blur'
          }
        ],
        attrs: {
          clearable: true,
          showPassword: true
        }
      },
      {
        type: 'rate',
        value: null,
        prop: 'movieRate',
        label: '评分',
        attrs: {
          colors: ['#99A9BF', '#F7BA2A', '#FF9900']
        }
      },
      {
        type: 'slider',
        prop: 'slider',
        value: 0,
        label: '进度条'
      },
      {
        type: 'upload',
        label: '请上传头像',
        prop: 'pic',
        uploadAttrs: {
          action: 'https://fileadm.huabyte.com/upload',
          drag: true,
          multiple: true
        },
        rules: [
          {
            required: true,
            message: '图片不能为空',
            trigger: 'blur'
          }
        ]
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
            trigger: 'blur'
          }
        ]
      }
    ]
    const onSuccess = (val: any) => {
      console.log(val);
    }
    const onPreview = (val: any) => {
      console.log(val);
    }
    const onProgress = (val: any) => {
      console.log(val);
    }

    const onSubmit = () => {
      if (mForm.value) {
        mForm.value.form.validate((valid) => {
          if (valid) {
            ElMessage.success('提交成功')
          } else {
            ElMessage.error('提交失败,请检查填写是否有误')
          }
        })
      }
    }
    const reset = () => {
      if(mForm.value?.resetFields) {
        mForm.value?.resetFields()
      }
    }
    return {
      mForm,
      options,
      onSuccess,
      onPreview,
      onProgress,
      onSubmit,
      reset
    }
  }
})
</script>

<style lang="scss" scoped>

</style>