<script setup>
import { useApplicationStore } from '@/stores/application.js';
const { userData } = useApplicationStore();
console.log(userData)
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <h1 class="fs-3">Home</h1>
                    </div>
                    <div>
                        <p>
                            Logged in as: <strong>{{ userData.username }}</strong>
                        </p>
                        <ul>
                            <li v-if="userData.roles.includes('ROLE_EMPLOYEE_TAX_OFFICE')">
                                <RouterLink :to="{ name: 'handleBusinessRequests' }">Handle Business Request</RouterLink>
                            </li>
                            <li v-if="userData.roles.includes('ROLE_ADMIN')">
                                <RouterLink :to="{ name: 'users' }">Manage Users</RouterLink>
                            </li>
                            <li v-if="userData.roles.includes('ROLE_ADMIN')">
                                <RouterLink :to="{ name: 'roles' }">Manage Roles</RouterLink>
                            </li>
                            <li v-if="userData.roles.includes('ROLE_BUSINESS_REPRESENTATIVE')">
                                <RouterLink :to="{ name: 'getBusinessRequests' }">Get My Business Requests</RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
