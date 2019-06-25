<template>
    <div class="right-img" v-bind:style="{ backgroundImage: 'url(http://localhost/gara-vue/src/assets/studiu_de_lumina/' +  image + '.jpg)' }">
    <p>{{image.split('_').join(' ').replace('/', '')}}</p>
    </div>
</template>

<script>
export default {
  name: 'rightimg',
  props: [
    'image'
  ]
}
</script>

<style lang="scss">
  .right-img {
    background-size: cover;
    position: fixed;
    right: 0;
    left: var(--body-width);
    top: 0;
    bottom: 0;
    text-align: right;
    padding: 20px;
    background-position: center;
    &:hover > p {
      opacity: 1;
    }
    & > p {
      opacity: 0;
      display: inline-block;
      background-color: white;
      padding: 10px;
    }
  }
</style>
