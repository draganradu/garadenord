<template>
    <div class="row">
      <div class="col row-2" id='col-left'>
          <h1 class='row-span-all'>{{siteData.Sitetile}}</h1>
          <h2 class='row-span-all'>{{siteData.Subtitele}}</h2>
          <!-- <button  v-on:click='delyarna'>delete yarna</button> -->
          <div
            v-for="(VremeData, VremeTitle) in VremeObiect" :key="VremeTitle"
            class='segmentare-vreme'>
            <h3>
              <div class='segmentare-vreme-icon' v-html="require('!html-loader!./../assets/'+ testa(VremeTitle) +'.svg')"></div>
              <span>{{VremeTitle}}</span>
            </h3>
            <card
              v-for="(subValue, SubKey) in VremeData" :key="SubKey"
              :raw="SubKey"
              :disabled="subValue"
            />
          </div>
      </div>
      <div class="col" id='col-right'>
          <rightImg :image="rutaimg" />
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import card from './../components/card'
import rightImg from './../components/rightimg'
import siteData from './../api/site_data.json'

export default {
  name: 'GaraDeNord',
  components: {
    card,
    rightImg
  },
  data () {
    return {
      VremePosibila: [],
      VremeDisponibila: [],
      VremeObiect: {},
      fallback: '',
      rutaimg: this.$route.path,
      siteData: siteData
    }
  },
  mounted () {
    let _this = this
    let prodUrl = _this.baseUrlRequest()

    axios.get(`${prodUrl}/VremePosibila.php`)
      .then(response => {
        // initial posibile variants
        for (let i = 0; i < response.data.length; i++) {
          let temp = response.data[i].split('_')
          if (!_this.VremeObiect.hasOwnProperty(temp[0])) {
            _this.VremeObiect[temp[0]] = {}
          }
          _this.VremeObiect[temp[0]][response.data[i]] = false
        }

        axios.get(`${prodUrl}/VremeDisponibila.php`)
          .then(response => {
            // set variables that are true
            for (let i = 0; i < response.data.length; i++) {
              let temp = response.data[i].split('_')
              if (!_this.VremeObiect.hasOwnProperty(temp[0])) {
                _this.VremeObiect[temp[0]] = {}
              }
              _this.VremeObiect[temp[0]][response.data[i]] = true
            }
            if (_this.rutaimg === '/') {
              _this.fallback = this.randomElement(response.data)
              _this.rutaimg = _this.fallback
              _this.$router.push({ path: '/' + _this.fallback })
            } else {
              // e404
              let e404 = {}
              e404.fullRout = _this.rutaimg.replace('/', '')
              e404.sezon = e404.fullRout.split('_')[0]

              if (!_this.VremeObiect.hasOwnProperty(e404.sezon) || !_this.VremeObiect[e404.sezon].hasOwnProperty(e404.fullRout) || !_this.VremeObiect[e404.sezon][e404.fullRout]) {
                _this.$router.push({ path: '/404' })
              } else {
                // force reactivity on other pages then landing page
                _this.$forceUpdate()
              }
            }
          })
      })
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

    randomElement: function (array) {
      let randTemp = Math.floor(Math.random() * array.length)
      return array[randTemp]
    },

    delyarna: function () {
      console.log(this.VremeObiect.primavara.primavara_dimineata_senin)
      this.VremeObiect.primavara.primavara_dimineata_senin = false
      this.$forceUpdate()
    },

    testa: function (input) {
      switch (input) {
        case 'vara': return 'soare'
        default: return input
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.fullPath === '/') {
        this.rutaimg = this.fallback
        this.$router.push({ path: '/' + this.fallback })
      } else {
        // e404
        let e404 = {}
        e404.fullRout = this.rutaimg.replace('/', '')
        e404.sezon = e404.fullRout.split('_')[0]

        if (!this.VremeObiect.hasOwnProperty(e404.sezon) || !this.VremeObiect[e404.sezon].hasOwnProperty(e404.fullRout) || !this.VremeObiect[e404.sezon][e404.fullRout]) {
          this.$router.push({ path: '/404' })
        } else {
          this.rutaimg = to.fullPath
        }
      }
    }
  }
}
</script>

<style lang="scss">
// @import 'node_modules/bootstrap/scss/bootstrap';
// @import 'node_modules/bootstrap-vue/src/index.scss';
@import url('https://fonts.googleapis.com/css?family=Oswald:300,400,700&display=swap');

//-- typography
body {
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 1;
}
  h1 {
    font-weight: 800;
    margin-bottom: 0;
    line-height: 0.9;
    font-size: 100px;
    text-transform: uppercase;
    max-width: var(--body-width);
  }

  h2 {
    margin-bottom: 60px;
  }

#col-left {
  max-width: var(--body-width);
}

.segmentare-vreme {
    $font-size: 10px;
    $iconsize: 120px;
    $show: 0.7;
    $line: 2px;

   page-break-inside: avoid;
  h3 {
    // border-width: 1px 0;
    // border-color: gray;
    // border-style: solid;
    color: gray;
    text-transform: uppercase;
    text-transform: uppercase;
    text-align: center;
    padding: ($iconsize * $show) 0 0;
    margin-bottom: ($iconsize / 3);
    font-size: $font-size;
    letter-spacing: 2px;
    position: relative;
    overflow: hidden;
    span {
      background-color: white;
      position: relative;
      padding: 0 10px;
      z-index: 3;
    }
    &:before {
      content: '';
      background-color:gray;
      position: absolute;
      bottom: ($font-size /2 );
      left: 0;
      right: 0;
      height: $line;
      z-index: 2;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: 0%;
      right: 0;
      left: 0;
      height: ($font-size /2);
      background-color: white;
      z-index: 1;
    }
  }

  &-icon {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, ((1 - $show) * 100%));
    &,
    & svg {
      width: $iconsize;
      height: $iconsize;
    }

    svg {
      path,
      circle,
      polyline,
      line {
        fill: transparent!important;
        stroke: gray!important;
        stroke-width: ($line / ($iconsize / 50px));
      }
    }
  }
}
.btn {
  margin-right: 2px;
  margin-bottom: 2px;
}

.row-2 {
  column-count: 2;
}

.row-span-all {
  column-span: all;
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
