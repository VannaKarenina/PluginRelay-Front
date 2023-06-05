<script setup lang="ts">
import SuccessModal from "~/components/InfoModals/SuccessModal.vue";
const success = ref(null);
const err = ref(null);
import ErrorModal from "~/components/InfoModals/ErrorModal.vue";
const props = defineProps([
    'loginOrEmail',
    'signature'
])
const emits = defineEmits([
    'done'
])
const passwords = ref({
  pass1: '',
  pass2: ''
})
const config = useRuntimeConfig();
function closeSuccessModal() {
  success.value.close();
  emits('done');
}

async function changePass() {

  if (passwords.value.pass1 === passwords.value.pass2) {
    const passchange = await $fetch(`${config.public.baseUrl}/v1/account/changePassword`, {
      method: 'POST',
      body: {
        loginOrEmail: props.loginOrEmail,
        signature: props.signature,
        password: passwords.value.pass1
      }
    })


    if (passchange.code == 802) {

      success.value.error = 'Account password changed!';
      success.value.close();

    }


  }

}
</script>

<template>
  <div class="tw-h-92 tw-bg-gray-50 dark:tw-bg-gray-900 tw-p-5">
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-mx-auto">
      <a href="#" class="tw-flex tw-items-center tw-mb-6 tw-text-2xl tw-font-semibold tw-text-gray-900 dark:tw-text-white">
        <img class="tw-w-8 tw-h-8 tw-mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        Plugin Relay
      </a>
      <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow dark:tw-border md:tw-mt-0 sm:tw-max-w-md xl:tw-p-0 dark:tw-bg-gray-800 dark:tw-border-gray-700">
        <div class="tw-p-6 tw-space-y-4 md:tw-space-y-6 sm:tw-p-8">
          <h1 class="tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white">
            Account recovery
          </h1>
          <form v-on:submit.prevent="changePass" class="tw-space-y-4 md:tw-space-y-6" action="#">
            <div>
              <label for="lor" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">New Password</label>
              <input v-model="passwords.pass1" type="text" name="lor" id="lor" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" placeholder="new password" required="">
            </div>
            <div>
              <label for="lor" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Repeat new password</label>
              <input v-model="passwords.pass2" type="text" name="lor" id="lor" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" placeholder="new password" required="">
            </div>
            <button type="submit" class="tw-w-full tw-text-white tw-bg-violet-800 hover:tw-bg-violet-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-violet-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-violet-600 dark:hover:tw-bg-violet-700 dark:focus:tw-ring-violet-800">Change password</button>
          </form>
        </div>
      </div>
    </div>
    <SuccessModal @ok="closeSuccessModal" ref="success"/>
    <ErrorModal ref="err"/>
  </div>
</template>

<style scoped>

</style>
