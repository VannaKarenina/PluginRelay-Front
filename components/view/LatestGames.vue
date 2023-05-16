<template>
    <div>
        <div class="tw-flex tw-justify-center tw-mt-12">
            <h1 class="tw-text-white tw-text-2xl">Explore thousands of &nbsp;</h1>
            <h1 class="tw-text-violet-700 tw-text-2xl">legendary mods</h1>
        </div>
        <div class="tw-flex tw-justify-center tw-items-center tw-flex-grow tw-mt-7">
            <div class="tw-flex-col">
                <div class="tw-flex tw-justify-between">
                    <div class="tw-text-white tw-text-xl">Featured Games</div>
                    <NuxtLink class="tw-text-white tw-bg-violet-800 hover:tw-bg-violet-900 tw-font-medium tw-rounded-lg tw-text-sm tw-px-4 lg:tw-px-5 tw-py-2 lg:tw-py-2.5 tw-mr-2 dark:tw-bg-violet-600 dark:hover:tw-bg-violet-700" to="/games">More ></NuxtLink>
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
