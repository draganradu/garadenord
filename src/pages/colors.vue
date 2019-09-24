<template>
  <div class="row" id="color">
    <h1>Color-Patterns</h1>
    <div class='color-card' v-for="(pData, pTitle) in patterns" :key="pTitle" >
      <colorPatterns :colorData="pData" :colorTitle="pTitle.split('_').join(' ')" />
      <div
        class='color-img'
        v-bind:style="{ backgroundImage: 'url(http://www.fotodex.ro/img/' +  pTitle + '.jpg)' }"></div>
    </div>
  </div>
</template>
<script>
import patterns from './../../dist/dinamic/colorPattern.json'
import colorPatterns from './../components/color_patterns'
export default {
  components: {
    colorPatterns
  },
  name: 'ColorP',
  data () {
    return {
      patterns: patterns,
    }
  },
}
</script>
<style lang="scss">
$img_size: 20px;
 #color {
    background-color: #d7d7d7;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(8,1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    padding: 10px;
    @media (max-width: 1700px){
      grid-template-columns: repeat(7,1fr);
    }
    @media (max-width: 1500px){
      grid-template-columns: repeat(6,1fr);
    }
    @media (max-width: 1100px){
      grid-template-columns: repeat(5,1fr);
    }
    @media (max-width: 900px){
      grid-template-columns: repeat(4,1fr);
    }
    @media (max-width: 660px){
      grid-template-columns: repeat(3,1fr);
    }
    @media (max-width: 550px){
      grid-template-columns: repeat(2,1fr);
    }

    & > * {
      overflow: hidden;
    }

    h1 {
      grid-column: span 2;
    }

    .color-card {
      display: grid;
      grid-template-columns: 1fr $img_size;
      position: relative;

      .color-img {
        background-size: cover;
        position: absolute;
        left: calc(100% - #{$img_size} );
        right: 0;
        top: 0;
        bottom: 0;
        transition: 1s;
      }
      &:hover {
        .color-img {
          left: $img_size;
        }
      }
    }
 }
</style>
