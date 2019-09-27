<template>
    <div
      v-if="color"
      class="color-bar">
        <div
            class="color-element"
            id="color-bar-1"
            v-bind:style="{ backgroundColor: ColorConvertor(color.domniant) }"
            v-html='TitleConvertor(color.domniant)'
            >
          </div>
        <div
          class="color-element"
          id="color-bar-2"
          v-bind:style="{ backgroundColor: ColorConvertor(color.pattern[0]) }"
          v-html='TitleConvertor(color.pattern[0])'
          >
        </div>
        <div
          class="color-element"
          id="color-bar-3"
          v-bind:style="{ backgroundColor: ColorConvertor(color.pattern[1]) }"
          v-html='TitleConvertor(color.pattern[1])'
          >
        </div>
        <div
          class="color-element"
          id="color-bar-4"
          v-bind:style="{ backgroundColor: ColorConvertor(color.pattern[2]) }"
          v-html='TitleConvertor(color.pattern[2])'
          >
        </div>
        <div
          class="color-element"
          id="color-bar-5"
          v-bind:style="{ backgroundColor: ColorConvertor(color.pattern[3]) }"
          v-html='TitleConvertor(color.pattern[3])'
          >
        </div>
        <div
          class="color-element"
          id="color-bar-6"
          v-bind:style="{ backgroundColor: ColorConvertor(color.pattern[4]) }"
          v-html='TitleConvertor(color.pattern[4])'
          >
        </div>
        <div
          class="color-element"
          id="color-bar-7"
          v-bind:style="{ backgroundColor: ColorConvertor(color.pattern[5]) }"
          v-html='TitleConvertor(color.pattern[5])'
          >
        </div>
        <div
          class="color-element"
          id="color-bar-8"
          v-bind:style="{ backgroundColor: ColorConvertor(color.pattern[6]) }"
          v-html='TitleConvertor(color.pattern[6])'
          >
        </div>
    </div>
</template>
<script>
import colorHelper from './../components/frame/color'
export default {
  name: 'colorBar',
  props: [
    'color',
    'grayscale'
  ],
  data () {
    return {
      colorArray: [],
    }
  },
  methods: {
    TitleConvertor: function (colorArray) {
      if (this.grayscale) {
        colorArray = colorHelper.grayscale(colorArray)
      }
      return '<span>Hex: <b>#' + colorHelper.rgbToHex(colorArray) + '</b></span>'
    },
    ColorConvertor: function (colorArray) {
      if (this.grayscale) {
        colorArray = colorHelper.grayscale(colorArray)
      }
      return 'rgb(' + colorArray[0] + ',' + colorArray[1] + ',' + colorArray[2] + ')'
    },
  }
}
</script>
<style lang="scss">
@import './../theme/variables.scss';

    .color-bar {
        $color-bar-width: 10px;

        width: $color-bar-width;
        background-color: var(--color-one);
        padding-right: 10px;
        position: fixed;
        left: var(--body-width);
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        z-index: 1;
        box-sizing: content-box;

        .color-element {
          width: $color-bar-width;
          flex-grow: 0;
          margin-top: 0.5vw;
          position: relative;
          height: 6vh;
          transition: width 0.5s linear;
          will-change: width;

          span {
            position: absolute;
            right: 5px;
            bottom: 5px;
            display: none;
            font-size: 10px;
            opacity: 0;
          }

          &:first-child {
            flex-grow: 1;
            height: auto;
            margin-top: 0vw;
          }

          &:hover {
            transition: width 0.3s linear;
            width: 200px;
            color: rgba(0,0,0,1);

            span {
              opacity: 1;
              display: block;
              background-color: var(--color-one);
              padding: 8px;
            }
          }
        }
    }

@media (max-width: ($body-width * 2)) {
  .color-bar.landing-colorbar {
    left: 0;
    right: 0;
    top: unset;
    position: absolute;
    width: auto;
    flex-direction: row;
    padding-right: 0px;

    .color-element {
      flex-grow: 1;
      height: 5vw;
      margin-top: 0vw;
      &:hover {
        width: auto;
      }
    }
  }
}
</style>
