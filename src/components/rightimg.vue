<template>
    <div class="right-img" v-bind:style="{ backgroundImage: 'url(' + baseUrl +  image + '.jpg)' }">
    <div id='overlay-img'>
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
    'image',
    'baseUrl'
  ],
}
</script>

<style lang="scss">
  @import './../theme/variables.scss';

  #col-right {
     @media (max-width: ($body-width * 2) ){
        position: absolute;
        left: 0;
        right: 0;
        bottom: (100vh - $img-phanel);
        top: 0;
      }

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

      @media (max-width: ($body-width * 2) ){
        position: absolute;
        left: 0;
      }

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
        text-align: center;

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
  }
</style>
