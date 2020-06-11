import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VCharts from 'v-charts'

import echarts from 'echarts'
import 'echarts/map/js/china.js'
import './assets/common.less'

import dataV from '@jiaminghi/data-view'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(dataV)
Vue.use(VCharts)
Vue.use(VueResource)

new Vue({
  render: h => h(App)
}).$mount('#app')
