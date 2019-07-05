<template>
    <div class='row'>
        <h1>Missing</h1>
        <div id='crums'>
          <span>
            total: {{statistic.total}} |
            have: {{statistic.have}} |
            missing: {{statistic.missing}}
          </span>
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
</template>
<script>
import axios from 'axios'
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
    }
  },
  mounted () {
    let _this = this
    let prodUrl = _this.baseUrlRequest()

    axios.get(`${prodUrl}/VremePosibila.php`)
      .then(response => {
        // initial posibile variants
        _this.need = response.data

        axios.get(`${prodUrl}/VremeDisponibila.php`)
          .then(response => {
            _this.have = response.data
            _this.need = _this.need.concat(_this.have)

            _this.statistic.total = _this.need.length
            _this.statistic.have = _this.have.length
            _this.statistic.missing = _this.need.length - _this.have.length
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
    }
  }
}
</script>
<style lang="scss" scoped>
  li.disabled {
    opacity: 0.1;
  }

  #crums {
    padding-top: 20px;
    span {
      padding: 10px;
      background-color: black;
      color: white;
    }
  }

</style>
