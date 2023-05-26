<script lang="ts">
import {defineComponent} from 'vue'
import {useAuthStore} from "~/stores/auth";
import {mapActions, mapState} from "pinia";
import ErrorModal from "~/components/InfoModals/ErrorModal.vue";
export default defineComponent({
  name: "signin",
  components: {ErrorModal},
  setup() {
    const store = useAuthStore();
    const route = useRoute();
    return {store,route}
  },
  methods: {
    changeToSignUp() {
      this.$emit('close')
    },
    async login() {

      const payload: any = await $fetch('http://127.0.0.1:3890/v1/account/login', {
        method: 'POST',
        body: this.loginPayload
      })

      try {
        if (payload.code == 401) {
          this.$refs.err.error = 'Authorization failed';
          this.$refs.err.close();
        } else {
          if (payload.code != 800) {
            this.store.login(payload.access_token);
            if (this.route.path != '/user/dashboard') {
              this.$emit('redirect')
              return navigateTo('/user/dashboard')
            }
          } else {
            this.$emit('verify', this.loginPayload.loginOrEmail)
          }
        }
      } catch (e) {
        console.log(e)
      }

    },
  },
  data() {
    return {
      loginPayload: {
        loginOrEmail: '',
        password: ''
      }
    }
  }
})
</script>

<template>
  <div class="tw-h-550 tw-bg-gray-50 dark:tw-bg-gray-900 tw-p-5">
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-mx-auto">
      <a href="#" class="tw-flex tw-items-center tw-mb-6 tw-text-2xl tw-font-semibold tw-text-gray-900 dark:tw-text-white">
        <img class="tw-w-8 tw-h-8 tw-mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        Plugin Relay
      </a>
      <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow dark:tw-border md:tw-mt-0 sm:tw-max-w-md xl:tw-p-0 dark:tw-bg-gray-800 dark:tw-border-gray-700">
        <div class="tw-p-6 tw-space-y-4 md:tw-space-y-6 sm:tw-p-8">
          <h1 class="tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white">
            Sign in to your account
          </h1>
          <form v-on:submit.prevent="login" class="tw-space-y-4 md:tw-space-y-6" action="#">
            <div>
              <label for="lor" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Your email</label>
              <input v-model="loginPayload.loginOrEmail" type="text" name="lor" id="lor" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" placeholder="login or name@company.com" required="">
            </div>
            <div>
              <label for="password" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Password</label>
              <input v-model="loginPayload.password" type="password" name="password" id="password" placeholder="••••••••" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" required="">
            </div>
            <div class="tw-flex tw-items-center tw-justify-between">
              <a href="#" class="tw-text-sm tw-font-medium tw-text-blue-600 hover:tw-underline dark:tw-text-primary-500">Forgot password?</a>
            </div>
            <button type="submit" class="tw-w-full tw-text-white tw-bg-violet-800 hover:tw-bg-violet-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-violet-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-violet-600 dark:hover:tw-bg-violet-700 dark:focus:tw-ring-violet-800">Sign in</button>
            <p class="tw-text-sm tw-font-light tw-text-gray-500 dark:tw-text-gray-400">
              Don’t have an account yet? <a href="#" @click="changeToSignUp" class="tw-font-medium tw-text-blue-600 hover:tw-underline dark:tw-text-blue-500">Sign up</a>
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
