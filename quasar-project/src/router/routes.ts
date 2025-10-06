import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from 'src/stores/user';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainWindowLayout.vue'),
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (!userStore.user) {
        next({ path: '/auth' });
      } else {
        next();
      }
    },
    children: [{ path: '', component: () => import('pages/MainPage.vue') }],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    redirect: '/auth/login',
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.user) {
        next({ path: '/' });
      } else {
        next();
      }
    },
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'signup', component: () => import('pages/SignupPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
