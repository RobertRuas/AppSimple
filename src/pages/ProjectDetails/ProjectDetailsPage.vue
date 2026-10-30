<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import { useProjects } from '@/composables/useProjects'
import { usePageTitle } from '@/composables/usePageTitle'
import { usePageActions } from '@/composables/usePageActions'
import { usePhotoImport } from '@/composables/usePhotoImport'
import { usePhotoStore } from '@/composables/usePhotoStore'
import ProjectTabs from '@/components/common/ProjectTabs.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { getProject } = useProjects()
const { setTitle } = usePageTitle()
const { setActions } = usePageActions()
const { importPhotos } = usePhotoImport()
const { getInboxCount } = usePhotoStore()

const projectId = computed(() => Number(route.params.id))
const project = computed(() => getProject(projectId.value))

if (project.value) {
  setTitle(project.value.shortName)
}

setActions([
  { icon: 'pi pi-share-alt', label: 'Partilhar' },
  { icon: 'pi pi-ellipsis-v', label: 'Opções' }
])

const allSorted = computed(() => project.value?.photosToSort === 0)
const hasPhotosToSort = computed(() => (project.value?.photosToSort ?? 0) > 0)

function goToReview() {
  router.push(`/projects/${projectId.value}/review`)
}

function startSorting() {
  router.push(`/projects/${projectId.value}/sort`)
}

async function onImport() {
  const count = await importPhotos(projectId.value)
  if (count > 0) {
    toast.add({ severity: 'success', summary: `${count} photos imported`, life: 3000 })
  }
}

const inboxCount = computed(() => getInboxCount(projectId.value))
</script>

<template>
  <div v-if="project" class="project-details">

    <div class="summary-card">
      <div class="summary-main">
        <span class="summary-count">{{ project.photosToSort }}</span>
        <span class="summary-label">Photos to Sort</span>
      </div>
      <div class="summary-meta">
        <span>{{ project.photosSorted }} Sorted</span>
        <span class="summary-dot">·</span>
        <span>{{ project.trash }} Trash</span>
        <span class="summary-dot">·</span>
        <span>Inspection {{ project.inspectionRange }}</span>
      </div>
    </div>

    <div class="action-cards">
      <button class="action-card" :class="{ 'action-card-sorting': hasPhotosToSort }" @click="startSorting">
        <span class="action-card-icon" :class="{ 'action-card-icon-sorting': hasPhotosToSort }">
          <i class="pi pi-sort-alt"></i>
        </span>
        <span class="action-card-label">Start Sorting</span>
      </button>
      <button class="action-card" @click="onImport">
        <span class="action-card-icon">
          <i class="pi pi-plus"></i>
        </span>
        <span class="action-card-label">Import</span>
        <span v-if="inboxCount > 0" class="action-card-badge">{{ inboxCount }}</span>
      </button>
    </div>

    <div v-if="allSorted" class="status-area">
      <span class="status-icon">
        <i class="pi pi-check"></i>
      </span>
      <h3 class="status-title">All Sorted</h3>
      <p class="status-text">Check the order, then export.</p>
    </div>

    <div v-else class="status-area">
      <span class="status-icon status-icon-pending">
        <i class="pi pi-images"></i>
      </span>
      <h3 class="status-title">{{ project.photosToSort }} to Sort</h3>
      <p class="status-text">Sort the remaining photos to continue.</p>
    </div>

    <div class="action-buttons">
      <Button label="Go to Review" severity="secondary" outlined class="action-btn" @click="goToReview" />
      <Button label="Export" icon="pi pi-upload" class="action-btn" />
    </div>

    <ProjectTabs :projectId="projectId" />
  </div>

  <div v-else class="not-found">
    <p>Projeto não encontrado.</p>
  </div>
</template>

<style scoped>
.project-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* --- Summary Card --- */
.summary-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
}

.summary-main {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.summary-count {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1;
}

.summary-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.summary-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.summary-dot {
  color: var(--color-border);
}

/* --- Action Cards --- */
.action-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xl) var(--spacing-md);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.action-card:active {
  background: var(--color-border);
}

.action-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-accent);
  color: #fff;
  font-size: 18px;
}

.action-card-sorting {
  border-color: #3B82F6;
  background: #EFF6FF;
  animation: pulse-card 2s ease-in-out infinite;
}

.action-card-sorting:active {
  background: #DBEAFE;
}

.action-card-icon-sorting {
  background: #3B82F6;
  animation: pulse-icon 1.5s ease-in-out infinite;
}

@keyframes pulse-icon {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.6);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 14px rgba(59, 130, 246, 0);
    transform: scale(1.08);
  }
}

@keyframes pulse-card {
  0%, 100% {
    border-color: #3B82F6;
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.15);
  }
  50% {
    border-color: #2563EB;
    box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .action-card-icon-sorting {
    animation: none;
  }
}

.action-card-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.action-card-badge {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: #3B82F6;
  background: #EFF6FF;
  padding: 1px 8px;
  border-radius: 10px;
}

/* --- Status Area --- */
.status-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xl) 0;
}

.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ECFDF5;
  color: #10B981;
  font-size: 28px;
  margin-bottom: var(--spacing-sm);
}

.status-icon-pending {
  background: #FEF3C7;
  color: #D97706;
}

.status-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
}

.status-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
}

/* --- Action Buttons --- */
.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.action-btn {
  width: 100%;
}

/* --- Not Found --- */
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
</style>
