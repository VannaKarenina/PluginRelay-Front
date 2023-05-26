<script lang="ts">
import {useAuthStore} from "~/stores/auth";
import {$fetch} from "ofetch";

export default defineNuxtComponent({
  name: "SideNav",
  setup() {
    const store = useAuthStore();
    const account = ref({});
    onMounted(async () => {
      account.value = await $fetch('http://127.0.0.1:3890/v1/account/identity', {
        headers: {
          Authorization: `Bearer ${store.token}`
        }
      })
    })
    return {store, account}
  },
  data() {
    return {
      dashboardState: 0,
    }
  },
  methods: {
    changeDashboardState(state: number) {
      switch (state) {
        case 0:
          this.$emit('state', 0)
          break;
        case 1:
          this.$emit('state', 1)
          break;
      }
    },
    getPermsLevel(perm: number) {
      switch (perm) {
        case 0:
          return 'User';
        case 1:
          return 'Moderator'
      }
    }
  }
})
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
              :src="`http://127.0.0.1:3890/v1/storage/getAccountImage?key=${account.avatar}`"
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
