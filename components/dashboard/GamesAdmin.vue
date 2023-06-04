<script setup lang="ts">

import CategoryCreation from "~/components/dashboard/CRUD/CategoryCreation.vue";
import Modal from "~/components/base/Modal.vue";
import DevCard from "~/components/dashboard/DevCard.vue";

const creation = ref(false);

const {data: categories, refresh: refr} = useAsyncData(
    'categories',
    () => $fetch('http://127.0.0.1:3890/v1/category/all')
)

function toggleCreationModal() {
  creation.value = !creation.value
}

async function refreshCategories() {
  await refr();
  toggleCreationModal();
}

async function createdCategory() {
  await refreshCategories();
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
            <DevCard :project="category" />
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="creation" @close="toggleCreationModal">
      <CategoryCreation @cd="createdCategory"/>
    </Modal>
  </div>
</template>

<style scoped>

</style>
