<template>
  <div
    id='site-text'
    class='row-span-all col-count-2'
  >
    <p
      v-html='description'
    ></p>
    <p class="fill-block" >
      <span>Version: </span>
      <span class="bold">{{ version }}</span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'navigration',
  props: [
    'description',
    'version'
  ]
}
</script>

<style lang="scss" scoped>
  p + p {
    margin-top: 10px;
    font-size: 12px!important;
  }
</style>
