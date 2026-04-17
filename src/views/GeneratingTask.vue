<template>
  <div class="generating-page">
    <div class="loading-container">
      <div class="spinner-box">
        <div class="core-spinner"></div>
      </div>
      
      <h2>系统正在生成关键帧...</h2>
      <p class="status-text">当前进度：{{ progress }}% | 正在渲染 Shot 02...</p>

      <div class="progress-bar-bg">
        <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
      </div>

      <div class="log-box">
        <p v-for="(log, index) in logs" :key="index">> {{ log }}</p>
      </div>

      <button class="btn-cancel" @click="cancelGeneration">取消生成</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const progress = ref(0)
const logs = ref(['[System] 初始化渲染管线...', '[GPU 01] 分配显存成功...'])
let timer = null

onMounted(() => {
  // 模拟进度条增长
  timer = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.floor(Math.random() * 15) + 5; // 随机增加 5~20
      if (progress.value > 100) progress.value = 100;
      
      // 模拟增加日志
      if (progress.value > 30 && logs.value.length === 2) logs.value.push('[Shot 01] 潜空间特征提取完毕，开始去噪...');
      if (progress.value > 60 && logs.value.length === 3) logs.value.push('[Shot 02] 应用场景一致性约束...');
      if (progress.value > 90 && logs.value.length === 4) logs.value.push('[System] 正在合并最终结果...');
      
    } else {
      clearInterval(timer)
      // 进度到达 100% 后，延迟 0.5 秒自动跳转到结果页
      setTimeout(() => {
        const projectId = route.params.id || 'demo-001'
        router.push(`/project/${projectId}/results`)
      }, 500)
    }
  }, 600) // 每 0.6 秒更新一次
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const cancelGeneration = () => {
  clearInterval(timer)
  router.back()
}
</script>

<style scoped>
.generating-page { height: 100%; display: flex; justify-content: center; align-items: center; }
.loading-container { 
  background: white; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  width: 100%; max-width: 600px; display: flex; flex-direction: column; align-items: center; gap: 20px;
}

.spinner-box { width: 80px; height: 80px; position: relative; display: flex; justify-content: center; align-items: center; }
.core-spinner {
  width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #3698F5;
  border-radius: 50%; animation: spin 1s linear infinite;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.status-text { color: #666; margin: 0; font-size: 14px; }

.progress-bar-bg { width: 100%; height: 12px; background: #eee; border-radius: 10px; overflow: hidden; }
.progress-bar-fill { height: 100%; background: linear-gradient(to right, #3698F5, #6CC24A); transition: width 0.3s ease; }

.log-box {
  width: 100%; background: #282c34; border-radius: 6px; padding: 15px;
  min-height: 120px; display: flex; flex-direction: column; gap: 6px;
}
.log-box p { margin: 0; color: #98c379; font-family: monospace; font-size: 12px; }

.btn-cancel { background: none; border: 1px solid #ddd; padding: 8px 20px; border-radius: 6px; color: #666; cursor: pointer; margin-top: 10px; }
.btn-cancel:hover { background: #f9f9f9; color: #F07A6D; border-color: #F07A6D; }
</style>