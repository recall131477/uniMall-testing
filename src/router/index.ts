import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/optional',
    name: 'optional',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/popular',
    name: 'popular',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/gainer',
    name: 'gainer',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/loser',
    name: 'loser',
    component: () => import('@/views/HomeView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
