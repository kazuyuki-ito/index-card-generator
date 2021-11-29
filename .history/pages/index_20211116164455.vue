<template>
  <section>
    <transition name="fade">
      <size-select />
    </transition>
  </section>
</template>

<script>

import SizeSelect from "~/components/size-select.vue";


export default {
  components: {
    SizeSelect
  }
}
</script>

<style scoped>
  section {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
  }
</style>

