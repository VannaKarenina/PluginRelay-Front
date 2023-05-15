<script lang="ts">
import {defineComponent} from 'vue'
import NavigationBar from "~/components/base/NavigationBar.vue";
import FooterBar from "~/components/base/FooterBar.vue";

export default defineComponent({
    name: "default",
    components: {FooterBar, NavigationBar}
})
</script>

<template>
  <div class="tw-flex tw-min-h-screen tw-flex-col tw-bg-slate-950 sm:tw-bg-slate-950 md:tw-bg-slate-950 lg:tw-bg-slate-950">
      <NavigationBar class="tw-z-50"/>
      <slot/>
      <FooterBar class="tw-mt-5"/>
  </div>
</template>

<style scoped>

</style>
