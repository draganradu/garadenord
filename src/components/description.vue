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
  #site-text {
  p + p {
    font-size: 12px!important;
    margin-top: 10px;
  }

  & * {
    font-size: inherit;
  }

  font-size: 18px;
  line-height: 1.2;
}
</style>
