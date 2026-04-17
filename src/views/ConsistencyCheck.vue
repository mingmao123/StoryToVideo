<template>
  <div class="qa-page">
    <div class="page-header">
      <h2>📊 一致性评估报告</h2>
      <p>系统已完成对生成结果的全局校验。评分低于 70 分的镜头可能存在视觉跳跃，建议进行局部重绘。</p>
    </div>

    <div class="score-dashboard">
      <div class="score-card">
        <span class="score-value success">92</span>
        <span class="score-label">角色一致性</span>
      </div>
      <div class="score-card">
        <span class="score-value success">88</span>
        <span class="score-label">场景一致性</span>
      </div>
      <div class="score-card">
        <span class="score-value warning">65</span>
        <span class="score-label">风格连贯性</span>
      </div>
    </div>

    <div class="section-title">
      <h3>⚠️ 发现 1 个风险镜头</h3>
    </div>

    <div class="issue-list">
      <div class="issue-card">
        <div class="issue-image" style="background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80')">
          <span class="shot-tag">SHOT 03</span>
        </div>
        <div class="issue-details">
          <h4>风格突变警告 (Confidence: 85%)</h4>
          <p class="desc"><strong>问题描述：</strong> 该镜头色彩饱和度异常偏高，且出现了未在场景设定中定义的多边形几何元素，偏离了全局的“暗黑赛博朋克”写实风格。</p>
          <div class="fix-action">
            <input type="text" value="降低色彩饱和度，移除抽象几何体，替换为具象的线缆结构" class="fix-prompt" />
            <button class="btn-sm-primary">执行局部重绘</button>
          </div>
        </div>
      </div>
    </div>

    <div class="page-actions">
      <button class="btn-secondary" @click="$router.back()">返回结果网格</button>
      <button class="btn-primary" @click="goToPreview">评估完成，进入最终预览 ➜</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goToPreview = () => {
  const projectId = route.params.id || 'demo-001'
  router.push(`/project/${projectId}/preview`)
}
</script>

<style scoped>
.qa-page { display: flex; flex-direction: column; gap: 24px; max-width: 1000px; margin: 0 auto; }
.page-header h2 { margin: 0 0 8px 0; color: #333; }
.page-header p { margin: 0; color: #666; font-size: 14px; }

.score-dashboard { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.score-card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #E4E7ED; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
.score-value { font-size: 36px; font-weight: bold; }
.score-value.success { color: #6CC24A; }
.score-value.warning { color: #F0AF46; }
.score-label { color: #666; font-size: 14px; font-weight: bold; }

.section-title h3 { margin: 10px 0 0 0; color: #F07A6D; font-size: 18px; border-left: 4px solid #F07A6D; padding-left: 10px; }

.issue-list { display: flex; flex-direction: column; gap: 16px; }
.issue-card { display: flex; background: white; border: 1px solid #F0AF46; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(240, 175, 70, 0.1); }
.issue-image { width: 220px; background-size: cover; background-position: center; position: relative; }
.shot-tag { position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; font-size: 12px; border-radius: 4px; font-weight: bold; }

.issue-details { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 12px; }
.issue-details h4 { margin: 0; color: #333; font-size: 16px; }
.issue-details .desc { margin: 0; color: #555; font-size: 14px; line-height: 1.5; background: #FFF8E1; padding: 12px; border-radius: 6px; }

.fix-action { display: flex; gap: 12px; margin-top: 8px; }
.fix-prompt { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 13px; background: #F9F9F9; }
.btn-sm-primary { background: #3698F5; color: white; border: none; padding: 0 20px; border-radius: 6px; cursor: pointer; font-weight: bold; }

.page-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 20px; }
.btn-secondary { background: white; border: 1px solid #ddd; padding: 12px 24px; border-radius: 6px; cursor: pointer; }
.btn-primary { background: #333; color: white; border: none; padding: 12px 28px; border-radius: 6px; font-size: 16px; cursor: pointer; font-weight: bold; }
</style>