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
        v-for='(item, index) in page'
        :key='index'
        tag='li'
        class='link'
        :to="{path: '/' + item}"
      >/{{item}}</router-link>
      <hr />
      <em>Files</em>
    </div>
    <div class='c-4'>
      <em>Errors</em>
      <router-link
        v-for='(item, index) in error'
        :key='index'
        tag='li'
        class='link'
        :to="{path: '/' + item}"
      >/{{item}}</router-link>
      <hr />
      <em>Tests</em>
      <router-link
        v-for='(item, index) in test'
        :key='index'
        tag='li'
        class='link'
        :to="{path: '/' + item}"
      >/{{item}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'siteMap',
  data () {
    return {
      main: ['A', 'B'],
      page: ['sitemap', 'color', 'dev', 'all', 'all/horizontalCarusel'],
      error: ['e404'],
      test: ['test']
    }
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
