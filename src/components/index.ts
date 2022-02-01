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
    components.map(item => {
      app.use(item)
    })
  }
}