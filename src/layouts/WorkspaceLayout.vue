<template>
  <div class="workspace-layout">
    <header class="workspace-header">
      <div class="left-action">
        <button class="back-btn" @click="goBack">← 返回工作台</button>
      </div>
      <div class="step-indicator">
        <span>故事输入</span> ➜ <span class="dim">角色/场景设定</span> ➜ <span class="dim">分镜规划</span> ➜ <span class="dim">结果生成</span>
      </div>
    </header>

    <main class="workspace-content">
      <router-view></router-view>
    </main>
  </div>

  <div class="step-indicator">
    <span :class="{ active: $route.path.includes('create') }">故事输入</span> ➜ 
    <span :class="{ active: $route.path.includes('structure') }">结构解析</span> ➜ 
    <span :class="{ active: $route.path.includes('characters') || $route.path.includes('scenes') }">设定</span> ➜ 
    <span :class="{ active: $route.path.includes('storyboard') }">分镜规划</span>
  </div>
  
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goBack = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.workspace-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F8F9FA;
}

.workspace-header {
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #E4E7ED;
  display: flex;
  align-items: center;
  padding: 0 24px;
  justify-content: space-between;
}

.back-btn {
  background: none; border: none; color: #666; font-size: 14px; cursor: pointer;
}
.back-btn:hover { color: #3698F5; }

.step-indicator {
  font-size: 14px; color: #333; font-weight: bold;
}
.step-indicator .dim {
  color: #999; font-weight: normal;
}

.workspace-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>