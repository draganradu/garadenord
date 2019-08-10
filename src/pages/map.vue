<template>
  <div id='map-page'>
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
  methods: {
    baseUrlRequest: function () {
      if (window.location.host.split(':').length === 1) {
        // production realrequest
        return window.location.origin + '/static/api'
      } else {
        // dev mock request
        let builtUrl = window.location.origin.split(':')
        builtUrl.pop()
        return builtUrl.join(':') + '/garadenord/src/api'
      }
    },
  },
  mounted () {
    let _this = this
    let prodUrl = _this.baseUrlRequest()
    axios.get(`${prodUrl}/VremeDisponibila.php`).then(response2 => {
      _this.main = response2.data
    })
  },
  metaInfo () {
    let _this = {
      meta: {
        title: 'SiteMap | Gara de Nord',
        description: 'radu',
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
#map-page {
  padding: 10vw;
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  h2 {
    font-size: 30px;
    margin-bottom: 10px;
  }

  em {
    font-weight: 400;
  }

  hr,
  em,
  li {
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  hr {
    margin-top: 10px;
    margin-bottom: 10px;
    max-width: 50%;
  }
}

@for $i from 1 through 12 {
  .c-#{$i} {
    grid-column: span #{$i};
  }
  .r-#{$i} {
    grid-row: span #{$i};
  }
}
</style>
