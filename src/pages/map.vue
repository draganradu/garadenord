<template>
  <div id='map-page' class='page'>
    <div class='c-12'>
      <h2>Landing page</h2>
    </div>
    <div class='c-4'>
      <em>Main</em>
      <router-link
        v-for='(item, index) in main'
        :key='index'
        tag='li'
        class='link'
        :to='{path: "/" + item}'
      >/{{item}}</router-link>
    </div>
    <div class='c-4'>
      <em>Pages</em>
      <router-link
        v-for='(itemB, indexB) in page'
        :key='indexB.name'
        tag='li'
        class='link'
        :to="{path: itemB.path}"
      >/{{itemB.name}}</router-link>
      <hr />
      <em>Files</em>
    </div>
    <div class='c-4'>
      <div>
        <em>Errors</em>
      <router-link
        v-for='(itemB, indexB) in errorPage'
        :key='indexB.name'
        tag='li'
        class='link'
        :to="{path: itemB.path}"
      >/{{itemB.name}}</router-link>
      </div>
      <hr />
      <em>Tests</em>
      <router-link
        v-for='(itemB, indexB) in testPage'
        :key='indexB.name'
        tag='li'
        class='link'
        :to="{path: itemB.path}"
      >/{{itemB.name}}</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { baseLineUrl } from '../components/frame/helper'
export default {
  name: 'siteMap',
  data () {
    let routerPages = this.$router.options.routes
    return {
      raw: routerPages,
      main: [],
      page: routerPages.filter(data => data.name.startsWith('page')),
      errorPage: routerPages.filter(data => data.name.startsWith('error')),
      testPage: routerPages.filter(data => data.name.startsWith('test'))
    }
  },
  mounted () {
    let _this = this

    axios.get(`${baseLineUrl}/VremeDisponibila.php`).then(response2 => {
      _this.main = response2.data
      console.log('-----------------------------')
      console.log(response2)
      console.log('-----------------------------')
      console.log(response2.data)
      console.log('-----------------------------')
    })
  },
  metaInfo () {
    let _this = {
      meta: {
        title: 'SiteMap | Gara de Nord',
        url: 'https://www.fotodex.ro' + this.$route.path
      }
    }

    return {
      title: _this.meta.title,
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
