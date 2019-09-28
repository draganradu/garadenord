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
export default {
  name: 'AllPage',
  data () {
    return {
      vreme: [],
      baseUrl: (window.location.host.split(':').length > 1) ? 'http://localhost/garadenord/dist/img' : window.location.origin + '/img',
    }
  },
  methods: {
    baseUrlRequest: function () {
      if (window.location.host.split(':').length === 1) {
        // production realrequest
        return window.location.origin + '/dinamic'
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
