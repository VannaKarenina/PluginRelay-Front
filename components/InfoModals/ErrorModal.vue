<script lang="ts">
import {defineComponent} from 'vue'
import Modal from "~/components/base/Modal.vue";

export default defineComponent({
  name: "ErrorModal",
  components: {Modal},
  data() {
    return {
      error: '',
      isActive: false
    }
  },
  methods: {
    close() {
      this.isActive = !this.isActive
    }
  }
})
</script>

<template>
  <Modal v-if="isActive" @close="close" >
    <div class="tw-relative tw-w-full tw-max-w-md tw-h-full md:tw-h-auto">
      <!-- Modal content -->
      <div class="tw-relative tw-p-4 tw-text-center tw-bg-white tw-rounded-lg tw-shadow dark:tw-bg-gray-800">
        <div class="tw-w-12 tw-h-12 tw-rounded-full tw-bg-red-100 dark:tw-bg-red-900 tw-p-2 tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-3.5">
          <svg aria-hidden="true" class="tw-w-8 tw-h-8 tw-text-red-500 dark:tw-text-red-400" fill="currentColor" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"/></svg>
          <span class="tw-sr-only">Error</span>
        </div>
        <p class="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900 dark:tw-text-white">
          {{error}}
        </p>
        <button @click="close" type="button" class="tw-py-2 tw-px-3 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-rounded-lg tw-bg-violet-600 hover:tw-bg-violet-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-violet-300 dark:focus:tw-ring-violet-900">
          Ok
        </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>

</style>
