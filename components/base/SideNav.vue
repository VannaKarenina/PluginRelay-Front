<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "SideNav"
})
</script>

<template>
  <div
      id="view"
      class="tw-h-full tw-flex tw-flex-row"
  >
    <div
        id="sidebar"
        class="tw-bg-slate-700 tw-h-screen md:tw-block tw-shadow-xl tw-px-3 tw-w-30 md:tw-w-60 lg:tw-w-60 tw-overflow-x-hidden tw-transition-transform tw-duration-300 tw-ease-in-out"
    >
      <div class="tw-space-y-6 md:tw-space-y-10 tw-mt-10">
        <div id="profile" class="tw-space-y-3">
          <img
              src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt="Avatar user"
              class="tw-w-10 md:tw-w-16 tw-rounded-full tw-mx-auto"
          />
          <div>
            <h2
                class="tw-font-medium tw-text-xs md:tw-text-sm tw-text-center tw-text-white"
            >
              Eduard Pantazi
            </h2>
            <p class="tw-text-xs tw-text-white tw-text-center">Administrator</p>
          </div>
        </div>
        <div id="menu" class="tw-flex tw-flex-col tw-space-y-2">
          <a
              href=""
              class="tw-text-sm tw-font-medium tw-text-white tw-py-2 tw-px-2 hover:tw-bg-teal-500 hover:tw-text-white hover:tw-text-base tw-rounded-md tw-transition tw-duration-150 tw-ease-in-out"
          >
            <svg
                class="tw-w-6 tw-h-6 tw-fill-current tw-inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
            <span class="">Dashboard</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
