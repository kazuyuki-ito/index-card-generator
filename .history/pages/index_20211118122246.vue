<template>
  <section>
    <transition name="slide-fade">
      <size-select v-if="!size" @sizeSelect="setSize"  @designSelect="setDesign" />
    </transition>
    <transition name="slide-fade-delay">
      <design-select v-if="size && !design" @designSelect="setDesign" @back="reset" />
    </transition>
    <transition name="slide-fade-delay">
      <editor v-if="size && design" :size="size" :design="design" />
    </transition>
  </section>
</template>

<script>

import SizeSelect from "~/components/size-select.vue";
import DesignSelect from "~/components/design-select.vue";
import Editor from "~/components/editor.vue";

export default {
  components: {
    SizeSelect,
    DesignSelect,
    Editor
  },
  data() {
    return {
      size: null,
      design: null,
      font: null
    }
  },
  methods: {
      setSize: function(key){
          this.size = key;
      },
      setfont: function(key){
          this.font = key;
      },
      setDesign: function(key){
          this.design = key;
      },
      reset: function(key){
          this.size = null;
          this.font = null;
          this.design = null;
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

