<template>
  <el-card><template #header><div style="display:flex;justify-content:space-between"><span>产品管理</span><el-button type="primary">添加产品</el-button></div></template>
    <el-table :data="products" v-loading="loading">
      <el-table-column prop="id" label="ID" width="280"/>
      <el-table-column prop="name" label="产品名称"/>
      <el-table-column prop="category" label="分类" width="120"/>
      <el-table-column prop="price" label="价格" width="120"><template #default="{row}">¥{{row.price}}</template></el-table-column>
      <el-table-column prop="stock" label="库存" width="100"><template #default="{row}"><el-tag :type="row.stock>0?'success':'danger'">{{row.stock}}</el-tag></template></el-table-column>
    </el-table>
  </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productApi } from '@/api/product'
const loading = ref(false)
const products = ref<any[]>([])
const fetch = async () => { loading.value = true; try { const res: any = await productApi.getProducts(); products.value = res.data } finally { loading.value = false } }
onMounted(fetch)
</script>
