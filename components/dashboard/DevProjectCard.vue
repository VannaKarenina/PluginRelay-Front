<script setup lang="ts">
const props = defineProps(['project'])
function getDate(stamp: any) {
  return new Date(stamp).toISOString().split('T')[0];
}
function getImage(img: any) {
  if (img != null || img != undefined) {
    return 'http://127.0.0.1:3890/v1/storage/getProjectAvatar?key=' + img
  } else {
    return 'http://127.0.0.1:3890/v1/storage/getProjectAvatar?key=default.png'
  }
}
function check() {
  console.log(123)
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-w-auto tw-h-auto tw-items-center tw-bg-white tw-border tw-border-gray-200 tw-rounded-md tw-shadow md:tw-flex-row hover:tw-bg-gray-100 dark:tw-border-gray-700 dark:tw-bg-gray-800 dark:hover:tw-bg-gray-700">
    <img class="tw-m-2 tw-rounded-lg tw-w-24 tw-h-24" :src="getImage(project.favicon_path)" />
    <div class="tw-flex tw-m-2 tw-flex-col tw-justify-center tw-leading-normal">
      <h5 class="tw-text-xl tw-font-bold tw-tracking-tight tw-text-gray-900 dark:tw-text-white">{{project.name}}</h5>
      <p class="tw-text-sm tw-text-gray-700 dark:tw-text-gray-400">{{ project.description }}</p>
      <div class="tw-flex tw-flex-row tw-mt-1">
        <div class="tw-flex tw-flex-row tw-items-center tw-text-white tw-align-text-bottom">
          <font-awesome-icon :icon="['fas', 'calendar']" size="lg" />
          <h6 class="tw-ml-1">{{getDate(project.created_at)}}</h6>
        </div>
        <div class="tw-flex tw-flex-row tw-items-center tw-text-white tw-align-text-bottom tw-ml-5">
          <font-awesome-icon :icon="['fas', 'file-arrow-down']" size="lg" />
          <h6 class="tw-ml-1">{{project.downloads}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
