<script setup lang="ts">
import {useAuthStore} from "~/stores/auth";
import SideNav from "~/components/base/SideNav.vue";
import {$fetch} from "ofetch";
import Projects from "~/components/dashboard/Projects.vue";

definePageMeta({
  middleware: [
    "auth"
  ]
})

const store = useAuthStore();
const state = ref(0);

const {data: user} = await useAsyncData(
    'user',
    () => {
      try {
        return $fetch('http://127.0.0.1:3890/v1/account/identity', {
          headers: {
            Authorization: `Bearer ${store.token}`
          }
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          store.logout()
          navigateTo('/')
        } else {
          console.error(error);
        }
      }
    }


)

function changeState(e) {
  switch (e) {
    case 0:
      state.value = 0;
      break;
    case 1:
      state.value = 1;
      break;

  }
}
</script>

<template>
  <div class="tw-flex tw-flex-row tw-min-h-screen">
    <SideNav :account="user" @state="changeState" />
    <div v-if="state == 0" class="tw-w-screen tw-flex tw-flex-row tw-justify-around tw-items-center mb-16">
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
    <Projects v-if="state == 1" />
    <Games v-if="user.moderation_level >= 1 && state == 3"/>
  </div>
</template>

<style scoped>

</style>
