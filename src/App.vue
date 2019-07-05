<template>
  <div id="app" class="container-fluid">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">

// @import 'node_modules/bootstrap/scss/bootstrap';
// @import 'node_modules/bootstrap-vue/src/index.scss';
@import url('https://fonts.googleapis.com/css?family=Oswald:300,400,700&display=swap');
@import './theme/root.scss';
//-- typography
body {
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  font-size: 25px;
  line-height: 1;
}

h1 {
  font-weight: 800;
  margin-bottom: 0;
  line-height: 0.9;
  font-size: 100px;
  text-transform: uppercase;
  max-width: 450px;
}

h2 {
  margin-bottom: 60px;
}

.btn {
  margin-right: 2px;
  margin-bottom: 2px;
}

.row-2 {
  column-count: 2;
}

.row-span-all {
  column-span: all;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>
