<template>
    <router-link
      :to="raw"
      v-bind:class="{ 'disabled': !disabled }"
      class="card" >
      <icon :weatherArray='weather' /> {{title}}
    </router-link>
</template>

<script>
import icon from './icon'
export default {
  components: {
    icon
  },
  name: 'card',
  props: [
    'raw',
    'disabled'
  ],
  data () {
    return {
      title: this.raw.replace(/_/g, ' '),
      weather: this.raw.split('_')
    }
  }
}
</script>

<style lang="scss">

.card {
  font-size: 20px;
  color: var(--color-three);
  background-color: transparent;
  display: block;
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 10px;
  min-height: 60px;
  font-weight: 100;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: var(--color-two);
  border-radius: 0;
  text-decoration: none;

  &.disabled {
    pointer-events: none;
    opacity: 0.2;
  }

  &:hover,
  &.router-link-exact-active {
    &::before {
      content: ' ';
      position: absolute;
      left: -10px;
      right: -10px;
      top: -8px;
      bottom: -1px;
      background-color: var(--color-three);
      z-index: -1;
    }
    color: var(--color-one);
    text-decoration: none;
  }
}

</style>
