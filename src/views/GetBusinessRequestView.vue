<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const route = useRoute();
const { userData, loadUserData, employeeTaxOfficeBoolRef } = useApplicationStore();
const businessRequestIdRef = ref(null);
loadUserData();
const selectedViewName = computed(() => {
    if (userData.roles.includes('ROLE_EMPLOYEE_TAX_OFFICE')) {
        if (employeeTaxOfficeBoolRef === true) {
            return 'seeAllBusinessRequests';
        } else if (employeeTaxOfficeBoolRef === false) {
            return 'handleBusinessRequests';
        }
        return '';
    } else if (userData.roles.includes('ROLE_BUSINESS_REPRESENTATIVE')) {
        return 'getBusinessRequests';
    } else {
        return '';
    }
});
const selectedText = computed(() => {
    if (userData.roles.includes('ROLE_EMPLOYEE_TAX_OFFICE')) {
        if (employeeTaxOfficeBoolRef === true) {
            return 'Back to Accepted/Rejected Requests';
        } else if (employeeTaxOfficeBoolRef === false) {
            return 'Back to Submitted Business Requests';
        }
        return '';
    } else if (userData.roles.includes('ROLE_BUSINESS_REPRESENTATIVE')) {
        return 'Back to My Business Requests';
    } else {
        return '';
    }
})

onMounted(() => {
    businessRequestIdRef.value = route.params.id;
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row py-4 px-3">
                <div class="col-12">
                    <div class="mb-4">
                        <RouterLink class="small" :to="{ name: selectedViewName }"
                            >{{ selectedText }}</RouterLink
                        >
                        <h1 class="fs-3">Business Request #{{ businessRequestIdRef }}</h1>
                    </div>
                    <div class="mb-4">
                        <ul class="nav border">
                            <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'business-request-details', params: { id: businessRequestIdRef } }"
                                    >Details</RouterLink
                                >
                            </li>
                            <!-- <li class="nav-item">
                                <RouterLink
                                    class="nav-link"
                                    :to="{ name: 'student-courses', params: { id: studentIdRef } }"
                                    >Courses</RouterLink
                                >
                            </li> -->
                        </ul>
                    </div>
                    <div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>