<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "Modal",
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
})
</script>

<template>
    <div class="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-z-50">
        <div class="tw-bg-gray-700 tw-rounded-lg tw-p-1 lg:tw-w-300 lg:tw-h-200 sm:tw-w-100 tw-z-50">
            <slot></slot>
        </div>
        <div class="tw-fixed tw-inset-0 tw-bg-black tw-opacity-50" @click="closeModal"></div>
    </div>
</template>

<style scoped>

</style>
