import Vue from 'vue'
import Router from 'vue-router'
import standardPage from '@/pages/standard'
import error404 from '@/pages/404'
import pageDev from '@/pages/dev'
import pageColors from '@/pages/colors'
import allHorizontalPage from '@/pages/allhorizontal'
import allPage from '@/pages/all'
import allicons from '@/pages/allicons'
import map from '@/pages/map'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // --- error -----------------------
    {
      path: '/404',
      name: 'error404',
      component: error404
    },
    // --- sitemap -----------------------
    {
      path: '/sitemap',
      name: 'map',
      component: map
    },
    // --- page -----------------------
    {
      path: '/colors',
      name: 'pageColors',
      component: pageColors
    },
    {
      path: '/dev',
      name: 'pageDev',
      component: pageDev
    },
    {
      path: '/all/horizontalCarusel',
      name: 'allPageHorizontal',
      component: allHorizontalPage
    },
    {
      path: '/all',
      name: 'allPage',
      component: allPage
    },
    // --- test -----------------------
    {
      path: '/test',
      name: 'allicons',
      component: allicons
    },
    // --- standard -----------------------
    {
      path: '/:id',
      name: 'standardPage',
      component: standardPage
    },
    {
      path: '/',
      name: 'LandingPageRedirected',
      component: standardPage
    }
  ]
})
