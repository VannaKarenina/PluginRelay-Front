<script lang="ts">
import {defineComponent} from 'vue'
import card from "~/components/card.vue";
import CategoriesView from "~/components/view/CategoriesView.vue";
import CallToAction from "~/components/base/CallToAction.vue";

export default defineComponent({
    name: "index",
    components: {
        CallToAction,
        CategoriesView,
    },
})
</script>

<template>
    <div class="tw-min-h-screen">
        <CategoriesView/>
        <CallToAction/>
    </div>
</template>

<style scoped>

</style>
