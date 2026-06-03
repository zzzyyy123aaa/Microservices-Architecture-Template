<template>
  <el-card>
    <template #header>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span>产品管理</span>
        <el-button type="primary" @click="dialogVisible = true">添加产品</el-button>
      </div>
    </template>
    <el-table :data="products" v-loading="loading">
      <el-table-column prop="id" label="ID" width="280"/>
      <el-table-column prop="name" label="产品名称"/>
      <el-table-column prop="category" label="分类" width="120"/>
      <el-table-column prop="price" label="价格" width="120"><template #default="{row}">¥{{row.price}}</template></el-table-column>
      <el-table-column prop="stock" label="库存" width="100"><template #default="{row}"><el-tag :type="row.stock>0?'success':'danger'">{{row.stock}}</el-tag></template></el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{row}">
          <el-button type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogVisible" title="添加产品" width="500px">
    <el-form :model="form" label-width="80px">
      <el-form-item label="名称"><el-input v-model="form.name" placeholder="请输入产品名称"/></el-form-item>
      <el-form-item label="分类"><el-input v-model="form.category" placeholder="请输入分类"/></el-form-item>
      <el-form-item label="价格"><el-input-number v-model="form.price" :min="0" :precision="2"/></el-form-item>
      <el-form-item label="库存"><el-input-number v-model="form.stock" :min="0"/></el-form-item>
      <el-form-item label="描述"><el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入产品描述"/></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleAdd" :loading="submitting">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { productApi } from '@/api/product'

const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const products = ref<any[]>([])
const form = reactive({ name: '', category: '', price: 0, stock: 0, description: '' })

const fetch = async () => {
  loading.value = true
  try {
    const res: any = await productApi.getProducts()
    products.value = res.data
  } finally {
    loading.value = false
  }
}

const handleAdd = async () => {
  if (!form.name) return ElMessage.warning('请输入产品名称')
  submitting.value = true
  try {
    await productApi.createProduct(form)
    ElMessage.success('添加成功')
    dialogVisible.value = false
    Object.assign(form, { name: '', category: '', price: 0, stock: 0, description: '' })
    fetch()
  } catch (e: any) {
    ElMessage.error(e.response?.data?.message || '添加失败')
  } finally {
    submitting.value = false
  }
}

const handleDelete = async (id: string) => {
  await ElMessageBox.confirm('确定删除该产品？', '提示', { type: 'warning' })
  await productApi.deleteProduct(id)
  ElMessage.success('删除成功')
  fetch()
}

onMounted(fetch)
</script>
