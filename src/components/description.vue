<template>
  <div
    id='site-text'
    class='row-span-all'
    v-on:click= "ShowSiteTextLong"
    v-bind:class= "{ active: longSiteText }"
  >
    <p v-html='description'></p>
  </div>
</template>
<script>
export default {
  name: 'navigration',
  props: [
    'description'
  ],
  data () {
    return {
      longSiteText: false,
    }
  },
  methods: {
    ShowSiteTextLong: function () {
      this.longSiteText = !this.longSiteText
    },
  }
}
</script>
