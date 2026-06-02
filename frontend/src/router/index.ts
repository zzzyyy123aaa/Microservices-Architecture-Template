import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainLayout, redirect: '/dashboard', children: [
      { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/Dashboard.vue'), meta: { title: '仪表盘' } },
      { path: 'users', name: 'Users', component: () => import('@/views/Users.vue'), meta: { title: '用户管理' } },
      { path: 'products', name: 'Products', component: () => import('@/views/Products.vue'), meta: { title: '产品管理' } },
      { path: 'orders', name: 'Orders', component: () => import('@/views/Orders.vue'), meta: { title: '订单管理' } },
    ]},
    { path: '/login', name: 'Login', component: () => import('@/views/Login.vue') },
  ],
})
