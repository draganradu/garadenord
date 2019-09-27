<template>
  <div class='row'>
    <navHead
      :links='[
          ["Color Patterns","/colors"],
          [ $store.getters.todaysImgTitle, $store.getters.todaysImgurl],
          [">","/sitemap"],
        ]'
    />
    <div class='col' id='col-left'>
      <h1 class='row-span-all'>{{siteData.Sitetile}}</h1>
      <h2 class='row-span-all'>{{siteData.Subtitele}}</h2>
      <socialMedia
        class='row-span-all'
        :git='siteData.social.git'
        :facebook='siteData.social.facebook'
        :linkedin='siteData.social.linkedin'
      />
      <div
        v-for='(VremeData, VremeTitle) in VremeObiect'
        :key='VremeTitle'
        :class= "{'row-span-all col-count-2': (VremeTitle === 'special') }"
        class='segmentare-vreme'
      >
        <h3
          class="text-center text-uppercase"
          :class= "{'col-span-all': (VremeTitle === 'special') }"
        >
          <div
            class='segmentare-vreme-icon'
            v-html='require("!html-loader!./../assets/" + normWeatherName(VremeTitle) + ".svg")'
          ></div>
          <span>{{VremeTitle}}</span>
        </h3>
        <card
          v-for='(subValue, SubKey) in VremeData'
          :key='SubKey'
          :raw='SubKey'
          :disabled='subValue'
        />
      </div>
      <description
          v-if='(Object.keys(VremeObiect).length !== 0)'
          :description='siteData.description'
          :version='siteData.version'
      />
      <div
        class='segmentare-vreme error'
        v-if='(Object.keys(VremeObiect).length === 0)'
        v-for='(info, keyInfo) in $metaInfo.meta'
        :key='keyInfo'
      >
        <div class='error-icon'></div>
        <div class='error-text-1'></div>
        <div class='error-text-2'></div>
      </div>
    </div>
    <div class='col' id='col-right'>
      <rightImg :image='rutaimg' :baseUrl='baseUrl' />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import card from './../components/card'
import description from './../components/description'
import navHead from './../components/nav'
import rightImg from './../components/rightimg'
import siteData from './../api/site_data.json'
import socialMedia from './../components/social_media'
import { trimTags } from './../components/frame/helper'

export default {
  name: 'GaraDeNord',
  components: {
    card,
    description,
    navHead,
    rightImg,
    socialMedia,
  },
  data () {
    return {
      baseUrl:
        window.location.host.split(':').length > 1 ? 'http://localhost/garadenord/img' : window.location.origin + '/img',
      pickOfTheDay: {
        count: 0,
        title: '',
        url: ''
      },
      rutaimg: this.$route.path,
      siteData: siteData,
      VremeObiect: {},
    }
  },
  mounted () {
    let _this = this
    let prodUrl = _this.baseUrlRequest()

    axios.get(`${prodUrl}/VremePosibila.php`).then(response => {
      // initial posibile variants
      for (let i = 0; i < response.data.length; i++) {
        let temp = response.data[i].split('-')
        if (!_this.VremeObiect.hasOwnProperty(temp[0])) {
          _this.VremeObiect[temp[0]] = {}
        }
        _this.VremeObiect[temp[0]][response.data[i]] = false
      }

      axios.get(`${prodUrl}/VremeDisponibila.php`).then(response => {
        // set variables that are true
        _this.pickOfTheDay.count = _this.elementByYear(response.data.length)
        for (let i = 0; i < response.data.length; i++) {
          let temp = response.data[i].split('-')
          if (!_this.VremeObiect.hasOwnProperty(temp[0])) {
            _this.VremeObiect[temp[0]] = {}
          }
          _this.VremeObiect[temp[0]][response.data[i]] = true

          if (i === _this.pickOfTheDay.count) {
            this.$store.commit('setTodaysImg', response.data[i])
          }
        }
        // landing page
        if (_this.rutaimg === '/') {
          _this.rutaimg = _this.$store.getters.todaysImgurl
          _this.$router.push({ path: _this.$store.getters.todaysImgurl })
        } else {
          // e404 page
          let e404 = {}
          e404.fullRout = _this.rutaimg.replace('/', '')
          e404.sezon = e404.fullRout.split('-')[0]

          if (
            !_this.VremeObiect.hasOwnProperty(e404.sezon) ||
            !_this.VremeObiect[e404.sezon].hasOwnProperty(e404.fullRout) ||
            !_this.VremeObiect[e404.sezon][e404.fullRout]
          ) {
            _this.$router.push({ path: '/404' })
          } else {
            // force reactivity on other pages then landing page
            _this.$forceUpdate()
          }
        }
      })
    })

    // grayscale
    if (localStorage.getItem('grayscale') === 'true') {
      this.$store.commit('setGrayscale', true)
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

    elementByYear: function (arrayLength) {
      let settings = {
        time: {}
      }
      settings.time.current = new Date()
      settings.time.start = new Date(
        '1/1/' + settings.time.current.getFullYear()
      )
      settings.time.diff = Math.floor(
        (settings.time.current - settings.time.start) / (1000 * 60 * 60 * 24)
      )
      settings.time.daysInYear =
        settings.time.current.getFullYear() % 400 === 0 ||
        (settings.time.current.getFullYear() % 100 !== 0 &&
          settings.time.current.getFullYear() % 4 === 0)
          ? 366
          : 365
      return Math.floor(
        (settings.time.diff / settings.time.daysInYear) * arrayLength
      )
    },

    normWeatherName: function (input) {
      switch (input) {
        case 'vara':
          return 'soare'
        default:
          return input
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.fullPath === '/') {
        this.rutaimg = this.$store.getters.todaysImgurl
        this.$router.push({ path: this.$store.getters.todaysImgurl })
      } else {
        // e404
        let e404 = {}
        e404.fullRout = this.rutaimg.replace('/', '')
        e404.sezon = e404.fullRout.split('-')[0]

        if (
          !this.VremeObiect.hasOwnProperty(e404.sezon) ||
          !this.VremeObiect[e404.sezon].hasOwnProperty(e404.fullRout) ||
          !this.VremeObiect[e404.sezon][e404.fullRout]
        ) {
          this.$router.push({ path: '/404' })
        } else {
          this.rutaimg = to.fullPath
          // scroll to top if with of page is smaller then media query
          if (window.innerWidth < 1000) {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            })
          }
        }
      }
    }
  },
  metaInfo () {
    let _this = {
      meta: {
        title:
          this.$route.path
            .replace('/', '')
            .split('-')
            .join(' ')
            .toUpperCase() + ' | Gara de Nord',
        description: trimTags(siteData.description, 180),
        url: 'https://www.fotodex.ro' + this.$route.path
      }
    }
    return {
      title: _this.meta.title,
      htmlAttrs: {
        lang: 'ro'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: _this.description },

        // OG Tag
        { property: 'og:title', content: _this.meta.title },
        { property: 'og:site_name', content: 'Fotodex' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: _this.meta.url },
        { property: 'og:image', content: _this.baseUrl + _this.rutaimg },
        { property: 'og:description', content: _this.meta.description },

        // Twitter card
        { name: 'twitter:title', content: _this.meta.title },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: _this.meta.url },
        { name: 'twitter:description', content: _this.meta.description },
        { name: 'twitter:creator', content: '@fotodex.ro' },
        { name: 'twitter:image:src', content: _this.baseUrl + _this.rutaimg },

        // Google / Schema.org markup:
        { itemprop: 'name', content: _this.meta.title },
        { itemprop: 'description', content: _this.meta.description },
        { itemprop: 'image', content: _this.baseUrl + _this.rutaimg }
      ],
      link: [{ rel: 'canonical', href: _this.meta.url }]
    }
  }
}
</script>

<style lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Oswald:300,400,700&display=swap');

</style>
