<script lang="ts">
import {defineComponent} from 'vue'
import {useAuthStore} from "~/stores/auth";
import {$fetch} from "ofetch";

export default defineComponent({
  name: "Projects",
  setup() {
    const user = ref({});
    const store = useAuthStore();
    onMounted(async () => {
      try {
        user.value = await $fetch('http://127.0.0.1:3890/v1/account/identity', {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 401) {
          store.logout()
          return navigateTo('/')
        } else {
          console.error(error);
        }
      }
    })
    return {store, user}
  }
})
</script>

<template>
  <div class="tw-min-h-screen tw-ml-10">
    <div class="tw-flex tw-justify-center">
      <div class="tw-p-4 tw-grid tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 tw-mt-5">
        <!-- Loop through projects -->
        <div v-for="(project, index) in user.projects" :key="index">
          <projects-card :project="project"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
