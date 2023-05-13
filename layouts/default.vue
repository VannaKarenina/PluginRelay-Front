<script lang="ts">
import {defineComponent} from 'vue'
import NavigationBar from "~/components/base/NavigationBar.vue";

export default defineComponent({
    name: "default",
    components: {NavigationBar}
})
</script>

<template>
  <div>
      <NavigationBar class="tw-z-50"/>
      <slot/>
  </div>
</template>

<style scoped>

</style>
