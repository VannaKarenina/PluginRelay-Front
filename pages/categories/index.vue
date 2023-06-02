<script lang="ts">
import {defineComponent} from 'vue'
import AllGames from "~/components/view/AllGames.vue";

export default defineComponent({
    name: "index",
    components: {AllGames}
})
</script>

<template>
  <div class="tw-min-h-screen">
      <AllGames/>
  </div>
</template>

<style scoped>

</style>
