import Vue from "vue";
import App from "./App.vue";
import './assets/css/tailwind.css'
import Router from './Router';
import {dollarFilter, percentFilter} from './filter.js';

import Chartick from 'vue-chartkick';
import Chart from "chart.js";
import {VueSpinners} from '@saeris/vue-spinners';

Vue.config.productionTip = false;
Vue.filter('dollar', dollarFilter)
Vue.filter('percent', percentFilter)
Vue.use(Chartick.use(Chart))
Vue.use(VueSpinners)

new Vue({
  router: Router,
  render: (h) => h(App),
}).$mount("#app");

