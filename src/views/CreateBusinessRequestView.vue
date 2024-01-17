<script setup>
import { ref } from "vue";
import { useRemoteData } from "@/composables/useRemoteData.js";
import { useRouter } from 'vue-router';

const router = useRouter();
const formDataRef = ref({
  "members": "",
  "purpose": "",
  "missionStatement": "",
  "location": ""
});

const urlRef = ref("http://localhost:9090/api/businessRequests/");
const authRef = ref(true);
const methodRef = ref("POST");

const { data, performRequest } = useRemoteData(urlRef, authRef, methodRef, formDataRef);

const onSubmit = () => {
    formDataRef.value.stateOfRequest = "submitted"
    performRequest();
    router.push({ name: 'home' });
};
const onTemporarilySaved = () => {
    formDataRef.value.stateOfRequest = "temporarily saved"
    performRequest();
    router.push({ name: 'home' });
};
</script>

<template>
  <div class="container mb-4">
    <RouterLink class="small" :to="{ name: 'getBusinessRequests' }"
        >Back to My Business Requests</RouterLink
    >
    <h1>New Business Request</h1>
  </div>
  <div>
    <pre>{{ data }}</pre>
  </div>
  <div class="container mb-4">
    <div class="mb-2">
      <label for="members">Members: </label>
      <input class="form-control" id="members" v-model="formDataRef.members" type="text" />
    </div>
    <div class="mb-2">
      <label for="purpose">Purpose: </label>
      <input class="form-control" id="purpose" v-model="formDataRef.purpose" type="text" />
    </div>
    <div class="mb-2">
      <label for="missionStatement">Mission Statement: </label>
      <input class="form-control" id="missionStatement" v-model="formDataRef.missionStatement" type="text" />
    </div>
    <div class="mb-2">
      <label for="location">Location: </label>
      <input class="form-control" id="location" v-model="formDataRef.location" type="text" />
    </div>
    <div style="margin-top: 3%;" class="">
        <button class="btn btn-primary" @click="onSubmit" type="button">Submit Business Request</button>
        <button style="margin-left: 3%;" class="btn btn-primary" @click="onTemporarilySaved" type="button">Temporary Save Business Request</button>
    </div>
  </div>
</template>