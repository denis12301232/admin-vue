import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: () => import('@/views/TestView.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/LayoutAuthenticated.vue'),
    children: [
      {
        meta: {
          title: 'Home',
        },
        path: '/',
        name: 'home',
        component: () => import('@/views/DashboardView.vue'),
      },
    ],
  },
  {
    meta: {
      title: 'Login',
    },
    path: '/login',
    component: () => import('@/layouts/LayoutGuest.vue'),
    children: [
      {
        meta: {
          title: 'Login',
        },
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
      },
    ],
  },
  {
    path: '/registration',
    component: () => import('@/layouts/LayoutGuest.vue'),
    children: [
      {
        meta: {
          title: 'Registration',
        },
        path: '/registration',
        name: 'registration',
        component: () => import('@/views/RegistrationView.vue'),
      },
    ],
  },
  {
    path: '/forgot/password',
    component: () => import('@/layouts/LayoutGuest.vue'),
    children: [
      {
        meta: {
          title: 'Forgot password',
        },
        path: '/forgot/password',
        name: 'forgot-password',
        component: () => import('@/views/ForgotPasswordView.vue'),
      },
    ],
  },
  {
    meta: {
      title: 'Error',
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue'),
  },
  {
    component: () => import('@/layouts/LayoutAuthenticated.vue'),
    path: '/api-tokens',
    children: [
      {
        meta: {
          title: 'Api Tokens',
        },
        path: '/api-tokens',
        name: 'api-tokens',
        component: () => import('@/views/ApiTokensView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
