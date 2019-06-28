<template>
    <div class="right-img" v-bind:style="{ backgroundImage: 'url(http://localhost/gara-vue/src/assets/studiu_de_lumina/' +  image + '.jpg)' }">
    <div id='overlay-img' class='text-center'>
      <icon :weatherArray="image.replace('/', '').split('_')" />
      <p>{{image.split('_').join(' ').replace('/', '')}}</p>
    </div>
    </div>
</template>

<script>
import icon from './icon'
export default {
  components: {
    icon
  },
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

    &:hover > #overlay-img {
      opacity: 1;
    }

    #overlay-img {
      $size: 100px;

      transition: 0.5s;
      opacity: 0;
      display: inline-block;
      background-color: white;
      padding: ($size * 0.1);
      position: relative;
      width: ($size * 1.2);

      .icon {
        float: none;
        display: inline-block;

        & svg,
        & {
          width: $size;
          height: $size;
        }
      }
    }
  }
</style>
