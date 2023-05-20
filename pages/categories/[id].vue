<template>
  <div class="tw-min-h-screen">
    <div class="tw-flex tw-justify-center">
      <div>All modifications in &nbsp;</div>
      <div>{{category.name}}</div>
    </div>
    <div class="tw-flex tw-justify-center">
      <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 tw-gap-4 tw-mt-5">
        <!-- Loop through projects -->
        <div v-for="(project, index) in category.projects" :key="index">
          <projects-card :project="project"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import Modal from "~/components/base/Modal.vue";
import axios from "axios";
import {useRoute} from "#app";

export default defineComponent(
    {
      name: "[id]",
      components: {Modal},
      async setup() {
        const route = useRoute();

        const showModal = ref(false);
        function openModal() {
          showModal.value = true;
        }
        function closeModal() {
          showModal.value = false;
        }

        return {
          route,
          showModal,
          openModal,
          closeModal,
        };
      },
      data() {
        return {
          projectId: this.route.params.id,
          modal: false,
          image: 'http://127.0.0.1:3890/v1/storage/getCategoryAvatar?key=wl.png',
          category: {} as object
        }
      },
      async beforeMount() {
        this.category = await $fetch(`http://127.0.0.1:3890/v1/category/${this.projectId}`);
        console.log(this.category)
      }
    }
)
</script>

<style scoped>

</style>
