<script lang="ts">
import {defineComponent} from 'vue'
import NavigationBar from "~/components/base/NavigationBar.vue";
import CategoriesView from "~/components/view/CategoriesView.vue";

export default defineComponent({
    name: "test",
    components: {CategoriesView, NavigationBar}
})
</script>

<template>
  <div>
      <CategoriesView/>
  </div>
</template>

<style scoped>

</style>
