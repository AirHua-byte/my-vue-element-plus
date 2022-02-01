import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from './utils'
import mUI from './components'
import './mock'

const app = createApp(App)

for (let i in Icons) {
  app.component(`icon${toLine(i)}`, (Icons as any)[i])
}

app.use(router)
app.use(ElementPlus)
app.use(mUI)
app.mount('#app')
