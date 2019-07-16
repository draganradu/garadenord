import Vue from 'vue'
import Router from 'vue-router'
import standardPage from '@/pages/standard'
import e404 from '@/pages/404'
import dev from '@/pages/dev'
import colors from '@/pages/colors'
import allHorizontalPage from '@/pages/allhorizontal'
import allPage from '@/pages/all'
import allicons from '@/pages/allicons'

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
      path: '/colors',
      name: 'colors',
      component: colors
    },
    {
      path: '/all/horizontal',
      name: 'allPageHorizontal',
      component: allHorizontalPage
    },
    {
      path: '/all',
      name: 'allPage',
      component: allPage
    },
    {
      path: '/test',
      name: 'allicons',
      component: allicons
    },
    {
      path: '*',
      name: 'standardPage',
      component: standardPage
    }
  ]
})
