<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "FooterBar"
})
</script>

<template>
    <footer class="tw-p-4 tw-bg-white sm:tw-p-6 dark:tw-bg-gray-800">
        <div class="tw-mx-auto tw-max-w-screen-xl">
            <div class="md:tw-flex md:tw-justify-between">
                <div class="tw-mb-6 md:tw-mb-0">
                    <a href="https://flowbite.com" class="tw-flex tw-items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="tw-mr-3 tw-h-8" alt="FlowBite Logo" />
                        <span class="tw-self-center tw-text-2xl tw-font-semibold tw-whitespace-nowrap dark:tw-text-white">Plugin Relay</span>
                    </a>
                </div>
                <div class="tw-grid tw-grid-cols-2 tw-gap-8 sm:tw-gap-6 sm:tw-grid-cols-3">
                    <div>
                        <h2 class="tw-mb-6 tw-text-sm tw-font-semibold tw-text-gray-900 tw-uppercase dark:tw-text-white">Follow us</h2>
                        <ul class="tw-text-gray-600 dark:tw-text-gray-400">
                            <li class="mb-4">
                                <a href="https://github.com/vannakarenina" class="hover:tw-underline ">Github</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="tw-mb-6 tw-text-sm tw-font-semibold tw-text-gray-900 tw-uppercase dark:tw-text-white">Legal</h2>
                        <ul class="tw-text-gray-600 dark:tw-text-gray-400">
                            <li class="mb-4">
                                <a href="#" class="hover:tw-underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" class="hover:tw-underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="tw-my-6 tw-border-gray-200 sm:tw-mx-auto dark:tw-border-gray-700 lg:tw-my-8" />
            <div class="sm:tw-flex sm:tw-items-center sm:tw-justify-between">
              <span class="tw-text-sm tw-text-gray-500 sm:tw-text-center dark:tw-text-gray-400">© 2023 <a href="https://flowbite.com" class="hover:underline">Plugin Relay™</a>. All Rights Reserved.
              </span>
            </div>
        </div>
    </footer>
</template>

<style scoped>

</style>
