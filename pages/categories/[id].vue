<template>
  <div class="tw-min-h-screen tw-p-4">
    <div class="tw-flex tw-justify-center tw-mt-5">
      <h1 class="tw-text-white tw-text-2xl">All modifications in &nbsp;</h1>
      <h1 class="tw-text-violet-700 tw-text-2xl">{{category.name}}</h1>
    </div>
    <div class="tw-flex tw-justify-center">
      <div v-if="isAmountOfProjects" class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 tw-mt-5">
        <!-- Loop through projects -->
        <div v-for="(project, index) in category.projects" :key="index">
          <projects-card @click="openProjectModal(project.id)" :project="project"/>
        </div>
      </div>
      <div v-else class="tw-mt-48 ">
        <h1 class="tw-text-white tw-text-2xl">There are no modifications in this category : ( Maybe you will be the first?</h1>
      </div>
    </div>
    <Modal v-if="showModal" @close="modalClose">
      <div class="tw-w-550">
        <div class="tw-flex tw-flex-col tw-w-550 tw-items-center tw-bg-white tw-border tw-border-gray-200 tw-rounded-md tw-shadow md:tw-flex-row dark:tw-border-gray-700 dark:tw-bg-gray-700">
          <img v-if="!currentProject.favicon_path" class="tw-m-2 tw-rounded-lg tw-w-222" :src="`http://localhost:3890/v1/storage/getProjectAvatar?key=default.png`" />
          <img v-else class="tw-m-2 tw-rounded-lg tw-w-222" :src="`http://localhost:3890/v1/storage/getProjectAvatar?key=` + currentProject.favicon_path" />
          <div class="tw-flex tw-m-2 tw-flex-col tw-justify-center tw-leading-normal">
            <h5 class="tw-text-xl tw-font-bold tw-tracking-tight tw-text-gray-900 dark:tw-text-white">{{currentProject.name}}</h5>
            <p class="tw-font-normal tw-text-gray-700 dark:tw-text-gray-400">{{ currentProject.description }}</p>
          </div>
        </div>
        <div>
          <label for="countries" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-white tw-mt-1">Select modification version</label>
          <select id="countries"
                  class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-block tw-w-full tw-p-2.5"
                  v-model="selectedVersion"
                  @change="selectedVersionChanged"
          >
            <option selected :value="-1">Choose a version</option>
            <option v-for="version in currentProject.versions" :key="version.name" :value="version.id">{{ version.version }}</option>
          </select>
        </div>
        <div v-if="selectedVersion > 0" class="tw-flex tw-m-2 tw-flex-col tw-justify-center tw-leading-normal">
          <h5 class="tw-text-xl tw-font-bold tw-tracking-tight tw-text-gray-900 dark:tw-text-white">Version name: {{selectedVersionObj.name}}</h5>
          <p class="tw-font-normal tw-text-gray-700 dark:tw-text-gray-400">Version description: {{ selectedVersionObj.description }}</p>
          <p class="tw-font-normal tw-text-gray-700 dark:tw-text-gray-400">Version: {{ selectedVersionObj.version }}</p>
          <p class="tw-font-normal tw-text-gray-700 dark:tw-text-gray-400">File: {{ selectedVersionObj.storage }}</p>
          <button v-if="selectedVersionObj.storage" @click="download(selectedVersionObj.storage, selectedVersionObj.id)"  class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
            Download
          </button>
        </div>
      </div>
    </Modal>
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
          category: {} as object,
          currentProject: {} as object,
          selectedVersion: -1,
          selectedVersionObj: {} as object,
          amountOfProjects: 0
        }
      },
      async beforeMount() {
        this.category = await $fetch(`http://127.0.0.1:3890/v1/category/${this.projectId}`);
        this.amountOfProjects = this.category.projects.length
      },
      methods: {
        async openProjectModal(id: number) {
          this.currentProject = await $fetch(`http://127.0.0.1:3890/v1/project/${id}`);
          this.openModal();
        },
        async selectedVersionChanged() {
          if (this.selectedVersion > 0) {
            this.selectedVersionObj = this.currentProject.versions[this.selectedVersion-1]
          }
        },
        async modalClose() {
          this.selectedVersion = -1;
          this.closeModal()
        },
        async download(key: string, id: number) {
          const file = await $fetch(`http://127.0.0.1:3890/v1/storage/versionFile?key=${key}&id=${id}`, {
            responseType: 'blob',
          })

          const url = URL.createObjectURL(new Blob([file]));

          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', key);
          document.body.appendChild(link);
          link.click();


        }
      },
      computed: {
        isAmountOfProjects() {
          return this.amountOfProjects > 0
        }
      }
    }
)
</script>

<style scoped>

</style>
