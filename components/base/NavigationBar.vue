<template>

    <div class="tw-sticky tw-top-0 tw-flex tw-flex-col tw-bg-slate-950 sm:tw-bg-slate-950 md:tw-bg-slate-950 lg:tw-bg-slate-950">
        <div class="tw-bg-white tw-border-gray-200 dark:tw-bg-gray-900 dark:tw-border-gray-700 tw-p-1">
            <div class="tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-mx-auto tw-max-w-screen-xl">
                <a href="https://flowbite.com" class="tw-flex tw-items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="tw-mr-3 tw-h-6 sm:tw-h-9" alt="Flowbite Logo" />
                    <span class="tw-self-center tw-text-xl tw-font-semibold tw-whitespace-nowrap dark:tw-text-white">Plugin Relay</span>
                </a>
                <div class="tw-flex tw-items-center lg:tw-order-2">
                    <a href="#" class="tw-text-gray-800 dark:tw-text-white hover:tw-bg-gray-50 tw-font-medium tw-rounded-lg tw-text-sm tw-px-4 lg:tw-px-5 tw-py-2 lg:tw-py-2.5 tw-mr-2 dark:hover:tw-bg-gray-700">Log in</a>
                    <a href="#" class="tw-text-white tw-bg-violet-800 hover:tw-bg-violet-900 tw-font-medium tw-rounded-lg tw-text-sm tw-px-4 lg:tw-px-5 tw-py-2 lg:tw-py-2.5 tw-mr-2 dark:tw-bg-violet-600 dark:hover:tw-bg-violet-700">Get started</a>
                    <button data-collapse-toggle="mobile-menu-2" type="button" class="tw-inline-flex tw-items-center tw-p-2 tw-ml-1 tw-text-sm tw-text-gray-500 tw-rounded-lg lg:tw-hidden hover:tw-bg-gray-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gray-200 dark:tw-text-gray-400 dark:hover:tw-bg-gray-700 dark:focus:tw-ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="tw-sr-only">Open main menu</span>
                        <svg class="tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        <svg class="tw-hidden tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="tw-hidden tw-justify-between tw-items-center tw-w-full lg:tw-flex lg:tw-w-auto lg:tw-order-1" id="mobile-menu-2">
                    <ul class="tw-flex tw-flex-col tw-mt-4 tw-font-medium lg:tw-flex-row lg:tw-space-x-8 lg:tw-mt-0">
                        <li v-for="(item, index) in menu">
                            <NuxtLink class="tw-block tw-py-2 tw-pr-4 tw-pl-3 tw-text-white tw-rounded tw-bg-primary-700 lg:tw-bg-transparent lg:tw-text-primary-700 lg:tw-p-0 dark:tw-text-white" aria-current="page" :to=item.path>{{item.name}}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "NavigationBar",
    data() {
        return {
            menu: [
                {
                    name: "Home",
                    path: "/"
                },
                {
                    name: "Categories",
                    path: "/categories"
                }
            ]
        }
    }
})
</script>

<style scoped>

</style>
