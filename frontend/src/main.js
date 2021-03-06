// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

//add fontawesome
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

//add vue trend
import Trend from 'vuetrend'
Vue.use(Trend)

//add vue trend chart
import TrendChart from "vue-trend-chart";
Vue.use(TrendChart);

//add echart
import echarts from 'echarts'
Vue.use(echarts);

//add vue-echarts
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
Vue.component('chart', ECharts)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
