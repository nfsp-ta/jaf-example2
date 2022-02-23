import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CustomerView from '../views/CustomerView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/customers',
    alias: '/',
    name: 'customerView',
    component: CustomerView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
