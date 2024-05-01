<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

//const router = useRouter();
const route = useRoute();

const businessRequestIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar + '/api/businessRequests/getUser/' + businessRequestIdRef.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    businessRequestIdRef.value = route.params.id;
    performRequest();
});
</script>

<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>Field Name</th>
                    <th>Field Value</th>
                </tr>
            </thead>
            <tbody v-if="loading">
                <tr>
                    <td colspan="2">Loading...</td>
                </tr>
            </tbody>
            <tbody v-if="data">
                <tr>
                    <th>Username</th>
                    <td>{{ data.username }}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{{ data.email }}</td>
                </tr>
                <tr>
                    <th>Roles</th>
                    <td>{{ data.roles.map(role => role.name).join(", ") }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>