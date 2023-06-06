<script setup>

</script>

<template>
  <section class="tw-min-h-screen tw-min-w-screen tw-bg-gray-900 tw-flex tw-justify-center tw-items-center">
    <div class="tw-h-screen tw-w-screen">
      <div class="tw-mx-auto tw-max-w-screen-xl">
        <div class="tw-mx-auto tw-max-w-screen-sm tw-text-center">
          <div class="tw-mb-4 tw-tracking-tight tw-font-extrabold tw-text-2xl tw-text-blue-600">404</div>
          <p class="tw-mb-4 tw-text-xl tw-tracking-tight tw-font-bold tw-text-gray-900 md:tw-text-4xl dark:tw-text-white">Something's missing.</p>
          <p class="tw-mb-4 tw-text-lg tw-font-light tw-text-gray-500 dark:tw-text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <a @click="navigateTo('/')" class="tw-inline-flex tw-text-white tw-bg-violet-600 hover:tw-bg-violet-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-violet-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:focus:tw-ring-violet-900 tw-my-4">Back to Homepage</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
