<template>
  <el-form
    :model="model"
    :rules="rules"
    v-bind="$attrs"
    ref="form"
    :validate-on-rule-change="false"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        v-if="!item.children || !item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
          v-model="model[item.prop]"
          v-bind="item.attrs"
        ></component>
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :prop="item.prop"
          class="upload-demo"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :on-exceed="onExceed"
        >
          <slot name="uploadArea"></slot>
          <template #tip>
            <slot name="uploadTip"></slot>
          </template>
        </el-upload>
        <div id="editor" v-if="item.type === 'editor'" style="width: 90%"></div>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { FormOptions, FormInstance } from './types//types'
import cloneDeep from 'lodash/cloneDeep'
import E from 'wangeditor'

export default defineComponent({
  emits: [
    'on-preview',
    'on-remove',
    'on-success',
    'on-error',
    'on-progress',
    'on-change',
    'before-upload',
    'before-remove',
    'on-exceed',
  ],
  props: {
    // 表单配置项
    options: {
      type: Array as PropType<FormOptions[]>,
      required: true,
    },
  },
  setup(props, context) {
    // 表单对象
    let form = ref<FormInstance | null>(null)
    // 表单数据
    let model = ref<any>(null)
    // 表单验证规则
    let rules = ref<any>(null)
    // 富文本对象
    let edit = ref<any>(null)

    // 初始化表单
    const initForm = () => {
      if (props.options && props.options.length) {
        let m: any = {}
        let r: any = {}
        props.options.map((item: FormOptions) => {
          m[`${item.prop}`] = item.value
          r[`${item.prop}`] = item.rules
        })
        model.value = cloneDeep(m)
        rules.value = cloneDeep(r)
      }
    }

    // 上传组件相关函数
    const onPreview = (file: File) => {
      context.emit('on-preview', file)
    }
    const onRemove = (file: File, fileList: FileList) => {
      context.emit('on-remove', { file, fileList })
    }
    const onSuccess = (response: any, file: File, fileList: FileList) => {
      const uploadItem = props.options.find((item) => item.type === 'upload')
      if (uploadItem && uploadItem.type) {
        model.value[`${uploadItem.prop}`] = { response, file, fileList }
        console.log('model', model)
      }
      context.emit('on-success', { response, file, fileList })
    }
    const onError = (err: any, file: File, fileList: FileList) => {
      context.emit('on-error', { err, file, fileList })
    }
    const onProgress = (event: any, file: File, fileList: FileList) => {
      context.emit('on-progress', event, file, fileList)
    }
    const onChange = (file: File, fileList: FileList) => {
      context.emit('on-change', { file, fileList })
    }
    const beforeUpload = (file: File) => {
      context.emit('before-upload', { file, FileList })
    }
    const beforeRemove = (file: File, fileList: FileList) => {
      context.emit('before-remove', { file, fileList })
    }
    const onExceed = (file: File, fileList: FileList) => {
      context.emit('on-exceed', { file, fileList })
    }

    // editor
    const initEditor = () => {
      const editor = new E('#editor')
      props.options.map((item) => {
        if (item.type === 'editor') {
          if (item.placeholder) {
            editor.config.placeholder = item.placeholder
            editor.create()
            editor.txt.html(item.value)
            editor.config.onchange = function (newHtml: string) {
              model.value[`${item.prop}`] = newHtml
            }
            edit.value = editor
          }
        }
      })
    }
    // 表单重置
    const resetFields = () => {
      form.value?.resetFields()
      if (props.options && props.options.length) {
        const editorItem = props.options.find((item) => item.type === 'editor')
        if (editorItem) {
          edit.value.txt.html(editorItem?.value)
        }
      }
    }
    // 获取表单数据
    const getFormData = () => {
      return model.value
    }

    // 监听父组件传递来的options
    watch(
      () => props.options,
      () => {
        initForm()
      },
      { deep: true }
    )

    // vue3生命周期
    initForm()
    onMounted(() => {
      if (props.options.map((item) => item.type).includes('editor')) {
        initEditor()
      }
    })
    return {
      form,
      model,
      rules,
      onPreview,
      onRemove,
      onSuccess,
      onError,
      onProgress,
      onChange,
      beforeUpload,
      beforeRemove,
      onExceed,
      resetFields,
      getFormData,
    }
  },
})
</script>

<style lang="scss" scoped>
svg {
  width: 3rem;
  height: 3rem;
  color: #999;
}
</style>