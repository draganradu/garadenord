<template>
    <div class='icon' :class='weatherArray.join(" ")'>
        <!-- soare -->
        <div
            v-if="weatherArray.indexOf('innorat') === -1
            && weatherArray.indexOf('toamna') === -1
            && weatherArray.indexOf('primavara') === -1
            && weatherArray.indexOf('iarana') === -1"
            class='comp-icon soare' v-html="require('!html-loader!./../assets/soare.svg')">
        </div>
        <div
            v-if="weatherArray.indexOf('innorat') === -1
            && weatherArray.indexOf('primavara') > -1"
            class='comp-icon soare primavara' v-html="require('!html-loader!./../assets/primavara.svg')">
        </div>
        <div
            v-if="weatherArray.indexOf('innorat') === -1
            && weatherArray.indexOf('toamna') > -1"
            class='comp-icon soare toamna' v-html="require('!html-loader!./../assets/toamna.svg')">
        </div>
        <div
            v-if="weatherArray.indexOf('innorat') === -1
            && weatherArray.indexOf('iarna') > -1"
            class='comp-icon soare toamna' v-html="require('!html-loader!./../assets/iarna.svg')">
        </div>
        <!-- nor -->
        <div
            v-if="weatherArray.indexOf('innorat') > -1"
            class='comp-icon nor' v-html="require('!html-loader!./../assets/nor.svg')">
        </div>
        <!-- ceata -->
        <div
            v-if="weatherArray.indexOf('ceata') > -1"
            class='comp-icon ceata' v-html="require('!html-loader!./../assets/ceata.svg')">
        </div>
        <div
            v-if="weatherArray.indexOf('ceata') > -1"
            class='comp-icon ceata cutout' v-html="require('!html-loader!./../assets/ceata-cutout.svg')">
        </div>
        <!-- dimineata -->
        <!---- line ----->
        <div
            v-if="(weatherArray.indexOf('dimineata') > -1 || weatherArray.indexOf('seara') > -1) && weatherArray.indexOf('ceata') === -1"
            class='comp-icon'
            v-bind:class="[(weatherArray.indexOf('dimineata') > -1)? 'dimineata' : 'seara' ]"
            v-html="require('!html-loader!./../assets/morning.svg')">
        </div>
        <!---- cutout ----->
        <div
            v-if="(weatherArray.indexOf('dimineata') > -1 || weatherArray.indexOf('seara') > -1) && weatherArray.indexOf('ceata') === -1"
            class='comp-icon cutout'
            v-bind:class="[(weatherArray.indexOf('dimineata') > -1)? 'dimineata' : 'seara' ]"
            v-html="require('!html-loader!./../assets/morning-cutout.svg')">
        </div>
    </div>
</template>

<script>
export default {
  name: 'weatherIcon',
  props: [
    'weatherArray'
  ]
}
</script>

<style lang="scss">

// -- stroke
// -- styke
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
        &.seara,
        &.dimineata {
            z-index: 100;
            &.cutout {
             z-index: 99;
            }
        }
        &.ceata {
            z-index: 110;
            &.cutout {
             z-index: 109;
            }
        }
    }

    &.seara,
    &.dimineata {
        & > .soare {
            top: 5px;
        }
        & > .dimineata {
            top: 10px;
        }
        &.ceata {
            & > .soare {
                top: 0px;
            }
            & > .dimineata {
                top: 0px;
            }
        }
    }

    &.seara {
        & > .seara {

        }
    }
}
</style>
