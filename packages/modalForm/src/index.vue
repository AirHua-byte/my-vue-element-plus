<template>
  <el-dialog v-model="visible" :title="title" width="50%">
    <el-scrollbar max-height="600px">
      <m-form
        ref="form"
        :options="options"
        @on-success="onSuccess"
        @on-preview="onPreview"
        @on-progress="onProgress"
      >
        <template #uploadArea>
          <slot name="uploadArea"></slot>
        </template>
        <template #uploadTip>
          <slot name="uploadTip"></slot>
        </template>
      </m-form>
    </el-scrollbar>
    <template #footer>
      <slot name="footer" :form="form"></slot>
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, watch } from 'vue'
import { FormOptions } from '../../form/src/types/types'

export default defineComponent({
  emits: ['update:dialogVisible'],
  props: {
    title: {
      type: String,
      default: '编辑信息',
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as PropType<FormOptions[]>,
    },
    onChange: {
      type: Function,
    },
    beforeUpload: {
      type: Function,
    },
    onPreview: {
      type: Function,
    },
    onProgress: {
      type: Function,
    },
    onRemove: {
      type: Function,
    },
    beforeRemove: {
      type: Function,
    },
    onSuccess: {
      type: Function,
    },
    onExceed: {
      type: Function,
    },
  },

  setup(props, context) {
    let visible = ref<boolean>(props.dialogVisible)
    let form = ref<any>(null)

    watch(
      () => visible.value,
      (val: Boolean) => {
        context.emit('update:dialogVisible', val)
      }
    )
    watch(
      () => props.dialogVisible,
      (val: boolean) => {
        visible.value = props.dialogVisible
      }
    )

    console.log(props.options)

    return {
      visible,
      form,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>