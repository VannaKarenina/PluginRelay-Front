<template>
    <v-card
        class="mx-auto"
        max-width="184"
    >
        <v-img
            src="http://localhost:9090/api/v1/buckets/projects.fav/objects/download?preview=true&prefix=TWluZWNyYWZ0LTI4NXgzODAuanBn&version_id=null"
            width="184px"
            contain
        ></v-img>

        <v-card-title>
            {{ project.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ project.description }}
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
