<script setup>
import { ref, onMounted } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";
import { useRouter } from 'vue-router';

const router = useRouter();
const urlRef2 = ref("http://localhost:9090/api/roles/");
const authRef2 = ref(true);
const formDataRef = ref({
  "username": "",
  "password": "",
  "email": ""
});
const selectedRoles = ref({});
const urlRef = ref("http://localhost:9090/api/auth/signup");
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);
const rolesRemoteData = useRemoteData(urlRef2, authRef2);

onMounted(() => {
    rolesRemoteData.performRequest();
});

const onSubmit = () => {
    formDataRef.value.roles = Object.keys(selectedRoles.value).filter(role => selectedRoles.value[role]);
    console.log(formDataRef.value)
    console.log(JSON.parse(localStorage.userData).accessToken);
    performRequest();
    router.push({ name: 'home' });
};
</script>

<template>
  <div class="container mb-4">
    <RouterLink class="small" :to="{ name: 'users' }"
        >Back to Users</RouterLink
    >
    <h1>New User</h1>
  </div>
  <div>
    <pre>{{ data }}</pre>
  </div>
  <div class="container mb-4" v-if="!rolesRemoteData.data.value">
    <p>Loading...</p>
  </div>
  <div class="container mb-4" v-if="rolesRemoteData.data.value">
    <div class="mb-2">
      <label for="username">Username: </label>
      <input class="form-control" id="username" v-model="formDataRef.username" type="text" />
    </div>
    <div class="mb-2">
      <label for="email">Email: </label>
      <input class="form-control" id="email" v-model="formDataRef.email" type="email" />
    </div>
    <div class="mb-2">
      <label for="password">Password</label>
      <input class="form-control" id="password" v-model="formDataRef.password" type="password" />
    </div>
    <p>Roles of that user: </p>
    <div class="mb-2" v-for="role in rolesRemoteData.data.value" :key="role.id">
        <label :for="role.name">{{ role.name }}</label>
        <input style="margin-left: 1%;" :id="role.name" type="checkbox" v-model="selectedRoles[role.name]">
    </div>
    <div class="">
      <button class="btn btn-primary" @click="onSubmit" type="button">Create new user</button>
    </div>
  </div>
</template>