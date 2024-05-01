<script setup>
import { onMounted, ref } from 'vue';
import { useRemoteData } from '@/composables/useRemoteData.js';
import { useApplicationStore } from '@/stores/application.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const { setEmployeeTaxOfficeBool } = useApplicationStore();
const urlRef = ref(backendEnvVar + `/api/businessRequests/`);
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    setEmployeeTaxOfficeBool(true)
    performRequest();
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Accepted/Rejected Business Requests</h1>
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
                                    <th>Creator</th>
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
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}" v-if="businessRequest.stateOfRequest === 'accepted' || businessRequest.stateOfRequest === 'rejected'">{{ businessRequest.id }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}" v-if="businessRequest.stateOfRequest === 'accepted' || businessRequest.stateOfRequest === 'rejected'">{{ businessRequest.members }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}" v-if="businessRequest.stateOfRequest === 'accepted' || businessRequest.stateOfRequest === 'rejected'">{{ businessRequest.purpose }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}" v-if="businessRequest.stateOfRequest === 'accepted' || businessRequest.stateOfRequest === 'rejected'">{{ businessRequest.missionStatement }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}" v-if="businessRequest.stateOfRequest === 'accepted' || businessRequest.stateOfRequest === 'rejected'">{{ businessRequest.location }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}" v-if="businessRequest.stateOfRequest === 'accepted' || businessRequest.stateOfRequest === 'rejected'">{{ businessRequest.afm }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}" v-if="businessRequest.stateOfRequest === 'accepted' || businessRequest.stateOfRequest === 'rejected'">{{ businessRequest.stateOfRequest }}</td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}" v-if="businessRequest.stateOfRequest === 'accepted' || businessRequest.stateOfRequest === 'rejected'">
                                        <RouterLink class="btn btn-primary"
                                            :to="{
                                                name: 'get-user-business-request',
                                                params: { id: businessRequest.id }
                                            }"
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                            </svg>
                                            Display</RouterLink
                                        >
                                    </td>
                                    <td :class="{'accepted': businessRequest.stateOfRequest === 'accepted', 'rejected': businessRequest.stateOfRequest === 'rejected'}" v-if="businessRequest.stateOfRequest === 'accepted' || businessRequest.stateOfRequest === 'rejected'">
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