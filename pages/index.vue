<script lang="ts">
import {defineComponent} from 'vue'
import card from "~/components/card.vue";
import CategoriesView from "~/components/view/CategoriesView.vue";
import CallToAction from "~/components/base/CallToAction.vue";
import LatestGames from "~/components/view/LatestGames.vue";

export default defineComponent({
    name: "index",
    components: {
        CallToAction,
        LatestGames,
    },
})
</script>

<template>
    <div class="tw-min-h-screen">
        <LatestGames/>
        <CallToAction/>
    </div>
</template>

<style scoped>

</style>
