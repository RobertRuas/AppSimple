<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  title: string
}>()

const router = useRouter()
</script>

<template>
  <header class="app-header">
    <h1 class="app-header-title">{{ title }}</h1>
    <div class="app-header-actions">
      <button class="header-action" aria-label="Notificações" title="Notificações">
        <i class="pi pi-bell"></i>
      </button>
      <button class="header-action" aria-label="Definições" title="Definições" @click="router.push('/settings')">
        <i class="pi pi-cog"></i>
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(var(--header-height) + var(--safe-area-top));
  padding: 0 var(--spacing-lg);
  padding-top: var(--safe-area-top);
  background: var(--color-header-bg);
  z-index: var(--z-header);
  flex-shrink: 0;
}

.app-header-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-header-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: var(--header-height);
}

.app-header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.header-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--touch-target);
  height: var(--touch-target);
  border: none;
  background: transparent;
  color: var(--color-header-text);
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  -webkit-tap-highlight-color: transparent;
  opacity: 0.85;
}

.header-action:active {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}
</style>
