<template>
  <div id='page-all-test'>
    <div
      class="page-all-item"
      v-for="(item, index) in vreme"
      :key="index" >
        <icon :weatherArray="item.split('-')" />
        <h5>{{item.split('-').join(' ')}}</h5>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import icon from './../components/icon'
import { baseLineUrl } from '../components/frame/helper'

export default {
  name: 'AllPage',
  components: {
    icon
  },
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

      axios.get(`${baseLineUrl}/VremePosibila.php`).then(response1 => {
        _this.vreme = _this.vreme.concat(response1.data)
      })
    })
  }
}
</script>
<style lang="scss">

$t-cols: 10;
$t-padding: 8vw;
$t-gap: 1vw;
$t-col-size: ((100vw - ($t-gap * ($t-cols - 1)) - (2 * $t-padding)) / $t-cols) ;

#page-all-test {
  display: grid;
  grid-template-columns: repeat($t-cols,1fr);
  grid-gap: $t-gap;
  padding: $t-padding;
  .page-all-item {
    position: relative;
    text-align: center;
  }

  .iconb {
    float: none;
    display: inline-block;
    position: relative;
    margin-right: 0;

    & > div {
      position: relative;
    }

    & svg,
    & use,
    & {
      width: $t-col-size;
      height: $t-col-size;
    }
  }
}
</style>
