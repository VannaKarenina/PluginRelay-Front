<template>
    <div>
        <div class="tw-flex tw-justify-center tw-mt-12">
            <h1 class="tw-text-white tw-text-2xl">Explore thousands of legendary mods</h1>
        </div>
        <div class="tw-flex tw-justify-center tw-items-center tw-flex-grow tw-mt-7">
            <div class="tw-flex-col">
                <div class="tw-flex tw-justify-between">
                    <div class="tw-text-white tw-text-xl">Featured Games</div>
                    <div class="tw-text-white tw-text-xl">More></div>
                </div>
                <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-3 md:tw-grid-cols-5 lg:tw-grid-cols-5 tw-gap-4 tw-mt-5">
                    <div v-for="(project, index) in projects.slice(0,5)" :key="index">
                        <card :project="project" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "CategoriesView",
    async mounted() {
        this.projects = await $fetch('http://127.0.0.1:3890/v1/category/all');
    },
    data() {
        return {
            projects: []
        }
    }
});
</script>

<style scoped>

</style>
