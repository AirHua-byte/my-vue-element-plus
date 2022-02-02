import { App } from "vue"
import chooseIcon from './chooseIcon'
import chooseArea from "./chooseArea"
import trend from './trend'
import notification from './notification'
import list from './list'
import menu from './menu'
import chooseTime from "./chooseTime"
import progress from "./progress"
import chooseCity from "./chooseCity"
import form from "./form"
import modalForm from "./modalForm"
import table from "./table"
import calendar from "./calendar"
import { toLine } from './utils'
import './styles/base.scss'
import './styles/ui.scss'
import * as Icons from '@element-plus/icons-vue'

const components = [
  chooseIcon,
  chooseArea,
  trend,
  notification,
  list,
  menu,
  chooseTime,
  progress,
  chooseCity,
  form,
  modalForm,
  table,
  calendar
]

export default {
  install(app: App) {
    for (let i in Icons) {
      app.component(`icon${toLine(i)}`, (Icons as any)[i])
    }
    components.map((item: any) => {
      app.use(item)
    })
  }
}
