<script setup lang="ts">
import {useAuthStore} from "~/stores/auth";
import SideNav from "~/components/base/SideNav.vue";
import Projects from "~/components/dashboard/Projects.vue";
import GamesAdmin from "~/components/dashboard/GamesAdmin.vue";
import {$fetch} from "ofetch";
import Dash from "~/components/dashboard/Dash.vue";

definePageMeta({
  middleware: [
    "auth"
  ]
})
const store = useAuthStore();
const state = ref(-1);
const isUserFetched = ref(false);

function changeState(e) {
  switch (e) {
    case 0:
      state.value = 0;
      break;
    case 1:
      state.value = 1;
      break;
    case 2:
      state.value = 2;
      break;

  }
}
</script>

<template>
  <div class="tw-flex tw-flex-row tw-min-h-screen">
    <SideNav @state="changeState" />
    <Dash v-if="state == 0"/>
    <Projects v-if="state == 1" />
    <GamesAdmin v-if="state == 2"/>
  </div>
</template>

<style scoped>

</style>
