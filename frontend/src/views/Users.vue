<template>
  <el-card><template #header><div style="display:flex;justify-content:space-between"><span>用户管理</span><el-button type="primary" @click="showDialog">添加用户</el-button></div></template>
    <el-table :data="users" v-loading="loading">
      <el-table-column prop="id" label="ID" width="280"/>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="roles" label="角色"><template #default="{row}"><el-tag v-for="r in row.roles" :key="r" size="small" style="margin-right:4px">{{r}}</el-tag></template></el-table-column>
      <el-table-column label="操作" width="200"><template #default="{row}"><el-button type="primary" link @click="editUser(row)">编辑</el-button><el-button type="danger" link @click="deleteUser(row.id)">删除</el-button></template></el-table-column>
    </el-table>
  </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userApi } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
const loading = ref(false)
const users = ref<any[]>([])
const fetchUsers = async () => { loading.value = true; try { const res: any = await userApi.getUsers(); users.value = res.data } finally { loading.value = false } }
const showDialog = () => {}
const editUser = (u: any) => {}
const deleteUser = async (id: string) => { await ElMessageBox.confirm('确定删除？'); await userApi.deleteUser(id); ElMessage.success('已删除'); fetchUsers() }
onMounted(fetchUsers)
</script>
