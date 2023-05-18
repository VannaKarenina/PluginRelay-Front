<script lang="ts">
import {defineComponent} from 'vue'
import Modal from "~/components/base/Modal.vue";

export default defineComponent({
    name: "[id]",
    components: {Modal},
    setup() {
      const route = useRoute();

      const showModal = ref(false);
      function openModal() {
          showModal.value = true;
      }
      function closeModal() {
          showModal.value = false;
      }

      return {
          route,
          showModal,
          openModal,
          closeModal,
      };
    },
    data() {
        return {
          projectId: this.route.params.id,
          modal: false,
          category: null
        }
    },
    async mounted() {
      this.category = await $fetch(`http://127.0.0.1:3890/v1/category/${this.projectId}`);
    },
    methods: {

    }
})
</script>

<template>
  <div class="tw-h-screen">

  </div>
</template>

<style scoped>

</style>
