import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
// use: 使用插件 对象或者是函数 函数名必须交install 或者对象里面有个属性是函数 名字叫install
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
