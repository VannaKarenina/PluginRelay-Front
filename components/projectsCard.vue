<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "projectsCard",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      image: 'http://127.0.0.1:3890/v1/storage/getProjectAvatar?key=default.png'
    }
  },
  mounted() {
    if (this.project.favicon_path) {
      this.image = 'http://127.0.0.1:3890/v1/storage/getProjectAvatar?key=' + this.project.favicon_path
    }
  },
  methods: {
    getDate(stamp: any) {
      return new Date(stamp).toISOString().split('T')[0];
    }
  },
})
</script>

<template>
  <div class="tw-flex tw-flex-col tw-w-550 tw-items-center tw-bg-white tw-border tw-border-gray-200 tw-rounded-md tw-shadow md:tw-flex-row hover:tw-bg-gray-100 dark:tw-border-gray-700 dark:tw-bg-gray-800 dark:hover:tw-bg-gray-700">
    <img class="tw-m-2 tw-rounded-lg tw-w-222" :src="this.image" />
    <div class="tw-flex tw-m-2 tw-flex-col tw-justify-center tw-leading-normal">
      <h5 class="tw-text-xl tw-font-bold tw-tracking-tight tw-text-gray-900 dark:tw-text-white">{{project.name}}</h5>
      <p class="tw-font-normal tw-text-gray-700 dark:tw-text-gray-400">{{ project.description }}</p>
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
