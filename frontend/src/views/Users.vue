<template>
  <el-card>
    <template #header>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span>用户管理</span>
        <el-button type="primary" @click="openDialog()">添加用户</el-button>
      </div>
    </template>
    <el-table :data="users" v-loading="loading">
      <el-table-column prop="id" label="ID" width="280"/>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column prop="roles" label="角色">
        <template #default="{row}"><el-tag v-for="r in row.roles" :key="r" size="small" style="margin-right:4px">{{r}}</el-tag></template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{row}">
          <el-button type="primary" link @click="openDialog(row)">编辑</el-button>
          <el-button type="danger" link @click="deleteUser(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑用户' : '添加用户'" width="500px">
    <el-form :model="form" label-width="80px">
      <el-form-item label="用户名"><el-input v-model="form.username" :disabled="isEdit" placeholder="请输入用户名"/></el-form-item>
      <el-form-item label="邮箱"><el-input v-model="form.email" placeholder="请输入邮箱"/></el-form-item>
      <el-form-item v-if="!isEdit" label="密码"><el-input v-model="form.password" type="password" show-password placeholder="请输入密码"/></el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.roles" multiple placeholder="请选择角色">
          <el-option label="admin" value="admin"/>
          <el-option label="user" value="user"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="submitting">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { userApi } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const editId = ref('')
const users = ref<any[]>([])
const form = reactive({ username: '', email: '', password: '', roles: ['user'] })

const fetchUsers = async () => {
  loading.value = true
  try { const res: any = await userApi.getUsers(); users.value = res.data } finally { loading.value = false }
}

const openDialog = (row?: any) => {
  isEdit.value = !!row
  editId.value = row?.id || ''
  Object.assign(form, { username: row?.username || '', email: row?.email || '', password: '', roles: row?.roles || ['user'] })
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (!form.username || !form.email) return ElMessage.warning('请填写必要信息')
  submitting.value = true
  try {
    if (isEdit.value) {
      await userApi.updateUser(editId.value, { email: form.email, roles: form.roles })
    } else {
      await userApi.register(form)
    }
    ElMessage.success(isEdit.value ? '更新成功' : '添加成功')
    dialogVisible.value = false
    fetchUsers()
  } catch (e: any) {
    ElMessage.error(e.response?.data?.message || '操作失败')
  } finally { submitting.value = false }
}

const deleteUser = async (id: string) => {
  await ElMessageBox.confirm('确定删除该用户？', '提示', { type: 'warning' })
  await userApi.deleteUser(id)
  ElMessage.success('已删除')
  fetchUsers()
}

onMounted(fetchUsers)
</script>
