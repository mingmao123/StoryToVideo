<template>
  <div class="structure-page">
    <div class="page-header">
      <h2>故事结构解析结果</h2>
      <p>系统已完成文本语义抽取，提取出以下核心叙事元素，请确认。</p>
    </div>

    <div class="result-grid">
      <div class="panel full-width">
        <h3 class="panel-title">📖 故事摘要</h3>
        <p class="summary-text">{{ mockData.summary }}</p>
      </div>

      <div class="panel">
        <h3 class="panel-title">👤 抽取角色 ({{ mockData.characters.length }})</h3>
        <div class="tag-list">
          <span class="tag role-tag" v-for="role in mockData.characters" :key="role">{{ role }}</span>
        </div>
      </div>

      <div class="panel">
        <h3 class="panel-title">🎬 抽取场景 ({{ mockData.scenes.length }})</h3>
        <div class="tag-list">
          <span class="tag scene-tag" v-for="scene in mockData.scenes" :key="scene">{{ scene }}</span>
        </div>
      </div>

      <div class="panel full-width">
        <h3 class="panel-title">⏱️ 关键事件 / 情绪推进</h3>
        <ul class="event-timeline">
          <li v-for="(event, index) in mockData.events" :key="index">
            <span class="step-num">{{ index + 1 }}</span>
            <span class="event-desc">{{ event }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="page-actions">
      <button class="btn-primary" @click="goToCharacterSettings">确认无误，进入角色设定 ➜</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟后端 AI 模型返回的结构化数据
const mockData = {
  summary: "在 2045 年的新亚特兰蒂斯，天才黑客 'K' 截获了一段异常的深网加密流量。他发现这段流量中隐藏着一个能绕过顶级防火墙的自编译模型。为了阻止一场即将到来的网络瘫痪，K 必须潜入虚拟协议层，与未知的人工智能进行对抗。",
  characters: ["黑客 'K'", "安全局指挥官", "未知 AI 实体 '幽灵'"],
  scenes: ["昏暗的地下服务器工坊", "赛博城市霓虹街头", "虚拟协议层数据空间"],
  events: [
    "K 在日常扫描中发现异常的加密流量包。",
    "K 尝试对流量进行特征分类，意外唤醒了 AI '幽灵'。",
    "安全局介入，城市部分网络开始闪断。",
    "K 戴上脑机接口，正面潜入数据空间与幽灵决战。"
  ]
}

const goToCharacterSettings = () => {
  // 这里的 demo-001 是模拟的项目 ID
  router.push('/project/demo-001/characters')
}
</script>

<style scoped>
.structure-page { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
.page-header h2 { margin: 0 0 8px 0; color: #333; }
.page-header p { margin: 0; color: #666; font-size: 14px; }

.result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.full-width { grid-column: 1 / -1; } /* 占据整行 */

.panel {
  background: white; border-radius: 8px; padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #eee;
}
.panel-title { margin: 0 0 16px 0; font-size: 16px; color: #333; border-bottom: 1px solid #f0f0f0; padding-bottom: 10px; }

.summary-text { color: #555; line-height: 1.6; font-size: 15px; margin: 0; }

.tag-list { display: flex; flex-wrap: wrap; gap: 10px; }
.tag { padding: 6px 12px; border-radius: 4px; font-size: 14px; font-weight: bold; }
.role-tag { background: #E3F2FD; color: #1976D2; }
.scene-tag { background: #E8F5E9; color: #388E3C; }

.event-timeline { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.event-timeline li { display: flex; align-items: flex-start; gap: 12px; }
.step-num { 
  background: #333; color: white; width: 24px; height: 24px; 
  border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;
}
.event-desc { color: #444; line-height: 1.5; padding-top: 2px; }

.page-actions { display: flex; justify-content: flex-end; margin-top: 10px; }
.btn-primary {
  background: #3698F5; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; cursor: pointer;
}
.btn-primary:hover { opacity: 0.9; }
</style>