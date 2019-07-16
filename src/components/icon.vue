<template>
    <div
        class='icon'
        :class='weatherArray.join(" ")'>
        <div
        v-for="(item, index) in icons" :key="index"
        v-if="icons[index]"
        class='comp-icon'
        :class="[icons[index], `${index}` ]"
        v-html="require(`!html-loader!./../assets/${icons[index]}.svg`)"></div>
    </div>

</template>

<script>
export default {
  name: 'weatherIcon',
  data () {
    return {
      icons: {
        l0: '',
        l1: '',
        l2: '',
        l3: '',
        l4: '',
      },
      code: [ 0, 0, 0, 0, 0 ]
    }
  },
  props: [
    'weatherArray'
  ],
  methods: {
    // day / night / special
    checkForL0: function () {
      if (this.weatherArray.indexOf('special') > -1) {
        return 'special'
      }
      if (this.weatherArray.indexOf('noapte') > -1) {
        return 'luna'
      }
      return 'soare'
    },

    // season / vara / iarna
    checkForL1: function (data) {
      if (this.weatherArray.indexOf('toamna') > -1) {
        return 'toamna'
      }
      if (this.weatherArray.indexOf('primavara') > -1) {
        return 'primavara'
      }

      if (this.weatherArray.indexOf('iarna') > -1) {
        return 'iarna'
      }
      return ''
    },

    // weather / senin / inorat
    checkForL2: function () {
      if (this.weatherArray.indexOf('innorat') > -1 ||
      this.weatherArray.indexOf('inorat') > -1 ||
      this.weatherArray.indexOf('ploaie') > -1 ||
      this.weatherArray.indexOf('ninsoare') > -1) {
        return 'nor'
      }
    },

    // modifier atmosferic / rasarit / apus / ora albastra
    checkForL3: function () {

    },

    // modifier complex
    checkForL4: function () {
      if (this.weatherArray.indexOf('ploaie') > -1 ||
      this.weatherArray.indexOf('ninsoare') > -1) {
        return 'nor'
      }
      if (this.weatherArray.indexOf('special') > -1 &&
      this.weatherArray.indexOf('noapte') > -1) {
        return 'luna'
      }
    },
  },
  mounted () {
    this.icons.l0 = this.checkForL0()
    // -- no special path
    // if (this.icons.l0 !== 'special') {
    this.icons.l1 = this.checkForL1()
    // primavara
    if (this.icons.l1 === 'primavara') {
      if (this.icons.l0 === 'soare') {
        this.icons.l0 = ''
      }
    }
    // vara

    // toaman

    // iarna
    if (this.icons.l1 === 'iarna') {
      if (this.icons.l0 === 'soare') {
        this.icons.l0 = ''
      }
    }

    this.icons.l2 = this.checkForL2()
    this.icons.l4 = this.checkForL4()
    // }
  }
}
</script>

<style lang="scss">
.icon {
    float:left;
    height: 50px;
    width: 50px;
    overflow: hidden;
    margin-right: 10px;
    //color ---------------------------------
    path,
    circle,
    polyline,
    line {
        stroke: var(--color-three);
        fill: transparent;
    }

    .cutout {
        fill: var(--color-one);
        polyline,
        path {
            stroke: transparent!important;
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
    }

    .comp-icon {
        position: absolute;
        // &.seara,
        // &.dimineata {
        //     z-index: 100;
        //     &.cutout {
        //      z-index: 99;
        //     }
        // }
        // &.ceata {
        //     z-index: 110;
        //     &.cutout {
        //      z-index: 109;
        //     }
        // }
    }

    // &.seara,
    // &.dimineata {
    //     & > .soare {
    //         top: 5px;
    //     }
    //     & > .dimineata {
    //         top: 10px;
    //     }
    //     &.ceata {
    //         & > .soare {
    //             top: 0px;
    //         }
    //         & > .dimineata {
    //             top: 0px;
    //         }
    //     }
    // }

    // &.seara {
    //     & > .seara {

    //     }
    // }

    // ------ customization
    @mixin svgScale($scale){
      transform: scale($scale);
      stroke-width: (1 / $scale)
    }

    // ------ nor ----
    .nor {
      path {
        fill: var(--color-one);
      }
    }
    // ------ primavara ----
    &.primavara.noapte {
      #seara,
      #dimineata {
        display: block;
        fill: var(--color-three);
      }
      #inner {
        display: none;
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

      #inner {
        fill: var(--color-one);
      }
    }
    &.primavara.inorat,
    &.primavara.innorat,
    &.primavara.ploaie,
    &.primavara.ninsoare {
      .nor {
        position: relative;
        left: 15%;
        top: 5%;
      }
    }
    // ------ vara -----
    &.vara.inorat,
    &.vara.innorat,
    &.vara.plaoie {
        .nor {
          position: relative;
          left: 15%;
          top: 5%;
        }
    }
    // ------ iarna ----
    &.iarna.inorat,
    &.iarna.innorat,
    &.iarna.ploaie,
    &.iarna.ninsoare {
      .nor {
        position: relative;
        left: 15%;
        top: 15%;
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
          right: 24%;
          z-index: 15;
          top: 12%;
        }
      }
    }
    // ------ special ----
    &.special.noapte {
      .special {
        z-index: 10;
        circle {
          stroke: white
        }
      }
    }

}
</style>
