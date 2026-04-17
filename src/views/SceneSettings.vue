<template>
  <div class="settings-page">
    <div class="page-header">
      <h2>场景环境确认</h2>
      <p>系统已从文本中识别出以下核心场景。您可以微调光影、氛围和视觉风格，这将直接影响画面渲染效果。</p>
    </div>

    <div class="scene-grid">
      <div class="scene-card" v-for="(scene, index) in scenes" :key="scene.id">
        <div class="card-banner" :style="{ background: scene.previewColor }">
          <span class="scene-id">场景 #{{ index + 1 }}</span>
        </div>
        
        <div class="card-body">
          <div class="form-group">
            <label>📍 地点名称 (Location)</label>
            <input type="text" v-model="scene.name" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>🕒 时间 (Time)</label>
              <select v-model="scene.time">
                <option>清晨</option>
                <option>正午</option>
                <option>黄昏</option>
                <option>深夜</option>
              </select>
            </div>
            <div class="form-group">
              <label>☁️ 天气 (Weather)</label>
              <input type="text" v-model="scene.weather" />
            </div>
          </div>

          <div class="form-group">
            <label>✨ 视觉风格与氛围 (Atmosphere)</label>
            <textarea v-model="scene.atmosphere" rows="2" placeholder="例如：充满工业感，霓虹灯闪烁，潮湿的地面反射..."></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="page-actions">
      <button class="btn-secondary" @click="$router.back()">上一步：修改角色</button>
      <button class="btn-primary" @click="generateStoryboard">生成分镜规划 (Storyboard) ➜</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 模拟场景详细数据
const scenes = ref([
  {
    id: 1,
    name: "地下服务器工坊",
    time: "深夜",
    weather: "室内（无）",
    atmosphere: "昏暗阴冷，只有服务器阵列散发出微弱的绿光，空气中弥漫着电路板受热的味道。",
    previewColor: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)"
  },
  {
    id: 2,
    name: "虚拟协议层空间",
    time: "无时间维度",
    weather: "无",
    atmosphere: "极简主义风格，背景是纯粹的虚空，漂浮着巨大的几何碎片和流动的代码瀑布。",
    previewColor: "linear-gradient(135deg, #00c6ff, #0072ff)"
  }
])

const generateStoryboard = () => {
  const projectId = route.params.id || 'demo-001'
  // 跳转到下一个核心阶段：分镜规划
  router.push(`/project/${projectId}/storyboard`)
}
</script>

<style scoped>
.settings-page { display: flex; flex-direction: column; gap: 24px; max-width: 1200px; margin: 0 auto; }
.page-header h2 { margin: 0 0 8px 0; color: #333; }
.page-header p { margin: 0; color: #666; font-size: 14px; }

.scene-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.scene-card {
  background: white; border-radius: 12px; border: 1px solid #E4E7ED;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03); overflow: hidden;
}

.card-banner {
  height: 80px; display: flex; align-items: flex-end; padding: 15px; position: relative;
}
.scene-id { 
  background: rgba(0,0,0,0.5); color: white; padding: 4px 10px; 
  border-radius: 4px; font-size: 12px; font-weight: bold;
}

.card-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 13px; font-weight: bold; color: #555; }
.form-group input, .form-group select, .form-group textarea {
  padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;
  background: #F9F9F9;
}
.form-group input:focus, .form-group textarea:focus {
  background: white; border-color: #3698F5; outline: none;
}

.page-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 20px; }
.btn-secondary { background: white; border: 1px solid #ddd; padding: 12px 24px; border-radius: 6px; cursor: pointer; }
.btn-primary { 
  background: linear-gradient(to right, #6CC24A, #3CB4D5); /* 换个成功的绿色渐变，表示即将进入生成 */
  color: white; border: none; padding: 12px 28px; border-radius: 6px; font-size: 16px; cursor: pointer; font-weight: bold;
}
</style>