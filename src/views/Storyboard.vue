<template>
  <div class="storyboard-page">
    <div class="page-header">
      <div class="header-text">
        <h2>🎬 镜头级分镜规划 (Storyboard)</h2>
        <p>系统已根据故事和场景设定自动生成了镜头序列。请确认每个镜头的叙事目的和画面构图，准备进入视觉生成。</p>
      </div>
      <div class="header-stats">
        <span class="stat-badge">总镜头数: {{ shots.length }}</span>
      </div>
    </div>

    <div class="shot-list">
      <div class="shot-card" v-for="(shot, index) in shots" :key="shot.id">
        
        <div class="shot-visual">
          <div class="shot-number">SHOT {{ String(index + 1).padStart(2, '0') }}</div>
          <div class="image-placeholder">
            <span class="icon">🖼️</span>
            <span class="text">等待生成关键帧</span>
          </div>
        </div>

        <div class="shot-details">
          <div class="detail-header">
            <h4>{{ shot.purpose }}</h4>
            <button class="btn-text" @click="goToShotDetail(shot.id)">⚙️ 微调此镜头</button>
          </div>
          
          <div class="parameter-grid">
            <div class="param-item">
              <span class="label">📍 场景</span>
              <span class="value">{{ shot.scene }}</span>
            </div>
            <div class="param-item">
              <span class="label">🎥 景别/构图</span>
              <span class="value highlight">{{ shot.camera }}</span>
            </div>
            <div class="param-item">
              <span class="label">👤 主体角色</span>
              <span class="value">{{ shot.subject }}</span>
            </div>
            <div class="param-item">
              <span class="label">🎭 动作与情绪</span>
              <span class="value">{{ shot.action }}</span>
            </div>
          </div>

          <div class="prompt-box">
            <span class="label">系统生成的 Prompt (预览):</span>
            <p class="prompt-text">{{ shot.prompt }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="page-actions">
      <button class="btn-secondary" @click="$router.back()">返回场景设定</button>
      <button class="btn-primary" @click="startGeneration">确认分镜，开始生成关键帧 🚀</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 模拟 AI 生成的分镜序列数据
const shots = ref([
  {
    id: 's01',
    purpose: "建立镜头，交代环境与主角位置",
    scene: "地下服务器工坊",
    camera: "远景 (Wide Shot), 俯视角度",
    subject: "黑客 'K' (背影)",
    action: "坐在庞大的发光服务器阵列前，显得人物渺小，环境压抑。",
    prompt: "Wide shot, high angle, Hacker 'K' sitting in front of massive glowing server racks, dark underground workshop, cybernetic, neon green lights, cinematic lighting, masterpiece."
  },
  {
    id: 's02',
    purpose: "刻画主角状态与紧张氛围",
    scene: "地下服务器工坊",
    camera: "特写 (Close-up), 侧面轮廓",
    subject: "黑客 'K'",
    action: "全神贯注地盯着屏幕，屏幕光线打在脸上，眼神锐利，眉头紧锁。",
    prompt: "Close-up, profile view, Hacker 'K' staring intently at computer screen, screen light reflecting on face, sharp eyes, serious expression, cyberpunk style, hyper-detailed."
  },
  {
    id: 's03',
    purpose: "展现剧情转折，危机出现",
    scene: "虚拟协议层空间",
    camera: "全景 (Full Shot), 动态模糊",
    subject: "AI实体 '幽灵'",
    action: "一团蓝色多边形几何体突然在虚空中爆发并重组，极具压迫感。",
    prompt: "Full shot, dynamic composition, AI entity 'Ghost' as glowing blue polygonal geometric shapes erupting and assembling in empty void space, digital particles, terrifying presence."
  }
])

const goToShotDetail = (shotId) => {
  const projectId = route.params.id || 'demo-001'
  // 跳转到单个镜头的详情编辑页
  router.push(`/project/${projectId}/shot/${shotId}`)
}

const startGeneration = () => {
  const projectId = route.params.id || 'demo-001'
  // 跳转到生成中的 Loading 页面
  router.push(`/project/${projectId}/generating`)
}
</script>

<style scoped>
.storyboard-page { display: flex; flex-direction: column; gap: 24px; max-width: 1200px; margin: 0 auto; }
.page-header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #eee; padding-bottom: 16px; }
.header-text h2 { margin: 0 0 8px 0; color: #333; }
.header-text p { margin: 0; color: #666; font-size: 14px; }
.stat-badge { background: #E3F2FD; color: #1976D2; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 14px; }

.shot-list { display: flex; flex-direction: column; gap: 20px; }

.shot-card {
  display: flex; background: white; border-radius: 12px; border: 1px solid #E4E7ED;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02); overflow: hidden;
}

/* 左侧视觉区 */
.shot-visual {
  width: 280px; background: #F8F9FA; border-right: 1px solid #E4E7ED;
  display: flex; flex-direction: column; position: relative; flex-shrink: 0;
}
.shot-number {
  background: #333; color: white; padding: 4px 12px; font-size: 12px; font-weight: bold;
  position: absolute; top: 0; left: 0; border-bottom-right-radius: 8px;
}
.image-placeholder {
  flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px;
  color: #999; min-height: 180px; border: 2px dashed #ddd; margin: 30px 15px 15px 15px; border-radius: 8px;
}
.image-placeholder .icon { font-size: 24px; }

/* 右侧参数区 */
.shot-details { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
.detail-header { display: flex; justify-content: space-between; align-items: center; }
.detail-header h4 { margin: 0; color: #333; font-size: 16px; }
.btn-text { background: none; border: none; color: #3698F5; cursor: pointer; font-size: 14px; }
.btn-text:hover { text-decoration: underline; }

.parameter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.param-item { display: flex; flex-direction: column; gap: 4px; background: #F9F9F9; padding: 10px; border-radius: 6px; }
.param-item .label { font-size: 12px; color: #666; font-weight: bold; }
.param-item .value { font-size: 14px; color: #333; }
.value.highlight { color: #E6A23C; font-weight: bold; }

.prompt-box { background: #282c34; border-radius: 6px; padding: 12px; display: flex; flex-direction: column; gap: 6px; }
.prompt-box .label { color: #abb2bf; font-size: 12px; }
.prompt-text { margin: 0; color: #98c379; font-family: monospace; font-size: 13px; line-height: 1.4; word-break: break-all; }

.page-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 20px; }
.btn-secondary { background: white; border: 1px solid #ddd; padding: 12px 24px; border-radius: 6px; cursor: pointer; }
.btn-primary { 
  background: linear-gradient(to right, #3698F5, #76C652); 
  color: white; border: none; padding: 12px 28px; border-radius: 6px; font-size: 16px; cursor: pointer; font-weight: bold;
}
.btn-primary:hover { opacity: 0.9; box-shadow: 0 4px 12px rgba(118, 198, 82, 0.4); }
</style>