<template>
    <div id='page-specialized' class='page404'>
        <h1 id='title404'>404</h1>
        <div class='history404'>
          <a
              href='/'
              class="back-404" >
              Fotodex
          </a>
          <router-link
            v-for="(item, index) in history" :key="index"
            :to="{path: item.path}"
          ><sup>{{index}}</sup> {{item.name}} </router-link>
        </div>
        <div id='image404' v-html="require('!html-loader!./../assets/gara-outline.svg')"></div>
    </div>
</template>

<script>
import siteHistory from './../components/History'

export default {
  name: 'Error404',
  data () {
    return {
      history: siteHistory.methods.get()
    }
  },
}

</script>
<style lang="scss" scoped>
#page-specialized {
    min-height: 100vh;
    position: relative;
}
.page404 {
    max-height: 100vh;
    overflow: hidden;
    #image404 {
        position: absolute;
        top: 50vh;
        right: -15px;
        left: -15px;
    }
    #title404 {
        position: absolute;
        bottom: 50vh;
        left: 10vw;
        font-size: 20vw;
        line-height: 1;
        animation-name: moveup;
        animation-duration: 1.4s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    }
    .back-404 {
        font-size: 20px;
    }
    .history404 {
      padding: 20px;
      a {
        color: var(--color-two);
        margin-right: 10px;
      }
    }
}

@keyframes moveup {
  from { transform: translateY(120%); }
  to { transform: translateY(40%); }
}
</style>
