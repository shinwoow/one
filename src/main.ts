import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/resetUI.scss'
import "@/assets/font/iconfont.css"
import axios from "@/axios/index.ts"

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.prototype.$api = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
