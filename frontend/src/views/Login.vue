<template>
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea,#764ba2)">
    <el-card style="width:400px"><template #header><h2 style="text-align:center;margin:0">系统登录</h2></template>
      <el-form :model="form" size="large">
        <el-form-item><el-input v-model="form.username" placeholder="用户名" prefix-icon="User"/></el-form-item>
        <el-form-item><el-input v-model="form.password" type="password" placeholder="密码" prefix-icon="Lock" show-password/></el-form-item>
        <el-form-item><el-button type="primary" style="width:100%" @click="handleLogin">登录</el-button></el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { userApi } from '@/api/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const form = reactive({ username: '', password: '' })
const handleLogin = async () => {
  try { const res: any = await userApi.login(form); localStorage.setItem('token', res.data.token); ElMessage.success('登录成功'); router.push('/dashboard') }
  catch {}
}
</script>
