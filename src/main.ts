import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
// import mUI from './components'
import mUI from '../lib/index.es'
import '../lib/style.css'
import './mock'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(mUI)
app.mount('#app')
