<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  projectId: number
}>()

const route = useRoute()
const router = useRouter()

const activeTab = computed(() =>
  route.name === 'project-review' ? 'review' : 'unsorted'
)
</script>

<template>
  <div class="project-tabs">
    <button
      class="tab-item"
      :class="{ 'tab-active': activeTab === 'unsorted' }"
      @click="router.replace(`/projects/${projectId}`)"
    >
      <i class="pi pi-inbox"></i>
      <span>Unsorted</span>
    </button>
    <button
      class="tab-item"
      :class="{ 'tab-active': activeTab === 'review' }"
      @click="router.replace(`/projects/${projectId}/review`)"
    >
      <i class="pi pi-th-large"></i>
      <span>Review</span>
    </button>
  </div>
</template>

<style scoped>
.project-tabs {
  display: flex;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  flex-shrink: 0;
}

.tab-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--radius-lg);
  margin: 3px;
}

.tab-item i {
  font-size: var(--font-size-md);
}

.tab-active {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
