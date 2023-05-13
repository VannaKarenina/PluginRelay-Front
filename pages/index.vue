<script lang="ts">
import {defineComponent} from 'vue'
import card from "~/components/card.vue";

export default defineComponent({
    name: "index",
    components: {
        card
    },
    data() {
        return {
            projects: [
                { title: 'Project 1', description: 'Lorem ipsum ' },
                { title: 'Project 2', description: 'Consectetur' },
                { title: 'Project 3', description: 'Sed do' },
                { title: 'Project 4', description: 'Ut labore' },
                { title: 'Project 5', description: 'Ut enim' },
                { title: 'Project 6', description: 'Duis aute' },
                { title: 'Project 7', description: 'Duis aute' },
                { title: 'Project 8', description: 'Duis aute' },
                { title: 'Project 9', description: 'Duis aute' },
                { title: 'Project 10', description: 'Duis aute' },
                { title: 'Project 11', description: 'Duis aute' }
            ]
        }
    }
})
</script>

<template>
    <div class="tw-flex tw-flex-col tw-bg-slate-950 sm:tw-bg-slate-950 md:tw-bg-slate-950 lg:tw-bg-slate-950">
        <div class="tw-flex tw-justify-center tw-items-center tw-flex-grow tw-mt-5">
            <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-5 lg:tw-grid-cols-5 tw-gap-4">
                <div v-for="(project, index) in projects" :key="index">
                    <card :project="project" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
