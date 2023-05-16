<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "AllGames",
    async mounted() {
        this.projects = await $fetch('http://127.0.0.1:3890/v1/category/all');
    },
    data() {
        return {
            projects: []
        }
    }
})
</script>

<template>
    <div>
        <div class="tw-flex tw-justify-center tw-mt-12">
            <h1 class="tw-text-white tw-text-2xl">Explore thousands of mods for your favorite games</h1>
        </div>
        <div class="tw-flex tw-justify-center tw-items-center tw-flex-grow tw-mt-7">
            <div class="tw-flex-col">
                <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-3 md:tw-grid-cols-5 lg:tw-grid-cols-5 tw-gap-4 tw-mt-5">
                    <div v-for="(project, index) in projects" :key="index">
                        <card :project="project" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
