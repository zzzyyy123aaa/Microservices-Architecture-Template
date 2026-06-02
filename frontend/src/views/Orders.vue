<template>
  <el-card><template #header><span>订单管理</span></template>
    <el-table :data="orders" v-loading="loading">
      <el-table-column prop="id" label="订单号" width="280"/>
      <el-table-column prop="userId" label="用户ID" width="280"/>
      <el-table-column prop="totalAmount" label="金额" width="120"><template #default="{row}">¥{{row.totalAmount}}</template></el-table-column>
      <el-table-column prop="status" label="状态" width="100"><template #default="{row}"><el-tag :type="getStatusType(row.status)">{{getStatusLabel(row.status)}}</el-tag></template></el-table-column>
    </el-table>
  </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { orderApi } from '@/api/order'
const loading = ref(false)
const orders = ref<any[]>([])
const getStatusType = (s: string) => ({ PENDING: 'warning', PAID: 'primary', SHIPPED: 'info', DELIVERED: 'success', CANCELLED: 'danger' }[s] || 'info')
const getStatusLabel = (s: string) => ({ PENDING: '待支付', PAID: '已支付', SHIPPED: '已发货', DELIVERED: '已送达', CANCELLED: '已取消' }[s] || s)
const fetch = async () => { loading.value = true; try { const res: any = await orderApi.getOrders(); orders.value = res.data } finally { loading.value = false } }
onMounted(fetch)
</script>
