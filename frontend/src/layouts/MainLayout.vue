<template>
  <el-container style="height:100vh">
    <el-aside :width="isCollapse?'64px':'220px'" style="background:#304156">
      <div style="height:60px;display:flex;align-items:center;justify-content:center;background:#2b2f3a">
        <span v-show="!isCollapse" style="color:#fff;font-size:18px;font-weight:600">Microservices</span>
      </div>
      <el-menu :default-active="route.path" :collapse="isCollapse" router style="border-right:none;background:#304156">
        <el-menu-item v-for="m in menus" :key="m.path" :index="m.path">
          <el-icon><component :is="m.icon"/></el-icon><template #title>{{ m.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="background:#fff;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 4px rgba(0,21,41,.08)">
        <el-icon style="cursor:pointer;font-size:20px" @click="isCollapse=!isCollapse"><Fold/></el-icon>
        <el-dropdown>
          <span style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <el-avatar :size="32" icon="UserFilled"/><span>Admin</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleProfile">个人信息</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main style="background:#f0f2f5"><router-view/></el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const isCollapse = ref(false)
const handleProfile = () => {}
const handleLogout = () => { localStorage.removeItem('token'); router.push('/login') }
const menus = [
  { path: '/dashboard', title: '仪表盘', icon: 'Dashboard' },
  { path: '/users', title: '用户管理', icon: 'User' },
  { path: '/products', title: '产品管理', icon: 'ShoppingCart' },
  { path: '/orders', title: '订单管理', icon: 'List' },
]
</script>
