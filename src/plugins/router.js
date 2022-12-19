import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '番茄鐘',
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: {
      title: '設定',
    },
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/ListView.vue'),
    meta: {
      title: '待辦事項',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  document.title = to.meta.title;
});

export default router;
