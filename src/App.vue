<template>
  <div id='app' class='container-fluid'>
    <router-view />
  </div>
</template>

<script>
import siteData from './api/site_data.json'
import siteHistory from './components/History'
import { trimTags } from './components/frame/helper'

export default {
  name: 'app',
  metaInfo () {
    // --- Defaltu meta tags
    return {
      htmlAttrs: {
        lang: 'ro'
      },
      title: siteData.Sitetile + ' | ' + siteData.Subtitele,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: trimTags(siteData.description, 180) },
        { rel: 'favicon', href: 'http://fotodex.ro/favicon.ico' }
      ]
    }
  },
  watch: {
    $route (to, from) {
      siteHistory.methods.set(to)
    }
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Oswald:300,400,700&display=swap');
@import './theme/root.scss';
//-- typography

h1 {
  margin-bottom: 0;
  font-size: 100px;
  max-width: 450px;
}

h2 {
  margin-bottom: 60px;
}

// .fade-enter-active,
// .fade-leave-active {
//   transition-duration: 0.3s;
//   transition-property: opacity;
//   transition-timing-function: ease;
// }

// .fade-enter,
// .fade-leave-active {
//   opacity: 0
// }

</style>
