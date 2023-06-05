<template>
  <v-card
      class="mx-auto"
      max-width="184"
  >
    <v-img
        :src='this.image'
        width="184px"
        contain
    ></v-img>

    <v-card-title>
      {{ project.name }}
    </v-card-title>

    <v-card-subtitle style="margin-bottom: 3vh">
      Modifications: {{ project.projects.length }}
    </v-card-subtitle>
    <ErrorModal ref="error"/>
    <button @click="deleteGame(project.id)" type="button" class="tw-ml-5 focus:tw-outline-none tw-text-white tw-bg-purple-700 hover:tw-bg-purple-800 focus:tw-ring-4 focus:tw-ring-purple-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-mb-2">
      <div class="tw-text-white">
        Delete
      </div>
    </button>

    <Modal v-if="gameDeletion" @close="toggleGameDeletion">
      <DeleteGameModal @deleted="this.delete" @cancel="toggleGameDeletion"/>
    </Modal>
  </v-card>
</template>

<script>
import ErrorModal from "~/components/InfoModals/ErrorModal.vue";
import {useAuthStore} from "~/stores/auth";
import DeleteProjectModal from "~/components/dashboard/CRUD/DeleteProjectModal.vue";
import Modal from "~/components/base/Modal.vue";
import DeleteGameModal from "~/components/dashboard/CRUD/DeleteGameModal.vue";

export default {
  components: {DeleteGameModal, Modal, DeleteProjectModal, ErrorModal},
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {
    const store = useAuthStore();
    const config = useRuntimeConfig();
    return {
      store,
      config
    }
  },
  data() {
    return {
      image: `${this.config.public.baseUrl}/v1/storage/getCategoryAvatar?key=`,
      deleteid: 0,
      gameDeletion: false
    }
  },
  mounted() {
    if (this.project.image != null) {
      this.image += this.project.image
    } else {
      this.image += 'default.png'
    }
  },
  methods: {
    toggleGameDeletion() {
      this.gameDeletion = !this.gameDeletion
    },
    deleteGame(id) {
      this.deleteid = id;
      this.toggleGameDeletion();
    },
    async delete() {
      console.log(this.deleteid)
      const deletion = await $fetch(`${this.config.public.baseUrl}/v1/category/delete/${this.deleteid}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.store.token}`
        }
      })

      if (deletion.code === 801) {
        this.$emit('rmgame');
      }
    }
  }
}
</script>

<style>
.card-size {
  width: 184px;
  height: 287px;
}
.card-image {
  width: 184px;
  height: 260px;
}
</style>
