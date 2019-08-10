<script>
export default {
  name: 'historyHelper',
  methods: {
    standardFormat (data) {
      return [{name: data.name, path: data.path}]
    },
    init: function (data) {
      localStorage.setItem('historyGDN', JSON.stringify(this.standardFormat(data)))
    },
    get: function () {
      if (localStorage.getItem('historyGDN') !== null) {
        return JSON.parse(localStorage.getItem('historyGDN'))
      }
    },
    set: function (data) {
      if (localStorage.getItem('historyGDN') === null) {
        this.init(data)
      } else {
        let temp = JSON.parse(localStorage.getItem('historyGDN'))
        if (temp.length > 5) {
          temp = temp.slice(0, 5)
        }
        temp = this.standardFormat(data).concat(temp)
        localStorage.setItem('historyGDN', JSON.stringify(temp))
      }
    },
  }
}
</script>
