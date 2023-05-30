<script setup lang="ts">
const emits = defineEmits([
    'cancel',
    'deleted'
])
function closeModal() {
  emits('cancel')
}
function deleteProject() {

  emits('deleted')

}
</script>

<template>
  <div class="tw-relative tw-w-full tw-max-w-md tw-h-full md:tw-h-auto">
    <!-- Modal content -->
    <div class="tw-relative tw-p-4 tw-text-center tw-bg-white tw-rounded-lg tw-shadow dark:tw-bg-gray-800 sm:tw-p-5">
      <button type="button" class="tw-text-gray-400 tw-absolute tw-top-2.5 tw-right-2.5 tw-bg-transparent hover:tw-bg-gray-200 hover:tw-text-gray-900 tw-rounded-lg tw-text-sm tw-p-1.5 tw-ml-auto tw-inline-flex tw-items-center dark:hover:tw-bg-gray-600 dark:hover:tw-text-white" data-modal-toggle="deleteModal">
        <svg aria-hidden="true" class="tw-w-5 tw-h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        <span class="tw-sr-only">Close modal</span>
      </button>
      <svg class="tw-text-gray-400 dark:tw-text-gray-500 tw-w-11 tw-h-11 tw-mb-3.5 tw-mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
      <p class="tw-mb-4 tw-text-gray-500 dark:tw-text-gray-300">Are you sure you want to delete this item?</p>
      <div class="tw-flex tw-justify-center tw-items-center tw-space-x-4">
        <button @click="closeModal" data-modal-toggle="deleteModal" type="button" class="tw-py-2 tw-px-3 tw-text-sm tw-font-medium tw-text-white tw-bg-white tw-rounded-lg tw-border tw-border-gray-200 hover:tw-bg-gray-100 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-primary-300 hover:tw-text-gray-900 focus:tw-z-10 dark:tw-bg-gray-700 dark:tw-text-gray-300 dark:tw-border-gray-500 dark:hover:tw-text-white dark:hover:tw-bg-gray-600 dark:focus:tw-ring-gray-600">
          No, cancel
        </button>
        <button @click="deleteProject" type="submit" class="tw-py-2 tw-px-3 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-red-600 tw-rounded-lg hover:tw-bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
          Yes, I'm sure
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
