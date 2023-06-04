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
    <button type="button" class="focus:tw-outline-none tw-text-white tw-bg-purple-700 hover:tw-bg-purple-800 focus:tw-ring-4 focus:tw-ring-purple-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-mb-2 dark:tw-bg-purple-600 dark:hover:tw-bg-purple-700 dark:focus:tw-ring-purple-900">Delete</button>
  </v-card>
</template>

<script>
import ErrorModal from "~/components/InfoModals/ErrorModal.vue";

export default {
  components: {ErrorModal},
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      image: 'http://127.0.0.1:3890/v1/storage/getCategoryAvatar?key='
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
    deleteProjectModal() {

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
