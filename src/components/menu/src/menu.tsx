import { defineComponent, PropType, useAttrs } from 'vue'
import { MenuItem } from './type'
import { toLine } from '../../../utils'

export default defineComponent({
  props: {
    // 导航菜单数据
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    // 默认选中菜单
    defaultActive: {
      type: String,
      default: ''
    },
    // 是否路由模式
    router: {
      type: Boolean,
      default: false
    },
    // 菜单标题键名
    title: {
      type: String,
      default: 'title'
    },
    // 菜单标识键名
    index: {
      type: String,
      default: 'index'
    },
    // 菜单图标键名
    icon: {
      type: String,
      default: 'icon'
    },
    // 菜单子菜单键名
    children: {
      type: String,
      default: 'children'
    }
  },
  setup(props) {
    // 封装一个无限层级菜单方法，函数返回一段jsx代码
    let renderMenu = (data: any[]) => {
      return data.map((item: any) => {
        // 菜单图标
        item.i = 'icon' + toLine(item[props.icon])
        // sub-menu
        let slots = {
          title: () => {
            return <>
              <item.i />
              <span>{ item[props.title] }</span>
            </>
          }
        }
        // 递归渲染children
        if (item[props.children] && item[props.children].length) {
          return (
            <el-sub-menu index={item[props.index]} v-slots={slots}>
              { renderMenu(item[props.children]) }
            </el-sub-menu>
          )
        }
        // 正常普通组件
        return (
          <el-menu-item index={item[props.index]}>
            <item.i />
            <span>{item[props.title]}</span>
          </el-menu-item>
        )
      })
    }
    let attrs = useAttrs()
    return () => {
      return (
        <el-menu
          class="el-menu-vertical-demo"
          default-active={props.defaultActive}
          router={props.router}
          {...attrs}
        >
          { renderMenu(props.data) }
        </el-menu>
      )
    }
  }
})