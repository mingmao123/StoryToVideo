<template>
  <div class="shot-detail-page">
    <div class="page-header">
      <button class="btn-back" @click="$router.back()">← 返回分镜规划</button>
      <h2>🔍 镜头参数微调 (Shot {{ currentShotId }})</h2>
    </div>

    <div class="editor-container">
      <div class="left-panel">
        <div class="preview-box">
          <span class="icon">🖼️</span>
          <span class="text">关键帧等待生成</span>
        </div>
        
        <div class="info-card">
          <h3>🎯 叙事目标 (Narrative Purpose)</h3>
          <p>{{ mockShot.purpose }}</p>
        </div>
        
        <div class="info-card">
          <h3>📍 所属场景 (Scene)</h3>
          <p>{{ mockShot.scene }}</p>
        </div>
      </div>

      <div class="right-panel">
        <h3 class="panel-title">⚙️ 核心生成约束 (Generation Constraints)</h3>
        
        <div class="form-group">
          <label>🎥 景别与构图 (Camera & Composition)</label>
          <input type="text" v-model="mockShot.camera" />
        </div>

        <div class="form-group">
          <label>👤 主体动作与情绪 (Subject Action)</label>
          <textarea v-model="mockShot.action" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label>✨ 光影与氛围细节 (Lighting & Vibe)</label>
          <input type="text" v-model="mockShot.lighting" placeholder="例如：高对比度，侧逆光，赛博朋克霓虹色彩" />
        </div>

        <div class="form-divider"></div>

        <div class="form-group prompt-group">
          <label>
            <span>💻 最终编译 Prompt (可人工覆写)</span>
            <span class="hint">系统将严格按照此提示词生成图像</span>
          </label>
          <textarea v-model="mockShot.prompt" rows="5" class="code-font"></textarea>
        </div>

        <div class="action-bar">
          <button class="btn-secondary" @click="$router.back()">取消修改</button>
          <button class="btn-primary" @click="saveAndGoBack">保存并返回分镜列表</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 从路由 URL 中获取当前镜头的 ID（例如 s01）
const currentShotId = ref(route.params.shotId || 's01')

// 模拟读取该镜头的详细数据
const mockShot = ref({
  purpose: "建立镜头，交代环境与主角位置",
  scene: "地下服务器工坊",
  camera: "远景 (Wide Shot), 俯视角度",
  action: "坐在庞大的发光服务器阵列前，显得人物渺小，环境压抑。",
  lighting: "冷色调为主，极高对比度，局部有微弱的霓虹绿光点缀",
  prompt: "Wide shot, high angle, Hacker 'K' sitting in front of massive glowing server racks, dark underground workshop, cybernetic, neon green lights, cinematic lighting, masterpiece, 8k resolution."
})

const saveAndGoBack = () => {
  // 在实际项目中，这里会把修改后的 mockShot 保存到 Pinia 或发送给后端
  console.log('已保存镜头修改:', mockShot.value)
  router.back() // 保存后自动返回上一页
}
</script>

<style scoped>
.shot-detail-page { display: flex; flex-direction: column; gap: 20px; max-width: 1200px; margin: 0 auto; padding-bottom: 40px; }

.page-header { display: flex; align-items: center; gap: 16px; border-bottom: 2px solid #eee; padding-bottom: 16px; margin-bottom: 10px; }
.btn-back { background: #f0f0f0; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; color: #555; font-weight: bold; }
.btn-back:hover { background: #e4e4e4; }
.page-header h2 { margin: 0; color: #333; }

.editor-container { display: flex; gap: 24px; align-items: flex-start; }

/* 左侧栏样式 */
.left-panel { width: 350px; display: flex; flex-direction: column; gap: 20px; flex-shrink: 0; }
.preview-box { height: 220px; background: #2F3542; border-radius: 12px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff; gap: 10px; box-shadow: inset 0 0 20px rgba(0,0,0,0.5); }
.preview-box .icon { font-size: 32px; }
.preview-box .text { color: rgba(255,255,255,0.6); font-size: 14px; }

.info-card { background: white; padding: 16px; border-radius: 8px; border: 1px solid #E4E7ED; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
.info-card h3 { margin: 0 0 8px 0; font-size: 14px; color: #666; }
.info-card p { margin: 0; font-size: 14px; color: #333; line-height: 1.5; background: #F9F9F9; padding: 10px; border-radius: 6px; }

/* 右侧栏样式 */
.right-panel { flex: 1; background: white; padding: 30px; border-radius: 12px; border: 1px solid #E4E7ED; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 20px; }
.panel-title { margin: 0 0 10px 0; font-size: 18px; color: #333; border-bottom: 1px solid #eee; padding-bottom: 15px; }

.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 14px; font-weight: bold; color: #444; display: flex; justify-content: space-between; }
.hint { font-weight: normal; color: #999; font-size: 12px; }
.form-group input, .form-group textarea { padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; background: #FAFAFA; transition: border-color 0.2s; }
.form-group input:focus, .form-group textarea:focus { background: white; border-color: #3698F5; outline: none; }
.form-group textarea { resize: vertical; }

.form-divider { height: 1px; background: #eee; margin: 10px 0; }

.prompt-group textarea.code-font { font-family: monospace; color: #6CC24A; background: #282c34; border: none; line-height: 1.6; }
.prompt-group textarea.code-font:focus { box-shadow: 0 0 0 2px rgba(108, 194, 74, 0.3); }

.action-bar { display: flex; justify-content: flex-end; gap: 16px; margin-top: 10px; }
.btn-secondary { background: white; border: 1px solid #ddd; padding: 10px 24px; border-radius: 6px; cursor: pointer; color: #555; }
.btn-primary { background: #3698F5; color: white; border: none; padding: 10px 24px; border-radius: 6px; font-size: 15px; cursor: pointer; font-weight: bold; }
.btn-primary:hover { opacity: 0.9; }
</style>