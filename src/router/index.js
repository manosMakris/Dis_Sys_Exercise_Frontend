import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import { useApplicationStore } from '@/stores/application.js';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            // component: HomeView,
            component: () => import('../views/HomeView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/students',
            name: 'students',
            component: () => import('../views/StudentsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/students/new',
            name: 'student-new',
            component: () => import('../views/CreateStudentView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/students/:id',
            name: 'student',
            component: () => import('../views/StudentView.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'student-details',
                    component: () => import('../views/StudentDetailsView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'courses',
                    name: 'student-courses',
                    component: () => import('../views/StudentCoursesView.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/course/:id',
            name: 'course',
            component: () => import('../views/CourseView.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'course-details',
                    component: () => import("../views/CourseDetailsView.vue"),
                    meta: { requiresAuth: true },
                },
                {
                    path: 'students',
                    name: 'course-students',
                    component: () => import("../views/CourseStudentsView.vue"),
                    meta: { requiresAuth: true },
                }
            ]
        },
        {
            path: '/users/new',
            name: 'user-new',
            component: () => import('../views/CreateUserView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('../views/UsersView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/users/:id',
            name: 'user',
            component: () => import('../views/UserView.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'user-details',
                    component: () => import("../views/UserDetailsView.vue"),
                    meta: { requiresAuth: true },
                },
                {
                    path: 'update',
                    name: 'update-user',
                    component: () => import("../views/UpdateUserView.vue"),
                    meta: {requiresAuth: true}
                }
            ]
        },
        {
            path: '/roles',
            name: 'roles',
            component: () => import('../views/RolesView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/handleBusinessRequests',
            name: 'handleBusinessRequests',
            component: () => import('../views/HandleBusinessRequests.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/businessRequest/new',
            name: 'businessRequest-new',
            component: () => import('../views/CreateBusinessRequestView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/getBusinessRequests',
            name: 'getBusinessRequests',
            component: () => import('../views/GetBusinessRequestsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/getBusinessRequests/:id',
            name: 'getBusinessRequest',
            component: () => import('../views/GetBusinessRequestView.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'business-request-details',
                    component: () => import("../views/GetBusinessRequestDetailsView.vue"),
                    meta: { requiresAuth: true },
                },
                {
                    path: 'update',
                    name: 'update-business-request',
                    component: () => import("../views/UpdateBusinessRequestView.vue"),
                    meta: {requiresAuth: true}
                },
                {
                    path: 'handleBusinessRequest',
                    name: 'handle-business-request',
                    component: () => import("../views/HandleBusinessRequestView.vue"),
                    meta: {requiresAuth: true}
                }
            ]
        },
        {
            path: '/courses',
            name: 'courses',
            component: () => import('../views/CoursesView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/LogoutView.vue'),
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useApplicationStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !isAuthenticated) {
        console.log('user not authenticated. redirecting to /login');
        next('/login');
    } else {
        next();
    }
});


export default router;
