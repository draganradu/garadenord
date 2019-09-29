<template>
  <div id='page-all'>
    <div
      class="page-all-item"
      v-for="(item, index) in vreme"
      :key="index"
      v-bind:style="{
        backgroundImage: 'url(' + baseUrl + '/' +  item + '.jpg)',
        backgroundPositionX: (index / vreme.length) * 100 + '%' }">
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import { baseLineUrl } from './../components/frame/helper'

export default {
  name: 'AllPage',
  data () {
    return {
      vreme: [],
      baseUrl: (window.location.host.split(':').length > 1) ? 'http://localhost/garadenord/dist/img' : window.location.origin + '/img',

    }
  },

  mounted () {
    let _this = this

    axios.get(`${baseLineUrl}/VremeDisponibila.php`).then(response2 => {
      _this.vreme = response2.data
    })
  }
}
</script>
<style lang="scss" scoped>
#page-all {
  display: flex;
  width: 100%;
  height: 100vh;
  & > div {
    flex-grow: 1;
  }
}
</style>
