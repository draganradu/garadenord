<template>
  <div id='page-all'>
    <div
      class="page-all-item"
      v-for="(item, index) in vreme"
      :key="index" >
        <div
        class="page-all-background-img"
        v-bind:style="{
        backgroundImage: 'url(' + baseUrl + '/' +  item + '.jpg)'}" >
        </div>
        <h5>{{item.split('-').join(' ')}}</h5>
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
  display: grid;
  grid-template-columns: repeat(9,1fr);
  grid-gap: 10px;
  padding: 50px;
  & > div {
    .page-all-background-img {
      width: 100%;
      height: 190px;
      background-size: cover;
    }
  }
}
</style>
