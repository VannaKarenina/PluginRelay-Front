<script setup lang="ts">

import ErrorModal from "~/components/InfoModals/ErrorModal.vue";
import SuccessModal from "~/components/InfoModals/SuccessModal.vue";
import {useAsyncData} from "#app/composables/asyncData";
import {$fetch} from "ofetch";

const success = ref(null);
const error = ref(null);
const store = useAuthStore();
const config = useRuntimeConfig();
let eFile = ref({});
const version = ref({});
const user = ref({});

//props
const props = defineProps([
    'versionId'
])
const emit = defineEmits([
    'edited'
])

try {
  user.value = await $fetch(`${config.public.baseUrl}/v1/account/identity`, {
    headers: {
      Authorization: `Bearer ${store.token}`,
    }
  })
} catch (e) {
  store.logout()
  navigateTo('/')
}

version.value = await $fetch(`${config.public.baseUrl}/v1/project/version/${props.versionId}`, {
  headers: {
    Authorization: `Bearer ${store.token}`,
  }
});

function closeSuccessModal() {
 success.value.close()
  emit('edited')
}

async function edit() {

  let plugin;
  const vers = await $fetch(`${config.public.baseUrl}/v1/project/editVersion`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
    body: {
      accountId: user.value.id,
      id: props.versionId,
      name: version.value.name,
      description: version.value.description,
      version: version.value.version
    }
  })

  if (eFile.value.name && eFile.value.name.length > 0) {
    var formData = new FormData()
    formData.append("id", version.value.id);
    formData.append("file", eFile.value)

    plugin = await $fetch(`${config.public.baseUrl}/v1/storage/uploadProjectFile`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${store.token}`
      }
    })
  }

  success.value.error = "Version created";
  success.value.close();

}

async function fileUpload(e) {
  let file = e.target.files
  eFile.value = file[0];
}

</script>

<template>
  <div class="tw-bg-gray-900 dark:tw-bg-gray-900 tw-h-auto tw-w-551">
    <div class="tw-py-8 tw-px-4 tw-mx-auto tw-max-w-2xl ">
      <h2 class=" tw-text-xl tw-font-bold tw-text-gray-900 dark:tw-text-white">Version edit</h2>
      <form v-on:submit.prevent="edit">
        <div class="">
          <div class="sm:tw-col-span-2">
            <label for="name" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Name</label>
            <input v-model="version.name" type="text" name="name" id="name" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-primary-500 dark:focus:tw-border-primary-500" placeholder="Name" required="required">
          </div>
          <div class="sm:tw-col-span-2 tw-mt-3">
            <label for="desc" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Description</label>
            <input v-model="version.description" type="text" name="desc" id="desc" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-primary-500 dark:focus:tw-border-primary-500" placeholder="Description" required="required">
          </div>
          <div class="sm:tw-col-span-2 tw-mt-3">
            <label for="ver" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Version</label>
            <input v-model="version.version" type="text" name="ver" id="ver" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-primary-500 dark:focus:tw-border-primary-500" placeholder="Version" required="required">
          </div>
          <div class="sm:tw-col-span-2 tw-mt-3">
            <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white" for="file_input">Upload file</label>
            <input @change="fileUpload" class="tw-block tw-w-full tw-text-sm tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 dark:tw-text-gray-400 focus:tw-outline-none dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-900" id="file_input" type="file">
          </div>
        </div>
        <button type="submit" class="tw-inline-flex tw-items-center tw-px-5 tw-py-2 tw-mt-2 sm:tw-mt-4 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-violet-700 tw-rounded-lg focus:tw-ring-4 focus:tw-ring-violet-200 dark:focus:tw-ring-violet-900 hover:tw-bg-violet-800">
          Edit
        </button>
      </form>
    </div>
    <SuccessModal @ok="closeSuccessModal" ref="success"/>
    <ErrorModal ref="error"/>
  </div>
</template>

<style scoped>

</style>
