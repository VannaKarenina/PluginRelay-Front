<script lang="ts">
import {defineComponent} from "vue";
import {useAuthStore} from "~/stores/auth";
import SideNav from "~/components/base/SideNav.vue";
import {$fetch} from "ofetch";
export default defineComponent({
  components: {SideNav},
  setup() {
    definePageMeta({
      middleware: [
        "auth"
      ]
    })
    const store = useAuthStore();
    return {store}
  },
  async mounted() {
    this.user = await $fetch('http://127.0.0.1:3890/v1/account/identity', {
      headers: {
        Authorization: `Bearer ${this.store.token}`
      }
    })

    console.log(this.user)

    if (this.user.code === 401) {
      this.store.logout();
      return navigateTo('/')
    }
  },
  data() {
    return {
      user: {} as object,
    }
  }
})
</script>

<template>
  <div class="tw-flex tw-flex-row tw-min-h-screen">
    <SideNav/>
    <div class="tw-min-h-screen tw-ml-10">
      <div class="tw-flex tw-justify-center">
        <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 tw-mt-5">
          <!-- Loop through projects -->
          <div v-for="(project, index) in user.projects" :key="index">
            <projects-card :project="project"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
