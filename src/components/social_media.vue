<template>
  <div class="social_media_component">
    <span
      v-if="git"
      class="social_link git">
      <a :href="git">git</a>
      <span>|</span>
    </span>
    <span
      v-if="facebook"
      class="social_link facebook">
      <a :href="facebook">facebook</a>
      <span>|</span>
    </span>
    <span
      v-if="linkedin"
      class="social_link linkedin">
      <a :href="linkedin">Linked in</a>
      <span>|</span>
    </span>
  </div>
</template>
<script>
export default {
  name: 'socialMedia',
  props: [
    'git',
    'facebook',
    'linkedin',
  ],
}
</script>
<style lang='scss' scoped>
.social_media_component {
  .social_link:last-child {
    span {
      display: none;
    }
  }
  .social_link a {
    color: inherit;
    &:hover {
      opacity: 0.4;
    }
  }
}
</style>
