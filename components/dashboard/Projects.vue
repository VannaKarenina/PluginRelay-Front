<script setup lang="ts">
import {useAuthStore} from "~/stores/auth";
import {$fetch} from "ofetch";
import Modal from "~/components/base/Modal.vue";
import Create from "~/components/dashboard/CRUD/Create.vue";

const store = useAuthStore();
const {data: user, refresh: refreshUser} = await useAsyncData(
    'user',
    () => $fetch('http://127.0.0.1:3890/v1/account/identity', {
      headers: {
        Authorization: `Bearer ${store.token}`,
      }
    }),
)
const currentProject = ref({});
const selectedVersion = ref(-1);
const selectedVersionObj = ref({});
const creation = ref(false);
const cardModal = ref(false);

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

watchEffect(() => {
  refreshUser();
});
</script>

<template>
  <button @click="refreshUser">click</button>
  <div class="tw-min-h-screen tw-ml-10">
    <button @click="toggleCreationModal"  class="tw-mt-3 tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
      Create new project
    </button>
    <div class="tw-flex tw-justify-center">
      <div class="tw-p-4 tw-grid tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 tw-mt-5">
        <!-- Loop through projects -->
        <div v-for="(project, index) in user.projects" :key="index">
          <projects-card @click="openProjectModal(project.id)" :project="project"/>
        </div>
      </div>
    </div>
    <Modal v-if="cardModal" @close="toggleCardModal">
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
        </div>
      </div>
    </Modal>
    <Modal v-if="creation" @close="toggleCreationModal">
      <Create/>
    </Modal>
  </div>
</template>

<style scoped>

</style>
