<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="s in stats" :key="s.label">
        <el-card shadow="hover"><template #header><div style="display:flex;align-items:center;gap:8px"><el-icon><component :is="s.icon"/></el-icon><span>{{ s.label }}</span></div></template>
          <div style="font-size:32px;font-weight:600;text-align:center">{{ s.value }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <el-card><template #header><span>服务状态</span></template>
          <div v-for="s in services" :key="s.name" style="display:flex;justify-content:space-between;padding:8px 12px;margin-bottom:8px;background:#f5f7fa;border-radius:4px">
            <span>{{ s.name }}</span><el-tag type="success" size="small">正常</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
const stats = [{ label: '用户总数', value: '1,250', icon: 'User' }, { label: '产品总数', value: '3,842', icon: 'ShoppingCart' }, { label: '订单总数', value: '8,956', icon: 'List' }, { label: '总收入', value: '¥1,258,960', icon: 'Money' }]
const services = [{ name: 'API Gateway' }, { name: 'User Service' }, { name: 'Order Service' }, { name: 'Product Service' }]
</script>
