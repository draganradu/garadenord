<template>
<div
  class='iconb'
  :class= 'icons.join(" ")'>
  <div
    v-for="(item,index) in icons"
    :key="index"
    :class='item'
    v-html="require(`!html-loader!./../assets/${item}.svg`)"></div>
  </div>
</template>

<script>
export default {
  name: 'weatherIcon',
  data () {
    return {
      icons: this.weatherFilter(this.weatherArray),
    }
  },
  props: [
    'weatherArray'
  ],
  methods: {
    weatherFilter (arrayOfWeather) {
      let temp = []
      arrayOfWeather.forEach(elementofWeather => {
        let eTemp = this.normalizeWatherIcon(elementofWeather)
        if (eTemp) {
          if (Array.isArray(eTemp)) {
            temp = temp.concat(eTemp)
          } else {
            temp.push(eTemp)
          }
        }
      })
      temp = this.cleanAndOrderIcons(temp, arrayOfWeather)
      return temp
    },
    normalizeWatherIcon (weather) {
      switch (weather) {
        case 'special':
        case 'ceata':
        case 'primavara':
        case 'toamana':
        case 'iarna':
          return weather
        case 'night':
        case 'noapte':
        case 'ora':
          return 'luna'
        case 'vara':
          return 'soare'
        case 'inorat':
        case 'innorat':
          return 'nor'
        case 'ploaie':
          return ['nor', 'ploaie']
        case 'ninsoare':
          return ['nor', 'ninsoare']
        case 'dimineata':
        case 'seara':
        case 'apus':
          return 'dim_seara'
        case 'toamna':
          return 'toamna'
        default:
          return false
      }
    },

    cleanAndOrderIcons (arrayIcons, arrayOfWeather) {
      // remove moon if sun and moon icon are present except for magic houre and blue houre
      if (arrayIcons.indexOf('soare') > -1 && arrayIcons.indexOf('luna') > -1 && arrayOfWeather.indexOf('ora') === -1) {
        arrayIcons = arrayIcons.filter(icon => icon !== 'soare')
      }

      // fix ora de aur
      if ((arrayOfWeather.indexOf('ora') > -1 && arrayIcons.indexOf('luna') > -1 && arrayIcons.indexOf('iarna') > -1) || (arrayOfWeather.indexOf('ora') > -1 && arrayIcons.indexOf('luna') > -1 && arrayIcons.indexOf('toamna') > -1)) {
        arrayIcons.splice(arrayIcons.indexOf('luna'), 0, 'soare')
      }

      // put moring/eavning icon first
      if (arrayIcons.indexOf('dim_seara') > -1) {
        arrayIcons.splice(arrayIcons.indexOf('dim_seara'), 1)
        arrayIcons.push('blockout')
        arrayIcons.push('dim_seara')
        // invert for seara
        if (arrayOfWeather.indexOf('seara') > -1 || arrayOfWeather.indexOf('apus') > -1) {
          arrayIcons.push('scenariob')
        }
        if (arrayIcons.indexOf('nor') > -1) {
          arrayIcons.splice(arrayIcons.indexOf('nor'), 1)
          arrayIcons.push('nor')
        }
      }
      return arrayIcons
    }

  }
}
</script>
<style lang="scss">
@mixin svgScale($scale){
  transform: scale($scale);
  stroke-width: (1 / $scale)
}

.iconb {
    float:left;
    height: 50px;
    width: 50px;
    overflow: hidden;
    margin-right: 10px;
    &, & > * {
      position: relative;
    }
    svg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    //color ---------------------------------
    path,
    circle,
    polyline,
    line {
        stroke: var(--color-three);
        fill: transparent;
    }

    // ----- cutout ---
    .cutout {
        fill: var(--color-one);
        polyline,
        path {
            stroke: transparent!important;
        }
    }
    // ----- blockoutplate ---
    .blockout {
      rect {
        fill: var(--color-one);
      }
    }

    &.scenariob {
      .scenariob {
        display: none;
      }

      &.dim_seara {
        .blockout,
        .dim_seara {
          transform: rotate(180deg);
        }
        .dim_seara {
          top: 100%;
        }
        .blockout {
          top: 55%;
        }
      }
    }
    //invert --------------------------------------
    .router-link-exact-active &,
    .card:hover & {
        path,
        circle,
        polyline,
        line {
            fill: transparent;
            stroke: var(--color-one);
        }

        .cutout {
            fill: var(--color-three);
            polyline,
            path {
                stroke: transparent!important;
            }
        }

        // ----- nor ---
        .nor {
          path {
            fill: var(--color-one);
            stroke: var(--color-three);
          }
      }

      .blockout {
        rect {
          fill: var(--color-three);
        }
      }
    }

    // ------ customization
    @mixin svgScale($scale){
      transform: scale($scale);
      stroke-width: (1 / $scale)
    }

    // ----- cutout ---
    #cutout {
      path {
        fill: var(--color-one);
        stroke: transparent;
      }
    }

    // ------ nor ----
    &.nor {
      .nor {
        left: 15%;
        top: 10%;
        path {
          fill: var(--color-one);
        }
      }
      .ninsoare,
      .ploaie {
        bottom: -10%;
        left: 13%;
      }
    }
    // ------ ceata ----
    .router-link-exact-active &,
    .card:hover & {
      .ceata {
        #cutout {
          path {
            fill: var(--color-three);
          }
        }
      }
     }
    // ------ Ora de aur sau ora albastra ----
     &.soare.luna {
       .soare {
         circle {
           fill: var(--color-one);
         }
       }
     }
    // ------ primavara ----
    &.primavara.noapte {
      #seara,
      #dimineata {
        display: block;
        fill: var(--color-three);
      }
      .luna {
        z-index: 1;
        @include svgScale(0.7);
        path {
          fill: var(--color-one);
        }
      }
    }
    &.primavara {
      #seara,
      #dimineata {
        display: none;
        stroke: transparent!important;
      }
    }
    &.primavara.dimineata {
      #dimineata {
        display: block;
        fill: var(--color-three);
      }
    }
    // ------ vara -----

    // ------ toamna ----
    &.toamna.luna {
      .luna {
        path {
          fill: var(--color-one);
        }
      }
    }

    // ------ iarna ----
    &.iarna.luna {
      .luna {
        path {
          fill: var(--color-one);
            .router-link-exact-active &,
            .card:hover & {
              fill: var(--color-three);
            }
        }
      }
    }
    // ------ noapte ----
    &.noapte.ploaie,
    &.noapte.innorat {
      .luna {
        z-index: 10;
        path {
          fill: var(--color-one);
        }
      }
      .nor {
        @include svgScale(0.7);
        position: absolute;
        top: -7%;
        right: -10%;

        &.l4 {
          left: unset;
          right: 24%;
          z-index: 15;
          top: 12%;
        }
      }
    }
    // ------ dimineata sau seara
    .dim_seara {
      bottom: -30%;
      left: 0;
    }
    &.dim_seara {
      .blockout {
        bottom: -75%;
        left: 0;
      }
    }
    // ------ special ----
    &.special.noapte {
      .special {
        z-index: 10;
        circle {
          stroke: var(--color-one);
        }
      }
    }

    &.special {
      #highk,
      #lowk {
        stroke: transparent;
        fill: transparent;
      }

      &.high {
        #highk {
          fill: var(--color-three);
        }
      }

      &.low {
        #lowk {
          fill: var(--color-three);
        }
      }
    }

}
</style>
