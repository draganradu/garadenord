<template>
    <div
      v-if="(image !== '/')"
      class="right-img"
      v-bind:class="{ grayscale: $store.getters.grayscale }"
      v-bind:style="{ backgroundImage: 'url(' + baseUrl +  image + '.jpg)' }">
    <div id='overlay-img'>
      <icon :weatherArray="image.replace('/', '').split('_')" :key='image'/>
      <p>{{image.split('_').join(' ').replace('/', '')}}</p>
    </div>
    </div>
    <div
      v-else
      class="right-img error"
      v-html="require(`!html-loader!./../assets/gara-outline.svg`)">
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
      transition: 1.5s ease-in-out;
      @media (max-width: ($body-width * 2) ){
        background-attachment: fixed
      }

      &:after {
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 80%;
      }

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

        .iconb {
          float: none;
          display: inline-block;

          & svg,
          & {
            width: $size;
            height: $size;
          }
        }
      }

      &.error {
        display: flex;
        padding: 0;
        svg {
          margin: auto;
          flex-grow: 1;
        }
      }
    }
  }

  .grayscale {
    filter: grayscale(100%);
  }
</style>
