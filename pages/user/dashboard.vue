<script lang="ts">
import {useAuthStore} from "~/stores/auth";
import SideNav from "~/components/base/SideNav.vue";
import {$fetch} from "ofetch";
import Projects from "~/components/dashboard/Projects.vue";
export default {
  components: {SideNav, Projects},
  async setup() {
    definePageMeta({
      middleware: [
        "auth"
      ]
    })
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
  },
  data() {
    return {
      state: 0
    }
  },
  methods: {
    changeState(e) {
      switch (e) {
        case 0:
          this.state = 0;
          break;
        case 1:
          this.state = 1;
          break;

      }
    },
  }
}
</script>

<template>
  <div class="tw-flex tw-flex-row tw-min-h-screen">
    <SideNav :account="user" @state="changeState" />
    <Projects v-if="state == 1" />
  </div>
</template>

<style scoped>

</style>
