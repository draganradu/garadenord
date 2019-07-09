<template>
  <div class='color-pattern'>
    <div class='color-pattern-container'>
        <h2>{{colorTitle}}</h2>
      <div v-for="(color, count) in color" :key="count" class='color-container'>
        <div class='color-p color-p-1' :style="{background: color}"></div>
        <div class="text-container">
          <div class='bold'>{{count}}</div>
          <div>{{color}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    'colorData',
    'colorTitle',
  ],
  data () {
    return {
      color: [
        this.rgb(this.colorData.domniant),
        this.rgb(this.colorData.pattern[0]),
        this.rgb(this.colorData.pattern[1]),
        this.rgb(this.colorData.pattern[2]),
        this.rgb(this.colorData.pattern[3]),
        this.rgb(this.colorData.pattern[4]),
        this.rgb(this.colorData.pattern[5]),
      ],
      count: 1,
    }
  },
  methods: {
    rgb: function (a) {
      return 'rgb(' + a.join(', ') + ')'
    }
  }
}
</script>
<style lang="scss" scope>
  .color-pattern {
    background-color: white;
    border-radius: 5px;
    // filter: drop-shadow(30px 10px 4px #4444dd);
    h2 {
      margin-bottom: 0px;
      font-size: 20px;
      height: 40px;
      padding: 10px 10px 0 10px;
      margin-bottom: 15px;
      box-sizing: content-box;
      overflow: hidden;
    }
    .color-pattern-container {
      .color-p {
        height: 30px;
      }
      .color-p-0 {
        height: 100px
      }
    }
  }

  .color-container {
    .text-container {
      display: flex;
      padding: 5px;
      & > * {
        font-size: 10px;
      }
      .bold {
        font-weight: 800;
      }
    }
  }
</style>
