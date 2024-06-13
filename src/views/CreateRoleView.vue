<script setup>
import { ref } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";
import { useRouter } from 'vue-router';
// const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const formDataRef = ref({
  "name": ""
});

const urlRef = ref("/api/roles/");
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
    performRequest();
    router.push({ name: 'home' });
};
</script>

<template>
  <div class="container mb-4">
    <RouterLink class="small" :to="{ name: 'roles' }"
        >Back to Roles</RouterLink
    >
    <h1>New Role</h1>
  </div>
  <div>
    <pre>{{ data }}</pre>
  </div>
  <div class="container mb-4">
    <div class="mb-2">
      <label for="name">Name: </label>
      <input class="form-control" id="name" v-model="formDataRef.name" type="text" />
    </div>
    <div style="margin-top: 3%;" class="">
        <button class="btn btn-primary" @click="onSubmit" type="button">Create new Role</button>
    </div>
  </div>
</template>