<script lang="ts">
import {defineComponent} from 'vue'
import {useAuthStore} from "~/stores/auth";

export default defineComponent({
    name: "AllGames",
    setup() {
      const authStore = useAuthStore();
    },
    async mounted() {
        this.categories = await $fetch('http://127.0.0.1:3890/v1/category/all');
    },
    data() {
        return {
          categories: []
        }
    },
    methods: {
      async redirect(id: number) {
        await navigateTo({
          path: `/categories/${id}`
        })
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
                    <div v-for="(category, index) in categories" :key="index">
                        <card :project="category" @click="redirect(category.id)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
