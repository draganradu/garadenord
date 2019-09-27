<template>
    <nav>
      <router-link
        v-for="link in links"
        :key='link[0]'
        :to="{ path: link[1]}">
          {{link[0]}}
      </router-link>
      <a href='#'
        v-bind:class="{ 'router-link-active': $store.getters.grayscale }"
        v-on:click="setGrayscale($event)"
        >Grayscale</a>
    </nav>
</template>
<script>
export default {
  name: 'navigration',
  props: [
    'links'
  ],
  methods: {
    setGrayscale: function (event) {
      event.preventDefault()
      this.$store.commit('setGrayscale', !this.$store.getters.grayscale)
    }
  },
}
</script>
<style language lang="scss" scoped>
@import './../theme/variables.scss';

nav {
  max-width: var(--body-width);
  border-bottom: 1px solid rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: var(--color-one);
  @media (max-width: ($body-width * 2)) {
    max-width: 100%;
  }

  a {
    text-transform: uppercase;
    color: rgba(0,0,0,0.4);
    padding: 5px;
    display: inline-block;

    &.router-link-active,
    &:hover {
      background-color: rgba(0,0,0,0.4);
      color: var(--color-one);
    }
  }
}

</style>
