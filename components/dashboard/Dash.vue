<script setup lang="ts">
import {$fetch} from "ofetch";
import {useAuthStore} from "~/stores/auth";

const store = useAuthStore();
const isUserFetched = ref(false);
const config = useRuntimeConfig();
const {data: user, pending: isUser} = await useAsyncData(
    'user',
    () => $fetch(`${config.public.baseUrl}/v1/account/identity`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      }
    }).catch((error) => {
      isUserFetched.value = false
      if (error.data.statusCode === 401) {
        store.logout();
        navigateTo('/');
      }
    }).finally(() => {
      isUserFetched.value = true
    })
)
</script>

<template>
  <div class="tw-w-screen tw-flex tw-flex-row tw-justify-around tw-items-center mb-16">
    <div class="tw-w-60 tw-h-60 tw-bg-gray-700 tw-flex tw-rounded-lg tw-items-center tw-justify-center">
      <div class="tw-justify-self-center tw-text-center">
        <div class="tw-text-xl tw-text-white">
          {{user.projects.length}}
        </div>
        <div class="tw-text-xl tw-text-white">
          PROJECTS
        </div>
      </div>
    </div>
    <div class="tw-w-60 tw-h-60 tw-bg-gray-700 tw-flex tw-rounded-lg tw-items-center tw-justify-center">
      <div class="tw-justify-self-center tw-text-center">
        <div class="tw-text-xl tw-text-white">
          {{user.projects.reduce((total, obj) => total + obj.downloads, 0)}}
        </div>
        <div class="tw-text-xl tw-text-white">
          DOWNLOADS
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
