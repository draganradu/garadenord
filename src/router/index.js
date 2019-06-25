import Vue from 'vue'
import Router from 'vue-router'
import genericPage from '@/pages/genericPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'genericPage',
      component: genericPage
    }
  ]
})
