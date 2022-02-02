import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
// import mUI from './components'
// import mUI from '../lib/air-element-components.es'
// import '../lib/style.css'
import chooseIcon from '../lib/chooseIcon/index.es'
import '../lib/chooseIcon/style.css'
import './mock'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(chooseIcon)
app.mount('#app')
