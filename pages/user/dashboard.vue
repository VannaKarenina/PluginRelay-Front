<script lang="ts">
import {defineComponent} from "vue";
import {useAuthStore} from "~/stores/auth";

export default defineComponent({
  setup() {
    const store = useAuthStore();
    return {store}
  }
})
</script>

<template>
  <div class="tw-text-white">{{store.token}}</div>
</template>

<style scoped>

</style>
