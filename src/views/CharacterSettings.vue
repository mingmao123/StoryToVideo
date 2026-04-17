<template>
  <div class="settings-page">
    <div class="page-header">
      <h2>角色设定微调</h2>
      <p>系统已根据故事上下文生成了初始角色画像。完善这些细节，能极大提高后续分镜生成的准确度。</p>
    </div>

    <div class="character-grid">
      <div class="character-card" v-for="(char, index) in characters" :key="char.id">
        <div class="card-header">
          <div class="avatar-placeholder">{{ char.name.charAt(0) }}</div>
          <div class="header-info">
            <input type="text" class="title-input" v-model="char.name" />
            <span class="role-badge">{{ char.role }}</span>
          </div>
        </div>

        <div class="card-body">
          <div class="form-group">
            <label>🧑 外观特征 (Appearance)</label>
            <textarea v-model="char.appearance" rows="2" placeholder="例如：黑发，戴着深色护目镜..."></textarea>
          </div>
          <div class="form-group">
            <label>🧥 默认服装 (Clothing)</label>
            <input type="text" v-model="char.clothing" placeholder="例如：黑色立领风衣" />
          </div>
          <div class="form-group">
            <label>🎭 性格与状态 (Vibe)</label>
            <input type="text" v-model="char.personality" placeholder="例如：冷静、疲惫" />
          </div>
        </div>
      </div>
    </div>

    <div class="page-actions">
      <button class="btn-secondary">保存修改</button>
      <button class="btn-primary" @click="goToSceneSettings">设定完成，进入场景设定 ➜</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 模拟扩展后的角色详细数据
// 在实际开发中，这些数据将来自上一个页面解析后存入的状态管理库 (如 Pinia)
const characters = ref([
  {
    id: 1,
    name: "黑客 'K'",
    role: "核心主角",
    appearance: "身材高瘦，眼神锐利，右侧脖颈有神经接口植入体的金属反光。",
    clothing: "深灰色防水机能风衣，内搭黑色紧身作战服。",
    personality: "极致冷静，带有长期熬夜的疲惫感。"
  },
  {
    id: 2,
    name: "AI实体 '幽灵'",
    role: "主要反派",
    appearance: "没有固定实体，在视觉空间中表现为一团不断重组的蓝色多边形发光几何体。",
    clothing: "无",
    personality: "绝对理性，压迫感极强。"
  }
])

const goToSceneSettings = () => {
  // route.params.id 可以获取当前 URL 上的项目 ID (如 demo-001)
  const projectId = route.params.id || 'demo-001'
  router.push(`/project/${projectId}/scenes`)
}
</script>

<style scoped>
.settings-page { display: flex; flex-direction: column; gap: 24px; max-width: 1200px; margin: 0 auto; }
.page-header h2 { margin: 0 0 8px 0; color: #333; }
.page-header p { margin: 0; color: #666; font-size: 14px; }

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.character-card {
  background: white; border-radius: 8px; border: 1px solid #E4E7ED;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02); overflow: hidden;
  transition: box-shadow 0.3s;
}
.character-card:hover { box-shadow: 0 8px 16px rgba(0,0,0,0.06); }

.card-header {
  display: flex; align-items: center; gap: 16px; padding: 20px;
  background: #FAFAFA; border-bottom: 1px solid #E4E7ED;
}
.avatar-placeholder {
  width: 50px; height: 50px; background: linear-gradient(135deg, #3698F5, #3CB4D5);
  color: white; border-radius: 8px; display: flex; justify-content: center; align-items: center;
  font-size: 24px; font-weight: bold; flex-shrink: 0;
}
.header-info { display: flex; flex-direction: column; gap: 4px; flex: 1; }
.title-input { 
  font-size: 18px; font-weight: bold; border: none; background: transparent; 
  color: #333; outline: none; border-bottom: 1px dashed transparent;
}
.title-input:focus { border-bottom: 1px dashed #3698F5; }
.role-badge { 
  align-self: flex-start; font-size: 12px; background: #E3F2FD; color: #1976D2; 
  padding: 2px 8px; border-radius: 12px; 
}

.card-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 13px; font-weight: bold; color: #555; }
.form-group input, .form-group textarea {
  padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;
  background: #F9F9F9; transition: all 0.2s;
}
.form-group input:focus, .form-group textarea:focus {
  background: white; border-color: #3698F5; outline: none; box-shadow: 0 0 0 2px rgba(54,152,245,0.1);
}
.form-group textarea { resize: vertical; }

.page-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 10px; }
.btn-secondary { background: white; border: 1px solid #ddd; padding: 12px 24px; border-radius: 6px; cursor: pointer; color: #333;}
.btn-primary { background: #3698F5; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; cursor: pointer; }
.btn-primary:hover { opacity: 0.9; }
</style>