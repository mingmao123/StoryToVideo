<template>
  <div class="project-create">
    <div class="form-container">
      <h2>新建故事编译项目</h2>
      <p class="subtitle">输入您的故事文本，系统将自动解析角色、场景并规划分镜。</p>

      <div class="form-group">
        <label>项目名称</label>
        <input type="text" placeholder="例如：赛博朋克微小说预演" />
      </div>

      <div class="form-group">
        <label>目标视觉风格</label>
        <select>
          <option>日式动画 (Anime)</option>
          <option>写实电影 (Cinematic)</option>
          <option>水彩绘本 (Watercolor)</option>
          <option>赛博朋克 (Cyberpunk)</option>
        </select>
      </div>

      <div class="form-group">
        <label>故事文本 / 剧情梗概</label>
        <textarea rows="10" placeholder="请在此处输入您的长文本故事..."></textarea>
      </div>

      <div class="form-actions">
        <button class="btn-secondary">保存草稿</button>
        <button class="btn-primary" @click="startParsing" :disabled="isParsing">
            {{ isParsing ? '解析中...' : '开始解析网络结构' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const isParsing = ref(false)

const startParsing = () => {
  // 模拟请求后端的 Loading 过程
  isParsing.value = true
  
  setTimeout(() => {
    isParsing.value = false
    // 假设后端创建了项目，返回了项目 ID 为 demo-001，然后跳转
    router.push('/project/demo-001/structure')
  }, 800) // 模拟 0.8 秒的延迟让体验更真实
}
</script>

<style scoped>
.project-create { display: flex; justify-content: center; }
.form-container {
  background: white; width: 100%; max-width: 800px;
  padding: 40px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}
.subtitle { color: #666; margin-bottom: 30px; }

.form-group { margin-bottom: 24px; display: flex; flex-direction: column; }
.form-group label { font-weight: bold; margin-bottom: 8px; color: #333; }
.form-group input, .form-group select, .form-group textarea {
  padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;
}
.form-group textarea { resize: vertical; }

.form-actions {
  display: flex; justify-content: flex-end; gap: 16px; margin-top: 40px;
}
.btn-secondary {
  background: white; border: 1px solid #ddd; padding: 10px 20px; border-radius: 4px; cursor: pointer;
}
.btn-primary {
  background: #3698F5; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;
}
</style>