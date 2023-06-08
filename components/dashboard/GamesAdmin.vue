<script setup lang="ts">

import CategoryCreation from "~/components/dashboard/CRUD/CategoryCreation.vue";
import Modal from "~/components/base/Modal.vue";
import DevCard from "~/components/dashboard/DevCard.vue";
import DeleteGameModal from "~/components/dashboard/CRUD/DeleteGameModal.vue";
const store = useAuthStore();
const creation = ref(false);
const config = useRuntimeConfig();
const gameDeletion = ref(false);
const deletionId = ref(0);

const {data: categories, refresh: refr} = useAsyncData(
    'categories',
    () => $fetch(`${config.public.baseUrl}/v1/category/all`)
)

function toggleCreationModal() {
  creation.value = !creation.value
}

function toggleGameDeletion(e?: number) {
  if (e) {
    deletionId.value = e;
  }
  gameDeletion.value = !gameDeletion.value
}

async function refreshGamesBridge() {
  await refr();
}

async function refreshCategories(only: number) {
  if (only == 1) {
    toggleCreationModal();
  }
  if (only == 2) {
    toggleGameDeletion()
  }
  await refreshGamesBridge();
}

async function createdCategory() {
  await refreshCategories(1);
}

async function deleteGm() {
  const deletion = await $fetch(`${config.public.baseUrl}/v1/category/delete/${deletionId.value}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.token}`
    }
  })
  await refreshCategories(2);
}
</script>
<template>
  <div class="tw-min-h-screen tw-ml-10 tw-p-5">
    <button @click="toggleCreationModal"  class="tw-mt-3 tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
      Create category
    </button>
    <div class="tw-flex tw-justify-center tw-items-center tw-flex-grow tw-mt-7">
      <div class="tw-flex-col">
        <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-3 md:tw-grid-cols-5 lg:tw-grid-cols-5 tw-gap-4 tw-mt-5">
          <div v-for="(category, index) in categories" :key="index">
            <DevCard :project="category" @rmgame="refreshGamesBridge" @deleteGame="toggleGameDeletion" />
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="creation" @close="toggleCreationModal">
      <CategoryCreation @cd="createdCategory"/>
    </Modal>
    <Modal v-if="gameDeletion" @close="toggleGameDeletion">
      <DeleteGameModal @deleted="deleteGm" @cancel="toggleGameDeletion"/>
    </Modal>
  </div>
</template>

<style scoped>

</style>
