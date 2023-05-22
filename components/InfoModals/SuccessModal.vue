<script lang="ts">
import {defineComponent} from 'vue'
import Modal from "~/components/base/Modal.vue";

export default defineComponent({
  name: "SuccessModal",
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
    },
    fullClose() {
      this.$emit('ok')
    }
  }
})
</script>

<template>
  <Modal v-if="isActive" @close="close" >
    <div class="tw-relative tw-w-full tw-max-w-md tw-h-full md:tw-h-auto">
      <!-- Modal content -->
      <div class="tw-relative tw-p-4 tw-text-center tw-bg-white tw-rounded-lg tw-shadow dark:tw-bg-gray-800 sm:tw-p-5">
        <div class="tw-w-12 tw-h-12 tw-rounded-full tw-bg-green-100 dark:tw-bg-green-900 tw-p-2 tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-3.5">
          <svg aria-hidden="true" class="tw-w-8 tw-h-8 tw-text-green-500 dark:tw-text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
          <span class="tw-sr-only">Success</span>
        </div>
        <p class="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900 dark:tw-text-white">
          {{error}}
        </p>
        <button @click="fullClose" type="button" class="tw-py-2 tw-px-3 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-rounded-lg tw-bg-violet-600 hover:tw-bg-violet-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-violet-300 dark:focus:tw-ring-violet-900">
          Ok
        </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>

</style>
