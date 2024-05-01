<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRemoteData } from '@/composables/useRemoteData.js';
const backendEnvVar = import.meta.env.VITE_BACKEND;

const router = useRouter();
const route = useRoute();

const businessRequestIdRef = ref(null);
const urlRef = computed(() => {
    return backendEnvVar + '/api/businessRequests/getById/' + businessRequestIdRef.value;
});
const authRef = ref(true);
const { data, loading, performRequest } = useRemoteData(urlRef, authRef);

onMounted(() => {
    businessRequestIdRef.value = route.params.id;
    performRequest();
});

function onAccept() {
    const urlRef2 = ref(backendEnvVar + `/api/businessRequests/acceptBusinessRequest/${data.value.id}`);
    const authRef2 = ref(true);
    const acceptBusinessRequestRemoteData = useRemoteData(urlRef2, authRef2);
    acceptBusinessRequestRemoteData.performRequest();
    while (!acceptBusinessRequestRemoteData.data) {
        //
    }
    router.push({ name: 'home' });
}
function onReject() {
    const urlRef3 = ref(backendEnvVar + `/api/businessRequests/rejectBusinessRequest/${data.value.id}`);
    const authRef3 = ref(true);
    const rejectBusinessRequestRemoteData = useRemoteData(urlRef3, authRef3);
    rejectBusinessRequestRemoteData.performRequest();
    while (!rejectBusinessRequestRemoteData.data) {
        //
    }
    router.push( {name: "home"} );
}

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
                    <th>Members</th>
                    <td>{{ data.members }}</td>
                </tr>
                <tr>
                    <th>Purpose</th>
                    <td>{{ data.purpose }}</td>
                </tr>
                <tr>
                    <th>Mission Statement</th>
                    <td>{{ data.missionStatement }}</td>
                </tr>
                <tr>
                    <th>Location</th>
                    <td>{{ data.location }}</td>
                </tr>
                <tr>
                    <th>Afm</th>
                    <td>{{ data.afm ? data.afm: '-'}}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{{ data.stateOfRequest }}</td>
                </tr>
            </tbody>
        </table>
        <button @click="onAccept" class="btn btn-success" style="margin-right: 3%;">Accept Business Request</button>
        <button @click="onReject" class="btn btn-danger" >Reject Business Request</button>
    </div>
</template>