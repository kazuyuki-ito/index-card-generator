<template>
  <section>
    <transition name="slide-fade">
      <size-select v-if="!size" @sizeSelect="setSize" />
    </transition>
    <transition name="slide-fade-delay">
      <design-select v-if="size && !design" @designSelect="setDesign" />
    </transition>
  </section>
</template>

<script>

import SizeSelect from "~/components/size-select.vue";
import DesignSelect from "~/components/design-select.vue";

export default {
  components: {
    SizeSelect,
    DesignSelect
  },
  data() {
    return {
      size: null,
      design: null
    }
  },
  methods: {
      setSize: function(key){
          this.size = key;
      },
      setDesign: function(key){
          this.design = key;
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

