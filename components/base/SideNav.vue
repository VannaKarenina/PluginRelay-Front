<script setup lang="ts">
import {useAuthStore} from "~/stores/auth";
import {$fetch} from "ofetch";
const emit = defineEmits([
    'state'
])
const store = useAuthStore();
const dashboardState = ref(0);
const account = ref({});
const config = useRuntimeConfig();
try {
  account.value = await $fetch(`${config.public.baseUrl}/v1/account/identity`, {
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

function changeDashboardState(state: number) {
  switch (state) {
    case 0:
      emit('state', 0)
      break;
    case 1:
      emit('state', 1)
      break;
    case 2:
      emit('state', 2)
      break;
  }
}
function getPermsLevel(perm: number) {
  switch (perm) {
    case 0:
      return 'User';
    case 1:
      return 'Moderator'
    case 2:
      return 'SAdmin'
  }
}
</script>

<template>
  <div
      id="view"
      class="tw-min-h-screen tw-flex tw-flex-row"
  >
    <div
        id="sidebar"
        class="tw-bg-slate-700 tw-min-h-screen md:tw-block tw-shadow-xl tw-px-3 tw-w-30 md:tw-w-60 lg:tw-w-60 tw-overflow-x-hidden tw-transition-transform tw-duration-300 tw-ease-in-out"
    >
      <div class="tw-space-y-6 md:tw-space-y-10 tw-mt-10">
        <div id="profile" class="tw-space-y-3">
          <img
              v-if="account"
              :src="`${config.public.baseUrl}/v1/storage/getAccountImage?key=def.png`"
              alt="Avatar user"
              class="tw-w-10 md:tw-w-16 tw-rounded-full tw-mx-auto"
          />
          <div>
            <h2
                class="tw-font-medium tw-text-base md:tw-text-lg tw-text-center tw-text-white"
            >
              {{account.login}}
            </h2>
            <p class="tw-text-base tw-text-white tw-text-center">{{getPermsLevel(account.moderation_level)}}</p>
          </div>
        </div>
        <div id="menu" class="tw-flex tw-flex-col tw-space-y-2">
          <a
              @click="changeDashboardState(0)"
              class="tw-text-sm tw-font-medium tw-text-white tw-py-2 tw-px-2 hover:tw-bg-teal-500 hover:tw-text-white hover:tw-text-base tw-rounded-md tw-transition tw-duration-150 tw-ease-in-out"
          >
            <svg
                class="tw-w-8 tw-h-8 tw-fill-current tw-inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
            <span class="tw-text-lg tw-text-center">Dashboard</span>
          </a>
          <a
              @click="changeDashboardState(1)"
              class="tw-text-sm tw-font-medium tw-text-white tw-py-2 tw-px-2 hover:tw-bg-teal-500 hover:tw-text-white hover:tw-text-base tw-rounded-md tw-transition tw-duration-150 tw-ease-in-out"
          >
            <svg class="tw-w-8 tw-h-8 tw-fill-current tw-inline-block" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>project</title>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Combined-Shape" fill="white" transform="translate(64.000000, 34.346667)">
                  <path d="M192,7.10542736e-15 L384,110.851252 L384,332.553755 L192,443.405007 L1.42108547e-14,332.553755 L1.42108547e-14,110.851252 L192,7.10542736e-15 Z M42.666,157.654 L42.6666667,307.920144 L170.666,381.82 L170.666,231.555 L42.666,157.654 Z M341.333,157.655 L213.333,231.555 L213.333,381.82 L341.333333,307.920144 L341.333,157.655 Z M192,49.267223 L66.1333333,121.936377 L192,194.605531 L317.866667,121.936377 L192,49.267223 Z">

                  </path>
                </g>
              </g>
            </svg>
            <span class="tw-text-lg tw-text-center">Projects</span>
          </a>
          <a
              v-if="account.moderation_level > 1"
              @click="changeDashboardState(2)"
              class="tw-text-sm tw-font-medium tw-text-white tw-py-2 tw-px-2 hover:tw-bg-teal-500 hover:tw-text-white hover:tw-text-base tw-rounded-md tw-transition tw-duration-150 tw-ease-in-out"
          >
            <svg class="tw-w-8 tw-h-8 tw-fill-current tw-inline-block" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
              <title>ic_fluent_games_24_regular</title>
              <desc>Created with Sketch.</desc>
              <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="ic_fluent_games_24_regular" fill="white" fill-rule="nonzero">
                  <path d="M14.9978834,5 C18.8638767,5 21.9978834,8.13400675 21.9978834,12 C21.9978834,15.7854517 18.9931001,18.8690987 15.2385332,18.995941 L14.9978834,19 L9.00211656,19 C5.13612331,19 2.00211656,15.8659932 2.00211656,12 C2.00211656,8.21454828 5.00689994,5.13090132 8.76146681,5.00405902 L9.00211656,5 L14.9978834,5 Z M14.9978834,6.5 L9.00211656,6.5 C5.96455044,6.5 3.50211656,8.96243388 3.50211656,12 C3.50211656,14.9634791 5.84589657,17.3795391 8.78090942,17.4956328 L9.00211656,17.5 L14.9978834,17.5 C18.0354496,17.5 20.4978834,15.0375661 20.4978834,12 C20.4978834,9.03652085 18.1541034,6.62046086 15.2190906,6.5043672 L14.9978834,6.5 Z M8,9 C8.41421356,9 8.75,9.33578644 8.75,9.75 L8.74911656,11.248 L10.25,11.2487458 C10.6642136,11.2487458 11,11.5845322 11,11.9987458 C11,12.4129593 10.6642136,12.7487458 10.25,12.7487458 L8.74911656,12.748 L8.75,14.25 C8.75,14.6642136 8.41421356,15 8,15 C7.58578644,15 7.25,14.6642136 7.25,14.25 L7.24911656,12.748 L5.75,12.7487458 C5.33578644,12.7487458 5,12.4129593 5,11.9987458 C5,11.5845322 5.33578644,11.2487458 5.75,11.2487458 L7.24911656,11.248 L7.25,9.75 C7.25,9.33578644 7.58578644,9 8,9 Z M14.75,12.5 C15.4403559,12.5 16,13.0596441 16,13.75 C16,14.4403559 15.4403559,15 14.75,15 C14.0596441,15 13.5,14.4403559 13.5,13.75 C13.5,13.0596441 14.0596441,12.5 14.75,12.5 Z M16.75,9 C17.4403559,9 18,9.55964406 18,10.25 C18,10.9403559 17.4403559,11.5 16.75,11.5 C16.0596441,11.5 15.5,10.9403559 15.5,10.25 C15.5,9.55964406 16.0596441,9 16.75,9 Z" id="🎨-Color">

                  </path>
                </g>
              </g>
            </svg>
            <span class="tw-text-lg tw-text-center">Games control</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
