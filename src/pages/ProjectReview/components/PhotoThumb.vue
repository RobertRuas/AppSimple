<script setup lang="ts">
defineProps<{
  color: string
}>()
</script>

<template>
  <div class="photo-thumb">
    <div class="thumb-image" :style="{ background: color }">
      <i class="pi pi-image"></i>
    </div>
  </div>
</template>

<style scoped>
.photo-thumb {
  width: 100%;
  aspect-ratio: 1;
  user-select: none;
}

.thumb-image {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}
</style>
