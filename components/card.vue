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
  </v-card>
</template>

<script>
export default {
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
