import Vue from "vue";
import Router from "vue-router";

import Home from "./view/Home.vue";
import About from "./view/About.vue";
import Error from "./view/Error.vue";
import CoinDetail from "./view/CoinDetail.vue";

Vue.use(Router)

export default new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/coin/:id',
      name: 'CoinDetail',
      component: CoinDetail,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '*',
      name: 'error',
      component: Error,
    }
  ]
})

