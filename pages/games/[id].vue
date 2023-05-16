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
          modal: false
        }
    },
    methods: {

    }
})
</script>

<template>
  <div class="tw-h-screen">
      <button @click="openModal">Open Modal</button>
      <Modal v-if="showModal" @close="closeModal">
          kek2222222
      </Modal>
  </div>
</template>

<style scoped>

</style>
