import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  navMenu,
  lnfiniteScroll,
  porttableVideo,
  waterfall,
  tabList
} from '@packages'

Vue.use(Element)
Vue.use(navMenu)
Vue.use(lnfiniteScroll)
Vue.use(porttableVideo)
Vue.use(waterfall)
Vue.use(tabList)

Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
