<template>
  <section>
    <transition name="fade">
      <size-select  @sizeSelect="setSize()" />
    </transition>
  </section>
</template>

<script>

import SizeSelect from "~/components/size-select.vue";


export default {
  components: {
    SizeSelect
  },
  data() {
    return {
      size: null
    }
  },
  methods: {
      setSize: function(key){
          this.size = key;
      }
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

