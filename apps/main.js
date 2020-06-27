import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import {
  navMenu,
  lnfiniteScroll,
  porttableVideo,
  waterfall
} from '@packages/index'

Vue.use(navMenu)
Vue.use(lnfiniteScroll)
Vue.use(porttableVideo)
Vue.use(waterfall)

Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
