<script setup>
import { ref, onMounted } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
// const backendEnvVar = import.meta.env.VITE_BACKEND;

const roleIdRef = ref(null);
const router = useRouter();
const route = useRoute();
const formDataRef = ref({});

const urlRef = ref(null);
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
    performRequest();
    router.push({ name: 'home' });
};

onMounted(() => {
    roleIdRef.value = route.params.id;
    urlRef.value = "/api/roles/updateRole/"+roleIdRef.value;
});
</script>

<template>
  <div class="container mb-4">
    <h1>Update Role</h1>
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
        <button class="btn btn-primary" @click="onSubmit" type="button">Update Role</button>
    </div>
  </div>
</template>