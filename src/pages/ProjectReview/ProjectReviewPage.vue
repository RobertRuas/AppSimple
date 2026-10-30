<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjects } from '@/composables/useProjects'
import { usePageTitle } from '@/composables/usePageTitle'
import { usePageActions } from '@/composables/usePageActions'
import { usePhotoImport } from '@/composables/usePhotoImport'
import { useToast } from 'primevue/usetoast'
import ProjectTabs from '@/components/common/ProjectTabs.vue'
import PhotoGroup from './components/PhotoGroup.vue'
import type { Photo } from './components/PhotoGroup.vue'

const route = useRoute()
const router = useRouter()
const { getProject } = useProjects()
const toast = useToast()
const { setTitle } = usePageTitle()
const { setActions } = usePageActions()
const { importPhotos } = usePhotoImport()

const projectId = computed(() => Number(route.params.id))
const project = computed(() => getProject(projectId.value))

if (project.value) {
  setTitle(project.value.shortName)
}

async function onImport() {
  const count = await importPhotos(projectId.value)
  if (count > 0) {
    toast.add({ severity: 'success', summary: `${count} photos imported`, life: 3000 })
  }
}

setActions([
  { icon: 'pi pi-download', label: 'Importar fotos', handler: onImport },
  { icon: 'pi pi-upload', label: 'Exportar projeto' },
  { icon: 'pi pi-pencil', label: 'Editar projeto' }
])

const palette = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16']

function makePhotos(count: number, offset: number): Photo[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `p-${offset}-${i}`,
    color: palette[(offset + i) % palette.length]
  }))
}

interface GroupData {
  name: string
  photos: Photo[]
}

const groups = ref<GroupData[]>([
  { name: 'General', photos: makePhotos(7, 0) },
  { name: 'T1', photos: makePhotos(7, 7) },
  { name: 'T2', photos: makePhotos(7, 14) },
  { name: 'T3', photos: makePhotos(7, 21) },
  { name: 'T4', photos: makePhotos(7, 28) },
  { name: 'T5', photos: makePhotos(7, 35) }
])

function onReorder(groupIndex: number, photos: Photo[]) {
  groups.value[groupIndex].photos = photos
}

function onPhotoClick(groupName: string, photoIndex: number) {
  router.push({
    path: `/projects/${projectId.value}/sort`,
    query: { group: groupName, index: String(photoIndex) }
  })
}

</script>

<template>
  <div v-if="project" class="review-page">

    <div class="groups-area">
      <PhotoGroup
        v-for="(group, gi) in groups"
        :key="group.name"
        :name="group.name"
        :photos="group.photos"
        @reorder="onReorder(gi, $event)"
        @photo-click="onPhotoClick"
      />
    </div>

    <ProjectTabs :projectId="projectId" />
  </div>

  <div v-else class="not-found">
    <p>Projeto não encontrado.</p>
  </div>
</template>

<style scoped>
.review-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  height: 100%;
}

.groups-area {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
</style>
