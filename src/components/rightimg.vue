<template>
  <div>
      <colorBar
        class="landing-colorbar"
        :color="ColorPatterns[image.replace('/', '')]"
        :grayscale="$store.getters.grayscale"
      ></colorBar>
    <div
      v-show="fullScreen"
      v-on:click="fullScreenView"
      id='full-screen'>
      <div
        class='fullscreen-img'
        v-bind:style="{ backgroundImage: 'url(' + baseUrl +  image + '.jpg)' }">
      </div>
      <colorBar
        :color="ColorPatterns[image.replace('/', '')]"
        :grayscale="$store.getters.grayscale"
      ></colorBar>
      <div id='fullscreen-overlay-img'>
        <icon :weatherArray="image.replace('/', '').split('-')" :key='image'/>
        <p>{{image.split('-').join(' ').replace('/', '')}}</p>
      </div>
    </div>
    <div
      v-if="(image !== '/')"
      class="right-img"
      v-bind:class="{ grayscale: $store.getters.grayscale }"
      v-bind:style="{ backgroundImage: 'url(' + baseUrl +  image + '.jpg)' }"
      v-on:click="fullScreenView"
    >
      <div id='overlay-img'>
        <icon :weatherArray="image.replace('/', '').split('-')" :key='image'/>
        <p>{{image.split('-').join(' ').replace('/', '')}}</p>
      </div>
    </div>
    <div
      v-else
      class="right-img error"
      v-html="require(`!html-loader!./../assets/gara-outline.svg`)">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import icon from './icon'
import colorBar from './../components/color_bar'
import { baseLineUrl } from './../components/frame/helper'

export default {
  components: {
    icon,
    colorBar,
  },
  name: 'rightimg',
  props: [
    'image',
    'baseUrl'
  ],
  data () {
    return {
      fullScreen: false,
      ColorPatterns: {},
    }
  },
  methods: {
    fullScreenView: function () {
      this.fullScreen = !this.fullScreen
      if (this.fullScreen) {
        document.getElementById('app').classList.add('fullscreen')
      } else {
        document.getElementById('app').classList.remove('fullscreen')
      }
    },
    rgbToHex: function (r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    },
  },
  mounted () {
    let _this = this

    // color pattern data for color bars
    axios.get(`${baseLineUrl}/colorPattern.json`).then(response => {
      _this.ColorPatterns = response.data
    })
  },
  watch: {
    fullScreen: function (val) {
      if (val) {
        let temp = {
          text: this.image.replace('/', '').replace(/-/g, ' ').toUpperCase(),
          baseColor: this.ColorPatterns[this.image.replace('/', '')],
          textOutput: ''
        }

        temp.textOutput += 'Culoare dominanta pentru ' + temp.text + ' este #' + this.rgbToHex(temp.baseColor.domniant[0], temp.baseColor.domniant[1], temp.baseColor.domniant[2])

        for (let i in temp.baseColor.pattern) {
          temp.textOutput += '\n' + parseInt(parseInt(i) + 2) + ' | #' + this.rgbToHex(temp.baseColor.pattern[i][0], temp.baseColor.pattern[i][1], temp.baseColor.pattern[i][2])
        }

        console.log(temp.textOutput)
        console.log(this)
      }
    }
  }
}
</script>

<style lang="scss">
  @import './../theme/variables.scss';

  #col-right {
     @media (max-width: ($body-width * 2) ){
        position: absolute;
        left: 0;
        right: 0;
        bottom: (100vh - $img-phanel);
        top: 0;
      }

    .right-img {
      background-size: cover;
      position: fixed;
      right: 0;
      left: var(--body-width);
      top: 0;
      bottom: 0;
      text-align: right;
      padding: 20px;
      background-position: center;
      transition: 1.5s ease-in-out;

      @media (max-width: ($body-width * 2) ){
        background-attachment: fixed
      }

      &:after {
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 80%;
      }

      @media (max-width: ($body-width * 2) ){
        position: absolute;
        left: 0;
      }

      &:hover > #overlay-img {
        opacity: 1;
      }

      #overlay-img {
        $size: 100px;

        transition: 0.5s;
        opacity: 0;
        display: inline-block;
        background-color: var(--color-one);
        padding: ($size * 0.1);
        position: relative;
        width: ($size * 1.2);
        text-align: center;

        .iconb {
          float: none;
          display: inline-block;

          & svg,
          & {
            width: $size;
            height: $size;
          }
        }
      }

      &.error {
        display: flex;
        padding: 0;

        svg {
          margin: auto;
          flex-grow: 1;
        }
      }
    }
  }

  .grayscale {
    filter: grayscale(100%);
  }

  #full-screen {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    padding: 5vw;
    background-color: var(--color-one);

    @media (orientation: landscape) {
      padding: 2vw;
    }

    .fullscreen-img {
      width: 100%;
      height: 82vh;
      background-size: cover;
      background-position: center center;
      margin-bottom: 5vw;

      @media (orientation: landscape) {
        height: 80vh;
        margin-bottom: 3vw;
      }
    }

    .color-bar {
      left: 4.5vw;
      right: 4.5vw;
      top: calc(82vh + 5vw + 1vw);
      bottom: unset;
      height: 5vw;
      padding: 0;
      flex-direction: row;
      width: auto;

      @media (orientation: landscape) {
        top: calc(83vh);
        height: 2vw;
        left: 1.5vw;
        right: 1.5vw;
      }

      & .color-element {
        height: auto;
        margin: 0.5vw;
        width: auto;
        flex-grow: 1;
      }
    }

    #fullscreen-overlay-img {
      padding-top: 5vw;
      @media (orientation: landscape) {
        padding-top: 0vw;
      }

      .iconb {
        margin-right: 3vw;
        margin-top: -1vw;

        @media (orientation: landscape) {
          margin-top: -4vw;
        }

        &, & svg {
          height: 15vw;
          width: 15vw;

          @media (orientation: landscape) {
            height: 8vw;
            width: 8vw;
          }
        }
      }
    p {
        font-size: 5.5vw;
        line-height: 1;
        text-transform: uppercase;
        max-width: 50vw;
        color: var(--color-three);

        @media (orientation: landscape) {
          font-size: 2vw;
          max-width: inherit;
          margin-top: 4vw;
        }
      }
    }

  }

  #app.fullscreen {
    #col-left {
      display: none;
    }
  }
</style>
