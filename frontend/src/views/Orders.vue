<template>
  <el-card>
    <template #header>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span>订单管理</span>
        <el-button type="primary" @click="dialogVisible = true">创建订单</el-button>
      </div>
    </template>
    <el-table :data="orders" v-loading="loading">
      <el-table-column prop="id" label="订单号" width="280"/>
      <el-table-column prop="userId" label="用户ID" width="280"/>
      <el-table-column prop="totalAmount" label="金额" width="120"><template #default="{row}">¥{{row.totalAmount}}</template></el-table-column>
      <el-table-column prop="status" label="状态" width="100"><template #default="{row}"><el-tag :type="getStatusType(row.status)">{{getStatusLabel(row.status)}}</el-tag></template></el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{row}">
          <el-button v-if="row.status==='PENDING'" type="warning" size="small" @click="handleCancel(row.id)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogVisible" title="创建订单" width="500px">
    <el-form :model="form" label-width="80px">
      <el-form-item label="用户ID"><el-input v-model="form.userId" placeholder="请输入用户ID"/></el-form-item>
      <el-form-item label="产品ID"><el-input v-model="form.productId" placeholder="请输入产品ID"/></el-form-item>
      <el-form-item label="数量"><el-input-number v-model="form.quantity" :min="1"/></el-form-item>
      <el-form-item label="单价"><el-input-number v-model="form.price" :min="0" :precision="2"/></el-form-item>
      <el-form-item label="地址"><el-input v-model="form.shippingAddress" placeholder="请输入收货地址"/></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleCreate" :loading="submitting">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { orderApi } from '@/api/order'

const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const orders = ref<any[]>([])
const form = reactive({ userId: '', productId: '', quantity: 1, price: 0, shippingAddress: '' })

const getStatusType = (s: string) => ({ PENDING: 'warning', PAID: 'primary', SHIPPED: 'info', DELIVERED: 'success', CANCELLED: 'danger' }[s] || 'info')
const getStatusLabel = (s: string) => ({ PENDING: '待支付', PAID: '已支付', SHIPPED: '已发货', DELIVERED: '已送达', CANCELLED: '已取消' }[s] || s)

const fetch = async () => {
  loading.value = true
  try { const res: any = await orderApi.getOrders(); orders.value = res.data } finally { loading.value = false }
}

const handleCreate = async () => {
  if (!form.userId || !form.productId) return ElMessage.warning('请填写必要信息')
  submitting.value = true
  try {
    await orderApi.createOrder({
      userId: form.userId,
      items: [{ productId: form.productId, productName: form.productId, quantity: form.quantity, price: form.price }],
      shippingAddress: { address: form.shippingAddress },
    })
    ElMessage.success('创建成功')
    dialogVisible.value = false
    fetch()
  } catch (e: any) {
    ElMessage.error(e.response?.data?.message || '创建失败')
  } finally { submitting.value = false }
}

const handleCancel = async (id: string) => {
  await ElMessageBox.confirm('确定取消该订单？', '提示', { type: 'warning' })
  await orderApi.cancelOrder(id)
  ElMessage.success('已取消')
  fetch()
}

onMounted(fetch)
</script>
