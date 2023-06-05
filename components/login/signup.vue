<script lang="ts">
import {defineComponent} from 'vue'
import {password} from "iron-webcrypto";
import ErrorModal from "~/components/InfoModals/ErrorModal.vue";

export default defineComponent({
  name: "signup",
  components: {ErrorModal},
  setup() {
    const config = useRuntimeConfig();
    return {config}
  },
  methods: {
    changeToSifnIn() {
      this.$emit('close')
    },
    async submit() {
      if (this.registerPayload.password != this.passwordRetry) {
        alert('Password should be same !');
        return;
      }

      const data = await $fetch(`${this.config.public.baseUrl}/v1/account/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: this.registerPayload
      })

      if (data.code != 405) {
        this.$emit('verify', this.registerPayload.email)
      } else {
        this.$refs.err.error = data.message;
        this.$refs.err.close();
      }
    }
  },
  data() {
    return {
      registerPayload: {
        login: '',
        email: '',
        password: ''
      },
      passwordRetry: ''
    }
  },
})
</script>

<template>
  <div class="tw-bg-gray-50 dark:tw-bg-gray-900 tw-p-5 tw-h-551">
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-mx-auto ">
      <a href="#" class="tw-flex tw-items-center tw-mb-6 tw-text-2xl tw-font-semibold tw-text-gray-900 dark:tw-text-white">
        <img class="tw-w-8 tw-h-8 tw-mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        Plugin Relay
      </a>
      <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow dark:tw-border md:tw-mt-0 sm:tw-max-w-md xl:tw-p-0 dark:tw-bg-gray-800 dark:tw-border-gray-700">
        <div class=" tw-space-y-4 md:tw-space-y-6 sm:tw-p-5">
          <h1 class="tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white">
            Create and account
          </h1>
          <form v-on:submit.prevent="submit" class="tw-space-y-4 md:tw-space-y-5" action="#" autocomplete="on">
            <div>
              <label for="login" class="tw-block tw-mb-1 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Your login</label>
              <input v-model="registerPayload.login" type="text" name="login" id="login" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" placeholder="login" required="">
            </div>
            <div>
              <label for="email" class="tw-block tw-mb-1 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Your email</label>
              <input v-model="registerPayload.email" type="email" name="email" id="email" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" placeholder="name@company.com" required="">
            </div>
            <div>
              <label for="password" class="tw-block tw-mb-1 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Password</label>
              <input v-model="registerPayload.password" type="password" name="password" id="password" placeholder="••••••••" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" required="">
            </div>
            <div>
              <label for="confirm-password" class="tw-block tw-mb-1 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Confirm password</label>
              <input v-model="passwordRetry" type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" required="">
            </div>
            <div class="tw-flex tw-items-start">
              <div class="tw-flex tw-items-center tw-h-5">
                <input id="terms" aria-describedby="terms" type="checkbox" class="tw-w-4 tw-h-4 tw-border tw-border-gray-300 tw-rounded tw-bg-gray-50 focus:tw-ring-3 focus:tw-ring-primary-300 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:focus:tw-ring-primary-600 dark:tw-ring-offset-gray-800" required="">
              </div>
              <div class="tw-ml-3 tw-text-sm">
                <label for="terms" class="tw-font-light tw-text-gray-500 dark:tw-text-gray-300">I accept the <a class="tw-font-medium tw-text-primary-600 hover:tw-underline dark:tw-text-primary-500" href="#">Terms and Conditions</a></label>
              </div>
            </div>
            <button type="submit" class="tw-w-full tw-text-white tw-bg-violet-600 hover:tw-bg-violet-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-violet-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-violet-600 dark:hover:tw-bg-violet-700 dark:focus:tw-ring-violet-800">Create an account</button>
            <p class="tw-text-sm tw-font-light tw-text-gray-500 dark:tw-text-gray-400">
              Already have an account? <a href="#" @click="changeToSifnIn" class="tw-font-medium tw-text-blue-600 hover:tw-underline dark:tw-text-blue-500">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
    <ErrorModal ref="err"/>
  </div>
</template>

<style scoped>

</style>
