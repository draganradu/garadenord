<template>
    <div class="row">
      <div class="col row-2" id='col-left'>
          <h1 class='row-span-all'>{{siteData.Sitetile}}</h1>
          <h2 class='row-span-all'>{{siteData.Subtitele}}</h2>
          <!-- <button  v-on:click='delyarna'>delete yarna</button> -->
          <div
            v-for="(VremeData, VremeTitle) in VremeObiect" :key="VremeTitle"
            class='segmentare-vreme'>
            <h3>{{VremeTitle}}</h3>
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
import siteData from './../data/site_data.json'

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
    axios.get('http://localhost/gara-vue/src/data/VremePosibila.php')
      .then(response => {
        // initial posibile variants
        for (let i = 0; i < response.data.length; i++) {
          let temp = response.data[i].split('_')
          if (!_this.VremeObiect.hasOwnProperty(temp[0])) {
            _this.VremeObiect[temp[0]] = {}
          }
          _this.VremeObiect[temp[0]][response.data[i]] = false
        }

        axios.get('http://localhost/gara-vue/src/data/VremeDisponibila.php')
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
              // force reactivity on other pages then landing page
              _this.$forceUpdate()
            }
          })
      })
  },
  methods: {
    randomElement: function (array) {
      let randTemp = Math.floor(Math.random() * array.length)
      return array[randTemp]
    },

    delyarna: function () {
      console.log(this.VremeObiect.primavara.primavara_dimineata_senin)
      this.VremeObiect.primavara.primavara_dimineata_senin = false
      this.$forceUpdate()
    }
  },
  watch: {
    $route (to, from) {
      if (to.fullPath === '/') {
        this.rutaimg = this.fallback
        this.$router.push({ path: '/' + this.fallback })
      } else {
        this.rutaimg = to.fullPath
      }
    }
  }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
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
   page-break-inside: avoid;
  h3 {
    border-width: 1px 0;
    border-color: gray;
    border-style: solid;
    color: gray;
    text-transform: uppercase;
    text-transform: uppercase;
    padding-top: 10px;
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
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
