<script setup lang="ts">
import ErrorModal from "~/components/InfoModals/ErrorModal.vue";

const success = ref(null);
const error = ref(null);

const store = useAuthStore();
import {$fetch} from "ofetch";
import SuccessModal from "~/components/InfoModals/SuccessModal.vue";

const emit = defineEmits(['updated','created'])
const categories = await $fetch('http://127.0.0.1:3890/v1/category/all');
const user = await $fetch('http://127.0.0.1:3890/v1/account/identity', {
  headers: {
    Authorization: `Bearer ${store.token}`,
  }
})

const payload = ref({
  name: '',
  description: '',
  category: 0,
})

const image = ref({});
let eFile = {};
const preview = ref(false);

async function imageref(e) {
  let file = e.target.files
  eFile = file[0];
  if (file && file[0]) {
    let reader = new FileReader
    reader.onload = e => {
      image.value = e.target.result
    }
    reader.readAsDataURL(file[0])
  }
  preview.value = true;
}

async function create() {

  const project = await $fetch('http://127.0.0.1:3890/v1/project/create', {
    method: 'POST',
    body: {
      accountId: user.id,
      ...payload.value
    },
    headers: {
      Authorization: `Bearer ${store.token}`
    }
  })

  var formData = new FormData()
  formData.append("id", project);
  formData.append("file", eFile)


  const favicon = await $fetch('http://127.0.0.1:3890/v1/storage/uploadProjectFavicon', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${store.token}`
    }
  })

  if (project && favicon) {
    success.value.error = "Project created";
    success.value.close();
  }

  emit('updated', 1);

}

function closeSuccessModal() {
  success.value.close();
  emit('created');
}
</script>

<template>
  <div class="tw-bg-gray-900 dark:tw-bg-gray-900 tw-h-551 tw-w-551">
    <div class="tw-py-8 tw-px-4 tw-mx-auto tw-max-w-2xl ">
      <h2 class=" tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white">Add a new project</h2>
      <form v-on:submit.prevent="create">
        <div class="">
          <div class="sm:tw-col-span-2">
            <label for="name" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Name</label>
            <input v-model="payload.name" type="text" name="name" id="name" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-primary-500 dark:focus:tw-border-primary-500" placeholder="Type product name" required="required">
          </div>
          <div class="sm:tw-col-span-2 tw-mt-3">
            <label for="brand" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Description</label>
            <input v-model="payload.description" type="text" name="brand" id="brand" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-primary-500 dark:focus:tw-border-primary-500" placeholder="Product brand" required="required">
          </div>
          <div class="tw-mt-3">
            <label for="brand" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Category</label>
            <select id="countries"
                    class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-primary-500 dark:focus:tw-border-primary-500"
                    v-model="payload.category"
            >
              <option selected :value="-1">Choose a category</option>
              <option v-for="ct in categories" :key="ct.name" :value="ct.id">{{ ct.name }}</option>
            </select>
          </div>

          <div class="tw-mt-3">
            <label for="dropzone-file" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Project image</label>
            <div class="tw-flex tw-items-center tw-justify-center tw-w-full">
              <div>
                <label for="dropzone-file" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-64 tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 dark:hover:tw-bg-bray-800 dark:tw-bg-gray-700 hover:tw-bg-gray-100 dark:tw-border-gray-600 dark:hover:tw-border-gray-500 dark:hover:tw-bg-gray-600">
                  <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-5 tw-pb-6">
                    <div v-if="preview"
                         class="imagePreviewWrapper tw-rounded-lg"
                         :style="{ 'background-image': `url(${image})` }">
                    </div>
                    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-5 tw-pb-6" v-if="!preview">
                      <svg aria-hidden="true" class="tw-w-10 tw-h-10 tw-mb-3 tw-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p class="tw-mb-2 tw-text-sm tw-text-gray-500 dark:tw-text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                      <p class="tw-text-xs text-gray-500 dark:tw-text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                  </div>
                </label>
                <input id="dropzone-file" type="file" class="tw-hidden" @change="imageref" ref="fileInput" />
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="tw-inline-flex tw-items-center tw-px-5 tw-py-2 tw-mt-2 sm:tw-mt-4 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-violet-700 tw-rounded-lg focus:tw-ring-4 focus:tw-ring-violet-200 dark:focus:tw-ring-violet-900 hover:tw-bg-violet-800">
          Create
        </button>
      </form>
    </div>
    <SuccessModal @ok="closeSuccessModal" ref="success"/>
    <ErrorModal ref="error"/>
  </div>
</template>

<style scoped>
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
</style>
