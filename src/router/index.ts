import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
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
    path: '/dashboard',
    component: () => import('@/layouts/LayoutAuthenticated.vue'),
    children: [
      {
        meta: {
          title: 'Dashboard',
        },
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
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
  // {
  //   meta: {
  //     title: 'Select style',
  //   },
  //   path: '/',
  //   name: 'style',
  //   component: Style,
  // },
  // {
  //   // Document title tag
  //   // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
  //   meta: {
  //     title: 'Dashboard',
  //   },
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   component: Home,
  // },
  // {
  //   meta: {
  //     title: 'Tables',
  //   },
  //   path: '/tables',
  //   name: 'tables',
  //   component: () => import('@/views/TablesView.vue'),
  // },
  // {
  //   meta: {
  //     title: 'Forms',
  //   },
  //   path: '/forms',
  //   name: 'forms',
  //   component: () => import('@/views/FormsView.vue'),
  // },
  // {
  //   meta: {
  //     title: 'Profile',
  //   },
  //   path: '/profile',
  //   name: 'profile',
  //   component: () => import('@/views/ProfileView.vue'),
  // },
  // {
  //   meta: {
  //     title: 'Ui',
  //   },
  //   path: '/ui',
  //   name: 'ui',
  //   component: () => import('@/views/UiView.vue'),
  // },
  // {
  //   meta: {
  //     title: 'Responsive layout',
  //   },
  //   path: '/responsive',
  //   name: 'responsive',
  //   component: () => import('@/views/ResponsiveView.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
