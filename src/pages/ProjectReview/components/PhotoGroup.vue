<script setup lang="ts">
import { ref } from 'vue'
import PhotoThumb from './PhotoThumb.vue'

export interface Photo {
  id: string
  color: string
}

const props = defineProps<{
  name: string
  photos: Photo[]
}>()

const emit = defineEmits<{
  reorder: [photos: Photo[]]
  'photo-click': [groupName: string, photoIndex: number]
}>()

const containerRef = ref<HTMLElement>()
const dragActive = ref(false)

interface DragState {
  index: number
  targetIndex: number
  startX: number
  element: HTMLElement
  wrappers: HTMLElement[]
  centers: number[]
  step: number
}

let pId: number | null = null
let pStartX = 0
let pStartY = 0
let pEl: HTMLElement | null = null
let pIdx = -1
let decided = false
let drag: DragState | null = null

function onDown(e: PointerEvent, index: number) {
  pId = e.pointerId
  pStartX = e.clientX
  pStartY = e.clientY
  pEl = e.currentTarget as HTMLElement
  pIdx = index
  decided = false
}

function onMove(e: PointerEvent) {
  if (pId === null || !pEl) return

  if (!decided && !drag) {
    const dx = Math.abs(e.clientX - pStartX)
    const dy = Math.abs(e.clientY - pStartY)

    if (dy > 6) { reset(); return }
    if (dx < 6) return

    decided = true
    try { pEl.setPointerCapture(pId) } catch { reset(); return }

    const container = containerRef.value!
    const wrappers = Array.from(container.querySelectorAll('.photo-wrapper')) as HTMLElement[]
    const gap = parseFloat(getComputedStyle(container).gap) || 0
    const centers = wrappers.map(w => {
      const r = w.getBoundingClientRect()
      return r.left + r.width / 2
    })

    drag = {
      index: pIdx,
      targetIndex: pIdx,
      startX: e.clientX,
      element: pEl,
      wrappers,
      centers,
      step: wrappers[0].offsetWidth + gap
    }

    dragActive.value = true
    pEl.classList.add('is-dragging')
  }

  if (!drag) return
  e.preventDefault()

  const dx = e.clientX - drag.startX
  drag.element.style.transform = `translateX(${dx}px) scale(1.06)`

  const draggedCenter = drag.centers[drag.index] + dx
  let closest = drag.index
  let minDist = Infinity
  for (let i = 0; i < drag.centers.length; i++) {
    const dist = Math.abs(draggedCenter - drag.centers[i])
    if (dist < minDist) { minDist = dist; closest = i }
  }

  if (closest !== drag.targetIndex) {
    drag.targetIndex = closest
    const from = drag.index
    const to = closest

    drag.wrappers.forEach((el, i) => {
      if (i === from) return
      el.style.transition = 'transform 0.15s ease'
      el.classList.remove('drop-left', 'drop-right')

      if (from < to && i > from && i <= to) {
        el.style.transform = `translateX(${-drag!.step}px)`
        if (i === to) el.classList.add('drop-left')
      } else if (from > to && i >= to && i < from) {
        el.style.transform = `translateX(${drag!.step}px)`
        if (i === to) el.classList.add('drop-right')
      } else {
        el.style.transform = ''
      }
    })
  }
}

function onUp() {
  if (drag) {
    const from = drag.index
    const to = drag.targetIndex

    drag.wrappers.forEach(el => {
      el.style.transform = ''
      el.style.transition = ''
      el.classList.remove('is-dragging', 'drop-left', 'drop-right')
    })

    if (from !== to) {
      const reordered = [...props.photos]
      const [item] = reordered.splice(from, 1)
      reordered.splice(to, 0, item)
      emit('reorder', reordered)
    }
  } else if (pIdx >= 0 && !decided) {
    emit('photo-click', props.name, pIdx)
  }

  reset()
}

function reset() {
  drag = null
  dragActive.value = false
  pId = null
  pEl = null
  pIdx = -1
  decided = false
}
</script>

<template>
  <div class="photo-group">
    <div class="group-label">
      <span class="group-name">{{ name }}</span>
      <span class="group-count">{{ photos.length }}</span>
    </div>
    <div class="group-photos" ref="containerRef">
      <div
        v-for="(photo, index) in photos"
        :key="photo.id"
        class="photo-wrapper"
        @pointerdown="onDown($event, index)"
        @pointermove="onMove"
        @pointerup="onUp"
        @pointercancel="onUp"
      >
        <PhotoThumb :color="photo.color" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.group-label {
  display: flex;
  align-items: center;
  gap: 4px;
}

.group-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.group-count {
  font-size: 10px;
  color: var(--color-text-secondary);
  opacity: 0.7;
}

.group-photos {
  display: flex;
  gap: 4px;
  position: relative;
}

.photo-wrapper {
  flex: 1 1 0;
  min-width: 0;
  position: relative;
  touch-action: pan-y;
  cursor: grab;
}

.photo-wrapper.is-dragging {
  z-index: 10;
  cursor: grabbing;
  touch-action: none;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25));
}

.photo-wrapper.drop-left::before,
.photo-wrapper.drop-right::after {
  content: '';
  position: absolute;
  top: 2px;
  bottom: 2px;
  width: 3px;
  background: #10B981;
  border-radius: 2px;
  z-index: 5;
}

.photo-wrapper.drop-left::before {
  left: -4px;
}

.photo-wrapper.drop-right::after {
  right: -4px;
}
</style>
