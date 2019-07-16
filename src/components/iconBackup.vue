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
