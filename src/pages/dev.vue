<template>
  <div id='map-page' class='page'>
    <div class='c-12'>
      <h1>Dev</h1>
    </div>
    <div class='c-4'>
      <h2>Missing</h2>
      <div class='feature'>
        total: {{statistic.total}} |
        have: {{statistic.have}} |
        missing: {{statistic.missing}}
      </div>
      <ul>
        <li
            v-for='vreme in need'
            :key="vreme"
            v-bind:class = "{ disabled : have.indexOf(vreme) > -1 }" >
            {{vreme}}
        </li>
      </ul>
    </div>
    <div class='c-4'>
      <table>
        <caption>Test</caption>
        <tr v-for="(testData, index) in imgTest" :key="testData">
          <td>
            {{index + 1}}
          </td>
          <td>
            {{testData}}
          </td>
        </tr>
      </table>
    </div>
    <div class='c-4'>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import ImageOfTheDay from './../components/frame/image_of_the_day.js'
import { baseLineUrl } from './../components/frame/helper'

export default {
  name: 'DevPage',

  data () {
    return {
      need: [],
      have: [],
      statistic: {
        total: 0,
        have: 0,
        missing: 0,
      },
      imgTest: [],
    }
  },
  mounted () {
    let _this = this

    axios.get(`${baseLineUrl}/VremePosibila.php`)
      .then(response => {
        // initial posibile variants
        _this.need = response.data

        axios.get(`${baseLineUrl}/VremeDisponibila.php`)
          .then(response => {
            _this.have = response.data
            _this.need = _this.unique(_this.need.concat(_this.have))

            _this.statistic.total = _this.need.length
            _this.statistic.have = _this.have.length
            _this.statistic.missing = _this.need.length - _this.have.length

            for (let i = 1; i <= 365; i++) {
              _this.imgTest.push(ImageOfTheDay(_this.have, i))
            }
          })
      })
  },
  methods: {
    unique: function (a) {
      return a.sort().filter(function (item, pos, ary) {
        return !pos || item !== ary[pos - 1]
      })
    }
  }
}
</script>
