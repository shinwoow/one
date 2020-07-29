import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/resetUI.scss'
import "@/assets/font/iconfont.css";

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
