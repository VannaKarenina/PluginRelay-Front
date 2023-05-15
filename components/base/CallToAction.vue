<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "CallToAction"
})
</script>

<template>
    <section class="tw-mt-7">
        <div class="tw-gap-8 tw-items-center tw-py-8 tw-px-4 tw-mx-auto tw-max-w-screen-xl xl:tw-gap-16 md:tw-grid md:tw-grid-cols-2 sm:tw-py-16 lg:tw-px-6">
            <img class="tw-w-full dark:tw-hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard image">
            <img class="tw-w-full tw-hidden dark:tw-block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image">
            <div class="tw-mt-4 md:tw-mt-0">
                <h2 class="tw-mb-4 tw-text-4xl tw-tracking-tight tw-font-extrabold tw-text-gray-900 dark:tw-text-white">Let's create more tools and ideas that brings us together.</h2>
                <p class="tw-mb-6 tw-font-light tw-text-gray-500 md:tw-text-lg dark:tw-text-gray-400">Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.</p>
                <a href="#" class="tw-inline-flex tw-items-center tw-text-white tw-bg-primary-700 hover:tw-bg-primary-800 focus:tw-ring-4 focus:tw-ring-primary-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:focus:tw-ring-primary-900">
                    Get started
                    <svg class="tw-ml-2 tw-mr-1 tw-w-5 tw-h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>
