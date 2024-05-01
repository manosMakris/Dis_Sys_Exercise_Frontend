<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
// import { useRouter } from 'vue-router';
const backendEnvVar = import.meta.env.VITE_BACKEND;

// const router = useRouter();
const urlRef = ref(backendEnvVar + '/api/auth/getUsersBusinessRequests');
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    performRequest();
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <ul>
                    <li style="color: blue;">
                        <RouterLink
                            class="nav-link"
                            :to="{ name: 'businessRequest-new'}"
                            >Create new Business Request</RouterLink
                        >
                    </li>
                </ul>
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">My Business Requests</h1>
                    </div>
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Members</th>
                                    <th>Purpose</th>
                                    <th>Mission statement</th>
                                    <th>Location</th>
                                    <th>Afm</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-if="loading">
                                <tr>
                                    <td colspan="5">Loading...</td>
                                </tr>
                            </tbody>
                            <tbody v-if="data">
                                <tr v-for="businessRequest in data" :key="businessRequest.id">
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}">{{ businessRequest.id }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}">{{ businessRequest.members }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}">{{ businessRequest.purpose }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}">{{ businessRequest.missionStatement }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}">{{ businessRequest.location }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}">{{ businessRequest.afm }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}">{{ businessRequest.stateOfRequest }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}">
                                        <RouterLink class="btn btn-primary"
                                            :to="{
                                                name: 'business-request-details',
                                                params: { id: businessRequest.id }
                                            }"
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                            </svg>
                                            Display</RouterLink
                                        >
                                        <RouterLink style="margin-left: 5%;" class="btn btn-primary update-button" v-if="businessRequest.stateOfRequest === 'temporarily saved'"
                                            :to="{
                                                name: 'update-business-request',
                                                params: { id: businessRequest.id }
                                            }"
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                            </svg>
                                            Update</RouterLink
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.accepted{
    background-color: rgb(58, 212, 58);
    color: white;
}
.rejected{
    background-color: rgb(220, 36, 12);
    color: black
}
</style>
