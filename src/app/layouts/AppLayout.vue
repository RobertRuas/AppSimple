<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import AppHeader from '@/components/navigation/AppHeader.vue'
import PageToolbar from '@/components/navigation/PageToolbar.vue'
import ImportOverlay from '@/components/feedback/ImportOverlay.vue'
import { usePageActions } from '@/composables/usePageActions'
import { usePageTitle } from '@/composables/usePageTitle'
import type { PageAction } from '@/app/router'

const route = useRoute()
const { overrideActions } = usePageActions()
const { titleOverride } = usePageTitle()

const isFullscreen = computed(() => route.meta.fullscreen === true)
const isHome = computed(() => route.meta.isHome === true)
const pageTitle = computed(() => titleOverride.value ?? (route.meta.title as string) ?? '')
const toolbarActions = computed(() => overrideActions.value ?? (route.meta.actions as PageAction[]) ?? [])
</script>

<template>
  <div class="app-layout">
    <template v-if="!isFullscreen">
      <AppHeader :title="pageTitle" />
      <PageToolbar v-if="!isHome" :actions="toolbarActions" />
    </template>
    <main class="app-content" :class="{ 'app-content-fullscreen': isFullscreen }">
      <router-view />
    </main>
    <ImportOverlay />
    <Toast position="bottom-center" />
    <ConfirmDialog />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: var(--spacing-lg);
  padding-bottom: calc(var(--spacing-lg) + var(--safe-area-bottom));
}

.app-content-fullscreen {
  padding: 0;
}
</style>
