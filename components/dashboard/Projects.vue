<script setup lang="ts">
import {useAuthStore} from "~/stores/auth";
import {$fetch} from "ofetch";
import Modal from "~/components/base/Modal.vue";
import Create from "~/components/dashboard/CRUD/Create.vue";
import {refreshNuxtData} from "#app";
import {useAsyncData} from "#app/composables/asyncData";
import DevProjectCard from "~/components/dashboard/DevProjectCard.vue";

const store = useAuthStore();
const {data: user, pending: processing} = await useAsyncData(
    'user',
    () => $fetch('http://127.0.0.1:3890/v1/account/identity', {
      headers: {
        Authorization: `Bearer ${store.token}`,
      }
    }),
)
const {data: projects, refresh: refreshProjects} = await useAsyncData(
    'projects',
    () => $fetch('http://127.0.0.1:3890/v1/project/projects/1')
)
const refreshUser = async () => await refreshNuxtData('user');
const currentProject = ref({});
const selectedVersion = ref(-1);
const selectedVersionObj = ref({});
const creation = ref(false);
const cardModal = ref(false);

const deletion = ref(false);

onMounted(() => {
  refreshUser()
})

async function openProjectModal(id: number) {
  currentProject.value = await $fetch(`http://127.0.0.1:3890/v1/project/${id}`);
  toggleCardModal();
}
function selectedVersionChanged() {
  if (selectedVersion.value > 0) {
    selectedVersionObj.value = currentProject.value.versions[selectedVersion.value-1]
  }
}

function toggleCreationModal() {
  creation.value = !creation.value
}

function toggleCardModal() {
  cardModal.value = !cardModal.value
}

async function refreshProjectsBridge(e) {
  await refreshProjects();
}

function toggleDeletionModal() {
  deletion.value = !deletion.value
}
</script>

<template>
  <div class="tw-min-h-screen tw-ml-10">
    <button @click="toggleCreationModal"  class="tw-mt-3 tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
      Create new project
    </button>
    <div class="tw-flex tw-justify-center">
      <div v-if="!processing" class="tw-p-4 tw-grid tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 tw-mt-5">
        <!-- Loop through projects -->
        <div v-for="(project, index) in projects" :key="index">
          <DevProjectCard @click="openProjectModal(project.id)" :project="project"/>
        </div>
      </div>
    </div>
    <Modal v-if="cardModal" @close="toggleCardModal">
      <div class="tw-w-550">
        <div class="tw-flex tw-flex-col tw-w-550 tw-items-center tw-bg-white tw-border tw-border-gray-200 tw-rounded-md tw-shadow md:tw-flex-row dark:tw-border-gray-700 dark:tw-bg-gray-700">
          <img v-if="!currentProject.favicon_path" class="tw-m-2 tw-rounded-lg tw-w-222" :src="`http://localhost:3890/v1/storage/getProjectAvatar?key=default.png`" />
          <img v-else class="tw-m-2 tw-rounded-lg tw-w-222" :src="`http://localhost:3890/v1/storage/getProjectAvatar?key=` + currentProject.favicon_path" />
          <div class="tw-flex tw-m-2 tw-flex-col tw-justify-center tw-leading-normal">
            <div class="tw-flex tw-flex-row">
              <h5 class="tw-text-xl tw-font-bold tw-tracking-tight tw-text-gray-900 dark:tw-text-white">{{currentProject.name}}</h5>
              <div class="tw-ml-5">
                <button type="button" class="focus:tw-outline-none tw-text-white tw-bg-purple-700 hover:tw-bg-purple-800 focus:tw-ring-4 focus:tw-ring-purple-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-3 tw-py-1.5 dark:tw-bg-purple-600 dark:hover:tw-bg-purple-700 dark:focus:tw-ring-purple-900">
                  <h3 class="tw-text-white">Edit</h3>
                </button>
                <button @click="toggleDeletionModal" type="button" class="tw-ml-2 focus:tw-outline-none tw-text-white tw-bg-purple-700 hover:tw-bg-purple-800 focus:tw-ring-4 focus:tw-ring-purple-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-3 tw-py-1.5 dark:tw-bg-purple-600 dark:hover:tw-bg-purple-700 dark:focus:tw-ring-purple-900">
                  <h3 class="tw-text-white">Delete</h3>
                </button>
              </div>
            </div>
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
        </div>
        <Modal v-if="deletion" @close="toggleDeletionModal">
          <div class="tw-relative tw-w-full tw-max-w-md tw-h-full md:tw-h-auto">
            <!-- Modal content -->
            <div class="tw-relative tw-p-4 tw-text-center tw-bg-white tw-rounded-lg tw-shadow dark:tw-bg-gray-800 sm:tw-p-5">
              <button type="button" class="tw-text-gray-400 tw-absolute tw-top-2.5 tw-right-2.5 tw-bg-transparent hover:tw-bg-gray-200 hover:tw-text-gray-900 tw-rounded-lg tw-text-sm tw-p-1.5 tw-ml-auto tw-inline-flex tw-items-center dark:hover:tw-bg-gray-600 dark:hover:tw-text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" class="tw-w-5 tw-h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="tw-sr-only">Close modal</span>
              </button>
              <svg class="tw-text-gray-400 dark:tw-text-gray-500 tw-w-11 tw-h-11 tw-mb-3.5 tw-mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              <p class="tw-mb-4 tw-text-gray-500 dark:tw-text-gray-300">Are you sure you want to delete this item?</p>
              <div class="tw-flex tw-justify-center tw-items-center tw-space-x-4">
                <button @click="toggleDeletionModal" data-modal-toggle="deleteModal" type="button" class="tw-py-2 tw-px-3 tw-text-sm tw-font-medium tw-text-white tw-bg-white tw-rounded-lg tw-border tw-border-gray-200 hover:tw-bg-gray-100 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-primary-300 hover:tw-text-gray-900 focus:tw-z-10 dark:tw-bg-gray-700 dark:tw-text-gray-300 dark:tw-border-gray-500 dark:hover:tw-text-white dark:hover:tw-bg-gray-600 dark:focus:tw-ring-gray-600">
                  No, cancel
                </button>
                <button type="submit" class="tw-py-2 tw-px-3 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-red-600 tw-rounded-lg hover:tw-bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </Modal>
    <Modal v-if="creation" @close="toggleCreationModal">
      <Create @updated="refreshProjectsBridge" @created="toggleCreationModal"/>
    </Modal>
  </div>
</template>

<style scoped>

</style>
