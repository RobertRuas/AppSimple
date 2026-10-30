<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjects } from '@/composables/useProjects'

const route = useRoute()
const router = useRouter()
const { getProject } = useProjects()

const projectId = computed(() => Number(route.params.id))
const project = computed(() => getProject(projectId.value))

const palette = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16', '#06B6D4', '#E11D48']

const groupFilter = computed(() => (route.query.group as string) || null)
const startIndex = computed(() => Number(route.query.index) || 0)

function generateImages() {
  if (groupFilter.value) {
    const count = 7
    return Array.from({ length: count }, (_, i) => ({
      id: `img-${groupFilter.value}-${i}`,
      color: palette[i % palette.length],
      label: `${groupFilter.value}_${String(i + 1).padStart(3, '0')}`,
      sorted: false,
      category: ''
    }))
  }
  return Array.from({ length: 12 }, (_, i) => ({
    id: `img-${i}`,
    color: palette[i % palette.length],
    label: `IMG_${String(i + 1).padStart(4, '0')}`,
    sorted: false,
    category: ''
  }))
}

const images = ref(generateImages())

const currentIndex = ref(Math.min(startIndex.value, images.value.length - 1))
const activeSelector = ref<'c12' | 'c25' | null>(null)
const slideDir = ref<'next' | 'prev'>('next')
const flashLabel = ref('')
const showFlash = ref(false)

const currentImage = computed(() => images.value[currentIndex.value])
const counter = computed(() => `${currentIndex.value + 1}/${images.value.length}`)
const totalUnsorted = computed(() => images.value.filter(i => !i.sorted).length)

const selectorColor = computed(() => {
  if (activeSelector.value === 'c12') return '#3B82F6'
  if (activeSelector.value === 'c25') return '#F59E0B'
  return null
})

const categories = [
  { key: 'geral', label: 'Geral' },
  { key: 'lixo', label: 'Lixo' },
  { key: 'c12', label: 'C12', color: '#3B82F6', bg: '#EFF6FF' },
  { key: 'c25', label: 'C25', color: '#F59E0B', bg: '#FEF3C7' }
]

const subCategories = Array.from({ length: 24 }, (_, i) => `T${i + 1}`)

function close() {
  const fallback = `/projects/${projectId.value}`
  if (window.history.state?.back) {
    router.back()
  } else {
    router.replace(fallback)
  }
}

function selectCategory(key: string, label: string) {
  if (key === 'c12' || key === 'c25') {
    activeSelector.value = activeSelector.value === key ? null : key as 'c12' | 'c25'
    return
  }
  sortCurrent(key, label)
}

function selectSub(sub: string) {
  if (!activeSelector.value) return
  sortCurrent(`${activeSelector.value}-${sub}`, sub)
}

function sortCurrent(category: string, label: string) {
  if (!currentImage.value) return
  currentImage.value.sorted = true
  currentImage.value.category = category

  flashLabel.value = label
  showFlash.value = true

  setTimeout(() => {
    showFlash.value = false
    goNext()
  }, 400)
}

function goNext() {
  if (currentIndex.value < images.value.length - 1) {
    slideDir.value = 'next'
    currentIndex.value++
  }
}

function onUndo() {
  if (currentIndex.value > 0) {
    slideDir.value = 'prev'
    currentIndex.value--
    currentImage.value.sorted = false
    currentImage.value.category = ''
  }
}
</script>

<template>
  <div class="viewer-page">

    <div class="viewer-toolbar">
      <button class="vt-btn" aria-label="Fechar" @click="close">
        <i class="pi pi-times"></i>
      </button>
      <div class="vt-right">
        <button class="vt-btn" aria-label="Desfazer" title="Desfazer" @click="onUndo">
          <i class="pi pi-undo"></i>
        </button>
        <button class="vt-btn" aria-label="Inverter" title="Inverter">
          <i class="pi pi-arrows-h"></i>
        </button>
        <button class="vt-btn" aria-label="Girar" title="Girar">
          <i class="pi pi-refresh"></i>
        </button>
        <button class="vt-btn vt-btn-danger" aria-label="Excluir" title="Excluir">
          <i class="pi pi-trash"></i>
        </button>
        <span v-if="groupFilter" class="vt-group">{{ groupFilter }}</span>
        <span class="vt-counter">{{ counter }}</span>
      </div>
    </div>

    <div class="viewer-image-area">
      <Transition :name="slideDir === 'next' ? 'slide-next' : 'slide-prev'" mode="out-in">
        <div class="image-frame" :key="currentIndex">
          <div class="image-placeholder" :style="{ background: currentImage?.color }">
            <i class="pi pi-image"></i>
            <span class="image-name">{{ currentImage?.label }}</span>
            <span v-if="currentImage?.sorted" class="image-badge">{{ currentImage.category }}</span>
          </div>
        </div>
      </Transition>

      <Transition name="flash">
        <div v-if="showFlash" class="flash-overlay">
          <span class="flash-text">{{ flashLabel }}</span>
        </div>
      </Transition>
    </div>

    <div class="sorting-keyboard">
      <div class="kb-categories">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="kb-cat"
          :class="{
            'kb-cat-active': activeSelector === cat.key,
            'kb-cat-lixo': cat.key === 'lixo'
          }"
          :style="activeSelector === cat.key ? { background: cat.bg, borderColor: cat.color, color: cat.color } : {}"
          @click="selectCategory(cat.key, cat.label)"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="kb-subs">
        <button
          v-for="sub in subCategories"
          :key="sub"
          class="kb-sub"
          :class="{ 'kb-sub-disabled': !activeSelector }"
          :style="activeSelector && selectorColor ? { borderColor: selectorColor } : {}"
          @click="selectSub(sub)"
        >
          {{ sub }}
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.viewer-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  background: #000;
}

/* --- Toolbar --- */
.viewer-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(var(--header-height) + var(--safe-area-top));
  padding: 0 var(--spacing-sm);
  padding-top: var(--safe-area-top);
  background: var(--color-bg-primary);
  flex-shrink: 0;
}

.vt-right {
  display: flex;
  align-items: center;
  gap: 2px;
}

.vt-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 15px;
  -webkit-tap-highlight-color: transparent;
}

.vt-btn:active {
  background: var(--color-border);
}

.vt-btn-danger {
  color: var(--color-error);
}

.vt-group {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: #3B82F6;
  background: rgba(59, 130, 246, 0.1);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
}

.vt-counter {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  min-width: 40px;
  text-align: center;
}

/* --- Image Area --- */
.viewer-image-area {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  background: #000;
  position: relative;
}

.image-frame {
  width: 100%;
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 4 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  color: rgba(255, 255, 255, 0.5);
  font-size: 32px;
  position: relative;
}

.image-name {
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.image-badge {
  position: absolute;
  bottom: var(--spacing-sm);
  right: var(--spacing-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
}

/* --- Slide Transitions --- */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.slide-next-enter-from {
  transform: translateX(40px);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-40px);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(40px);
  opacity: 0;
}

/* --- Sorting Keyboard --- */
.sorting-keyboard {
  background: var(--color-bg-secondary);
  padding: var(--spacing-sm) var(--spacing-sm) calc(var(--spacing-sm) + var(--safe-area-bottom));
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  border-top: 1px solid var(--color-border);
}

.kb-categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
}

.kb-cat {
  height: 42px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.kb-cat:active {
  background: var(--color-bg-secondary);
}

.kb-cat-lixo {
  color: var(--color-error);
  border-color: rgba(220, 38, 38, 0.3);
}

.kb-cat-active {
  font-weight: 600;
}

.kb-subs {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--spacing-xs);
}

.kb-sub {
  height: 38px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.15s ease;
}

.kb-sub:active {
  background: var(--color-bg-secondary);
}

.kb-sub-disabled {
  opacity: 0.4;
  pointer-events: none;
}

/* --- Flash Overlay --- */
.flash-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 5;
}

.flash-text {
  font-size: 48px;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
}

.flash-enter-active {
  transition: opacity 0.08s ease, transform 0.08s ease;
}

.flash-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.flash-enter-from {
  opacity: 0;
  transform: scale(0.7);
}

.flash-enter-to,
.flash-leave-from {
  opacity: 1;
  transform: scale(1);
}

.flash-leave-to {
  opacity: 0;
  transform: scale(1.2);
}
</style>
