<template>
  <div class="results-page">
    <div class="page-header">
      <h2>✨ 关键帧生成结果</h2>
      <p>所有分镜的视觉预演已生成完毕。您可以核对画面细节，并运行一致性检查。</p>
    </div>

    <div class="result-grid">
      <div class="result-card" v-for="(shot, index) in resultShots" :key="shot.id">
        
        <div class="image-box" :style="{ backgroundImage: 'url(' + shot.imageUrl + ')' }">
          <span class="shot-tag">SHOT {{ String(index + 1).padStart(2, '0') }}</span>
          <div class="watermark">Story Compiler AI</div>
        </div>

        <div class="card-info">
          <p class="shot-desc">{{ shot.purpose }}</p>
          <div class="action-bar">
            <button class="btn-icon">🔍 放大查看</button>
            <button class="btn-icon">🔄 局部重绘</button>
          </div>
        </div>
      </div>
    </div>

    <div class="page-actions">
      <button class="btn-warning" @click="runConsistencyCheck">开始一致性检查 (QA Check) ➜</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 换成了真实的赛博朋克风格网络占位图
const resultShots = ref([
  {
    id: 's01', 
    purpose: "建立镜头：地下服务器工坊的黑客 'K'",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" 
  },
  {
    id: 's02', 
    purpose: "特写镜头：'K' 面部被屏幕绿光照亮",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" 
  },
  {
    id: 's03', 
    purpose: "全景镜头：虚拟协议层中 AI '幽灵' 爆发",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" 
  }
])

const runConsistencyCheck = () => {
  const projectId = route.params.id || 'demo-001'
  router.push(`/project/${projectId}/qa-check`)
}
</script>

<style scoped>
.results-page { display: flex; flex-direction: column; gap: 24px; max-width: 1200px; margin: 0 auto; }
.page-header h2 { margin: 0 0 8px 0; color: #333; }
.page-header p { margin: 0; color: #666; font-size: 14px; }

.result-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }

.result-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04); border: 1px solid #E4E7ED; }

.image-box { 
  height: 200px; position: relative; display: flex; justify-content: center; align-items: center; 
  /* 增加了背景图的适配样式 */
  background-size: cover; 
  background-position: center;
  box-shadow: inset 0 -50px 50px -20px rgba(0,0,0,0.7); /* 底部加一点暗角让文字更清晰 */
}
.shot-tag { position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 4px 10px; font-size: 12px; border-radius: 4px; font-weight: bold; }
.watermark { position: absolute; bottom: 10px; right: 10px; color: rgba(255,255,255,0.5); font-size: 10px; font-weight: bold; pointer-events: none; }

.card-info { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.shot-desc { margin: 0; font-size: 14px; color: #444; line-height: 1.5; font-weight: 500; }

.action-bar { display: flex; justify-content: space-between; border-top: 1px solid #eee; padding-top: 12px; }
.btn-icon { background: none; border: none; color: #666; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 4px; }
.btn-icon:hover { color: #3698F5; }

.page-actions { display: flex; justify-content: flex-end; margin-top: 20px; }
.btn-warning { 
  background: linear-gradient(to right, #F0AF46, #F07A6D); 
  color: white; border: none; padding: 12px 28px; border-radius: 6px; font-size: 16px; cursor: pointer; font-weight: bold;
}
.btn-warning:hover { opacity: 0.9; box-shadow: 0 4px 12px rgba(240, 175, 70, 0.4); }
</style>