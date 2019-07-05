import Vue from 'vue'
import Router from 'vue-router'
import standardPage from '@/pages/standard'
import e404 from '@/pages/404'
import dev from '@/pages/dev'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/404',
      name: 'e404',
      component: e404
    },
    {
      path: '/dev',
      name: 'dev',
      component: dev
    },
    {
      path: '*',
      name: 'standardPage',
      component: standardPage
    }
  ]
})
