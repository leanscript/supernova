<template>
  <router-link
    :to="to"
    :class="`text-sn-text hover:bg-sn-accent-lighter transition group flex items-center px-2 py-2 font-medium rounded-md ${linkIsActive}`">
    <slot />
    {{ title }}
  </router-link>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    to: { type: Object, required: true },
    regex: { type: String, required: false },
  },
  computed: {
    linkIsActive() {
      const match = this.$route.name.match(this.regex)
      if (match && match[0].length > 0) {
        return 'bg-sn-accent hover:bg-sn-accent-lighter'
      }
      return null
    },
  },
}
</script>
