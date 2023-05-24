<script lang="ts">
import {defineComponent} from "vue";
import {useAuthStore} from "~/stores/auth";
import SideNav from "~/components/base/SideNav.vue";
definePageMeta({
  middleware: [
      "auth"
  ]
})
export default defineComponent({
  components: {SideNav},
  setup() {
    const store = useAuthStore();
    return {store}
  }
})
</script>

<template>
  <div class="tw-flex tw-flex-row tw-max-h-screen">
    <SideNav/>
    kek
  </div>
</template>

<style scoped>

</style>
