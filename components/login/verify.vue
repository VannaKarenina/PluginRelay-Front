<script lang="ts">
import {defineComponent} from 'vue'
import ErrorModal from "~/components/InfoModals/ErrorModal.vue";
import SuccessModal from "~/components/InfoModals/SuccessModal.vue";

export default defineComponent({
  name: "verify",
  components: {SuccessModal, ErrorModal},
  setup() {
    const config = useRuntimeConfig();
    return {config}
  },
  data() {
    return {
      code: ''
    }
  },
  props: {
    email: {
      type: String,
      required: true
    }
  },
  methods: {
    async submit() {
      const data = await $fetch(`${this.config.public.baseUrl}/v1/account/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email: this.email,
          code: parseInt(this.code),
        }
      });

      if (data.code == 405) {
        this.$refs.err.close();
        this.$refs.err.error = data.message;
      } else {

        this.$refs.success.close();
        this.$refs.success.error = data.message;
      }
    },
    closing() {
      this.$refs.success.close();
      this.$emit('close')
    }
  }
})
</script>

<template>
  <div class="tw-h-552 tw-bg-gray-50 dark:tw-bg-gray-900 tw-p-5">
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-mx-auto">
      <a href="#" class="tw-flex tw-items-center tw-mb-6 tw-text-2xl tw-font-semibold tw-text-gray-900 dark:tw-text-white">
        <img class="tw-w-8 tw-h-8 tw-mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        Plugin Relay
      </a>
      <div class="tw-w-full tw-bg-white tw-rounded-lg tw-shadow dark:tw-border md:tw-mt-0 sm:tw-max-w-md xl:tw-p-0 dark:tw-bg-gray-800 dark:tw-border-gray-700">
        <div class="tw-p-6 tw-space-y-4 md:tw-space-y-6 sm:tw-p-8">
          <h1 class="tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white">
            Account verification
          </h1>
          <form v-on:submit.prevent="submit" class="tw-space-y-4 md:tw-space-y-6" action="#">
            <div>
              <label for="email" class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Code</label>
              <input v-model="this.code" type="text" name="number" id="number" class="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500" placeholder="code" required="">
            </div>
            <button type="submit" class="tw-w-full tw-text-white tw-bg-violet-800 hover:tw-bg-violet-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-violet-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-violet-600 dark:hover:tw-bg-violet-700 dark:focus:tw-ring-violet-800">Confirm</button>
          </form>
        </div>
      </div>
    </div>
    <ErrorModal ref="err"/>
    <SuccessModal ref="success" @ok="closing"/>
  </div>
</template>

<style scoped>

</style>
