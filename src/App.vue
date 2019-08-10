<template>
  <div id='app' class='container-fluid'>
    <router-view />
  </div>
</template>

<script>
import siteData from './api/site_data.json'
import siteHistory from './components/History'

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
        { name: 'description', content: siteData.description },
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
body {
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  font-size: 25px;
  line-height: 1;
}

h1 {
  font-weight: 800;
  margin-bottom: 0;
  line-height: 0.9;
  font-size: 100px;
  text-transform: uppercase;
  max-width: 450px;
}

h2 {
  margin-bottom: 60px;
}

.btn {
  margin-right: 2px;
  margin-bottom: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>
