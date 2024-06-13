<script setup>
import { ref, onMounted } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
// const backendEnvVar = import.meta.env.VITE_BACKEND;

const userIdRef = ref(null);
const router = useRouter();
const route = useRoute();
const formDataRef = ref({});

const urlRef = ref(null);
const authRef = ref(true);
const methodRef = ref("POST");

const urlRef2 = ref("/api/roles/");
const authRef2 = ref(true);
const selectedRoles = ref({});
const rolesRemoteData = useRemoteData(urlRef2, authRef2);

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
    
    performRequest();

    const urlRef3 = ref(null);
    const methodRef3 = ref("POST");
    const authRef3 = ref(true);
    const methodBodyRef3 = ref({});
    const roleRemoteData = useRemoteData(urlRef3, authRef3, methodRef3, methodBodyRef3);
    const selectedRolesArray = Object.entries(selectedRoles.value);
    const rolesToUpdate = selectedRolesArray.filter(role => role[1] !== '');
    rolesToUpdate.forEach((role) => {
      if (role[1] === 'add') {
        urlRef3.value = `/api/auth/addRole/${userIdRef.value}`;
      }
      if (role[1] === 'remove') {
        urlRef3.value = `/api/auth/deleteRole/${userIdRef.value}`;
      } 
      methodBodyRef3.value.name = role[0];
      roleRemoteData.performRequest();
      while (!roleRemoteData.data) {
          //
      }
    })

    router.push({ name: 'home' });
};

onMounted(() => {
    userIdRef.value = route.params.id;
    urlRef.value = `/api/auth/updateUser/${userIdRef.value}`;
    rolesRemoteData.performRequest();
});
</script>

<template>
  <div class="container mb-4">
    <h1>Update User</h1>
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
    <p>Roles: </p>
    <div class="mb-2" v-for="role in rolesRemoteData.data.value" :key="role.id">
      <label :for="role.name+'Add'">Add {{ role.name }}: </label>
      <input
        :id="role.name+'Add'"
        type="radio"
        :value="'add'"
        v-model="selectedRoles[role.name]"
      />
      <br>
      <label :for="role.name+'Remove'">Remove {{ role.name }}: </label>
      <input
        style="margin-left: 1%;"
        :id="role.name+'Remove'"
        type="radio"
        :value="'remove'"
        v-model="selectedRoles[role.name]"
      />
      <br>
      <br>
    </div>
    <div class="">
      <button class="btn btn-primary" @click="onSubmit" type="button">Update user</button>
    </div>
  </div>
</template>