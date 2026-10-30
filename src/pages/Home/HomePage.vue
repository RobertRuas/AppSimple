<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Tag from 'primevue/tag'
import { useProjects } from '@/composables/useProjects'

const router = useRouter()
const { projects } = useProjects()

const cards = computed(() => {
  const total = projects.value.length
  const completed = projects.value.filter(p => p.status === 'Completed').length
  const inProgress = projects.value.filter(p => p.status === 'In Progress').length
  return [
    { key: 'projects', title: 'Projects', icon: 'pi pi-folder', count: total, color: '#3B82F6', bg: '#EFF6FF' },
    { key: 'templates', title: 'Templates', icon: 'pi pi-copy', count: 3, color: '#8B5CF6', bg: '#F3E8FF' },
    { key: 'completed', title: 'Completed', icon: 'pi pi-check-circle', count: completed, color: '#10B981', bg: '#ECFDF5' },
    { key: 'inprogress', title: 'In Progress', icon: 'pi pi-spinner', count: inProgress, color: '#D97706', bg: '#FEF3C7' }
  ]
})

function statusSeverity(status: string) {
  return status === 'Completed' ? 'success' : 'warn'
}

function initialsColor(name: string) {
  const colors = ['#3B82F6', '#10B981', '#D97706', '#8B5CF6', '#EF4444']
  let hash = 0
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}
</script>

<template>
  <div class="home-page">

    <h2 class="page-title">Projects</h2>

    <div class="cards-grid">
      <button v-for="card in cards" :key="card.key" class="summary-card">
        <div class="card-top">
          <span class="card-icon" :style="{ background: card.bg, color: card.color }">
            <i :class="card.icon"></i>
          </span>
          <span class="card-count">{{ card.count }}</span>
        </div>
        <span class="card-title">{{ card.title }}</span>
      </button>
    </div>

    <div class="list-header">
      <span class="list-header-title">Projects</span>
      <button class="list-header-action">
        <span>See All</span>
        <i class="pi pi-chevron-right"></i>
      </button>
    </div>

    <div class="project-list">
      <button v-for="project in projects" :key="project.id" class="project-item" @click="router.push(`/projects/${project.id}`)">
        <span class="project-thumb" :style="{ background: initialsColor(project.name) }">
          <i class="pi pi-image"></i>
        </span>
        <div class="project-info">
          <span class="project-name">{{ project.name }}</span>
          <span class="project-meta">{{ project.category }} · {{ project.entity }}</span>
          <span class="project-photos">
            <i class="pi pi-camera"></i>
            {{ project.photos }} fotos
          </span>
        </div>
        <div class="project-end">
          <Tag :value="project.status" :severity="statusSeverity(project.status)" />
          <i class="pi pi-chevron-right project-arrow"></i>
        </div>
      </button>
    </div>

    <button class="demo-link" @click="router.push('/demo')">
      <i class="pi pi-external-link"></i>
      <span>Página de demonstração</span>
    </button>

  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.page-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}

/* --- Summary Cards --- */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.summary-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  min-height: 100px;
  cursor: pointer;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
}

.summary-card:active {
  background: var(--color-border);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 16px;
  flex-shrink: 0;
}

.card-count {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1;
}

.card-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-top: var(--spacing-sm);
}

/* --- List Header --- */
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-header-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
}

.list-header-action {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  padding: var(--spacing-xs) 0;
  -webkit-tap-highlight-color: transparent;
}

.list-header-action i {
  font-size: 12px;
}

.list-header-action:active {
  color: var(--color-text-primary);
}

/* --- Project List --- */
.project-list {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.project-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
}

.project-item:active {
  background: var(--color-border);
}

.project-item + .project-item {
  border-top: 1px solid var(--color-border);
}

.project-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
  color: #fff;
  font-size: 18px;
}

.project-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.project-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-meta {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.project-photos {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.project-photos i {
  font-size: 11px;
}

.project-end {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.project-arrow {
  font-size: 12px;
  color: var(--color-text-secondary);
}

/* --- Demo Link --- */
.demo-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  -webkit-tap-highlight-color: transparent;
}

.demo-link:active {
  color: var(--color-text-primary);
}
</style>
