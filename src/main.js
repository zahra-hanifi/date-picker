import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/main.css'
import store from './store'
import globalMixin from "@/mixins/globalMixin";

Vue.config.productionTip = false
Vue.mixin(globalMixin)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
