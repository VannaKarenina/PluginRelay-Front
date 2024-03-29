<script setup lang="ts">
import {useAuthStore} from "~/stores/auth";
import {$fetch} from "ofetch";
import Modal from "~/components/base/Modal.vue";
import Create from "~/components/dashboard/CRUD/Create.vue";
import {refreshNuxtData} from "#app";
import {useAsyncData} from "#app/composables/asyncData";
import DevProjectCard from "~/components/dashboard/DevProjectCard.vue";
import DeleteProjectModal from "~/components/dashboard/CRUD/DeleteProjectModal.vue";
import EditProject from "~/components/dashboard/CRUD/EditProject.vue";
import AddVersion from "~/components/dashboard/CRUD/AddVersion.vue";
const config = useRuntimeConfig();
const store = useAuthStore();
const {data: user, pending: processing} = await useAsyncData(
    'user',
    () => $fetch(`${config.public.baseUrl}/v1/account/identity`, {
      headers: {
        Authorization: `Bearer ${store.token}`,
      }
    }),
).catch((error) => {
  if(error) {
    store.logout()
    navigateTo('/')
  }
})
const {data: projects, refresh: refreshProjects} = await useAsyncData(
    'projects',
    () => $fetch(`${config.public.baseUrl}/v1/project/projects/${user.value.id}`)
)
const refreshUser = async () => await refreshNuxtData('user');
const currentProject = ref({});
const currentProjectId = ref(0);
const selectedVersion = ref(-1);
const selectedVersionObj = ref({});
const creation = ref(false);
const cardModal = ref(false);
const deletion = ref(false);
const projectToDelete = ref(0);

const projectEdition = ref(0);
const edition = ref(false);

const newVersionModal = ref(false);
const projectVersionId = ref(0);

const versionDeletion = ref(false);
const versionDeletionId = ref(0);

const editVersion = ref(false);
const versionEditId = ref(0);

onMounted(() => {
  refreshUser()
})

function toggleEditVersion(id?: number) {
  if (id) {
    versionEditId.value = id;
  }
  editVersion.value = !editVersion.value
}

function toggleNewVersionModal(id?: number) {
  if (id) {
    projectVersionId.value = id;
  }
  newVersionModal.value = !newVersionModal.value
}

async function refetchProject(id: number) {
  currentProject.value = await $fetch(`${config.public.baseUrl}/v1/project/${id}`);
}

async function openProjectModal(id: number) {
  await refetchProject(id);
  currentProjectId.value = id;
  toggleCardModal();
}
function selectedVersionChanged() {
  if (selectedVersion.value > 0) {
    selectedVersionObj.value = currentProject.value.versions.find(obj => obj.id === selectedVersion.value)
  }
}

function toggleCreationModal() {
  creation.value = !creation.value
}

async function toggleEditionModal(id?: number) {
  if (id) {
    projectEdition.value = id;
  }
  edition.value = !edition.value
}

function toggleCardModal() {
  selectedVersion.value = -1;
  cardModal.value = !cardModal.value
}

async function refreshProjectsBridge() {
  await refreshProjects();
}

function toggleDeletionModal(id?: number) {
  if (id) {
    projectToDelete.value = id;
  }
  deletion.value = !deletion.value;
}

function toggleVersionDeletionModal(id?: number) {
  if (id) {
    versionDeletionId.value = id;
  }
  versionDeletion.value = !versionDeletion.value
}

async function deleteVersion() {
  const deletion = await $fetch(`${config.public.baseUrl}/v1/project/deleteVersion`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
    body: {
      id: versionDeletionId.value
    }
  })

  await refetchProject(currentProjectId.value);
  selectedVersion.value = -1;
  toggleVersionDeletionModal();

}

async function deleteProject() {
  const deletion = await $fetch(`${config.public.baseUrl}/v1/project/delete`, {
    method: 'POST',
    body: {
      id: projectToDelete.value
    },
    headers: {
      Authorization: `Bearer ${store.token}`,
    }
  })
  await refreshProjectsBridge();
  toggleCardModal();
  toggleDeletionModal();
}
async function  createdver() {
  toggleNewVersionModal()
  toggleCardModal();
  await refreshProjectsBridge();
}

async function closeVersionEditor() {
  toggleEditVersion();
  toggleCardModal();
  await refreshProjectsBridge();
}
</script>

<template>
  <div class="tw-min-h-screen tw-ml-5">
    <button @click="toggleCreationModal"  class="tw-mt-3 tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
      Create new project
    </button>
    <div class="tw-flex tw-justify-center">
      <div v-if="!processing" class="tw-p-2 tw-grid tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 tw-mt-5">
        <!-- Loop through projects -->
        <div v-for="(project, index) in projects" :key="index">
          <DevProjectCard @click="openProjectModal(project.id)" :project="project"  ref="devcard"/>
        </div>
      </div>
    </div>
    <Modal v-if="cardModal" @close="toggleCardModal">
      <div class="tw-w-550">
        <div class="tw-flex tw-flex-col tw-w-550 tw-items-center tw-bg-white tw-border tw-border-gray-200 tw-rounded-md tw-shadow md:tw-flex-row dark:tw-border-gray-700 dark:tw-bg-gray-700">
          <img v-if="!currentProject.favicon_path" class="tw-m-2 tw-rounded-lg tw-w-222" :src="`${config.public.baseUrl}/v1/storage/getProjectAvatar?key=default.png`" />
          <img v-else class="tw-m-2 tw-rounded-lg tw-w-222" :src="`${config.public.baseUrl}/v1/storage/getProjectAvatar?key=` + currentProject.favicon_path" />
          <div class="tw-flex tw-m-2 tw-flex-col tw-justify-center tw-leading-normal">
            <div class="tw-flex tw-flex-row">
              <h5 class="tw-text-xl tw-font-bold tw-tracking-tight tw-text-gray-900 dark:tw-text-white">{{currentProject.name}}</h5>
              <div class="tw-ml-5">
                <button @click="toggleEditionModal(currentProject.id)" type="button" class="focus:tw-outline-none tw-text-white tw-bg-purple-700 hover:tw-bg-purple-800 focus:tw-ring-4 focus:tw-ring-purple-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-3 tw-py-1.5 dark:tw-bg-purple-600 dark:hover:tw-bg-purple-700 dark:focus:tw-ring-purple-900">
                  <h3 class="tw-text-white">Edit</h3>
                </button>
                <button @click="toggleDeletionModal(currentProject.id)" type="button" class="tw-ml-2 focus:tw-outline-none tw-text-white tw-bg-purple-700 hover:tw-bg-purple-800 focus:tw-ring-4 focus:tw-ring-purple-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-3 tw-py-1.5 dark:tw-bg-purple-600 dark:hover:tw-bg-purple-700 dark:focus:tw-ring-purple-900">
                  <h3 class="tw-text-white">Delete</h3>
                </button>
                <button @click="toggleNewVersionModal(currentProject.id)" type="button" class="tw-ml-2 focus:tw-outline-none tw-text-white tw-bg-purple-700 hover:tw-bg-purple-800 focus:tw-ring-4 focus:tw-ring-purple-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-3 tw-py-1.5 dark:tw-bg-purple-600 dark:hover:tw-bg-purple-700 dark:focus:tw-ring-purple-900">
                  <h3 class="tw-text-white">New version</h3>
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
          <div class="tw-flex tw-flex-row">
            <h5 class="tw-text-xl tw-font-bold tw-tracking-tight tw-text-gray-900 dark:tw-text-white">Version name: {{selectedVersionObj.name}}</h5>
            <div class="tw-ml-3">
              <button @click="toggleEditVersion(selectedVersionObj.id)" type="button" class="focus:tw-outline-none tw-text-white tw-bg-purple-700 hover:tw-bg-purple-800 focus:tw-ring-4 focus:tw-ring-purple-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-3 tw-py-1.5 dark:tw-bg-purple-600 dark:hover:tw-bg-purple-700 dark:focus:tw-ring-purple-900">
                <h3 class="tw-text-white">Edit</h3>
              </button>
              <button @click="toggleVersionDeletionModal(selectedVersionObj.id)" type="button" class="tw-ml-2 focus:tw-outline-none tw-text-white tw-bg-purple-700 hover:tw-bg-purple-800 focus:tw-ring-4 focus:tw-ring-purple-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-3 tw-py-1.5 dark:tw-bg-purple-600 dark:hover:tw-bg-purple-700 dark:focus:tw-ring-purple-900">
                <h3 class="tw-text-white">Delete</h3>
              </button>
            </div>
          </div>
          <p class="tw-font-normal tw-text-gray-700 dark:tw-text-gray-400">Version description: {{ selectedVersionObj.description }}</p>
          <p class="tw-font-normal tw-text-gray-700 dark:tw-text-gray-400">Version: {{ selectedVersionObj.version }}</p>
          <p class="tw-font-normal tw-text-gray-700 dark:tw-text-gray-400">File: {{ selectedVersionObj.storage }}</p>
        </div>
        <Modal v-if="deletion" @close="toggleDeletionModal">
          <DeleteProjectModal @deleted="deleteProject" @cancel="toggleDeletionModal"/>
        </Modal>
        <Modal v-if="newVersionModal" @close="toggleNewVersionModal">
          <AddVersion :project-id="projectVersionId" @done="createdver"/>
        </Modal>
        <Modal v-if="editVersion" @close="toggleEditVersion">
          <DashboardCRUDEditVersion :version-id="versionEditId" @edited="closeVersionEditor"/>
        </Modal>
        <Modal v-if="versionDeletion" @close="toggleVersionDeletionModal">
          <DeleteProjectModal @deleted="deleteVersion" @cancel="toggleVersionDeletionModal"/>
        </Modal>
      </div>
    </Modal>
    <Modal v-if="creation" @close="toggleCreationModal">
      <Create @updated="refreshProjectsBridge" @created="toggleCreationModal"/>
    </Modal>
    <Modal v-if="edition" @close="toggleEditionModal">
      <EditProject :project-id="projectEdition" :user-id="user.id" @edited="refreshProjectsBridge" @succeed="toggleEditionModal" />
    </Modal>
  </div>
</template>

<style scoped>

</style>
