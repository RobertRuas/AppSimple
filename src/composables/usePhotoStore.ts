import { reactive } from 'vue'
import type { ProcessedImage } from '@/services/imageProcessor'

export interface StoredPhoto {
  id: string
  name: string
  url: string
  width: number
  height: number
  category: string
  sorted: boolean
}

interface ProjectPhotos {
  inbox: StoredPhoto[]
}

const store = reactive<Record<number, ProjectPhotos>>({})

function ensureProject(projectId: number): ProjectPhotos {
  if (!store[projectId]) {
    store[projectId] = { inbox: [] }
  }
  return store[projectId]
}

export function usePhotoStore() {
  function getInbox(projectId: number): StoredPhoto[] {
    return ensureProject(projectId).inbox
  }

  function addToInbox(projectId: number, images: ProcessedImage[]) {
    const photos: StoredPhoto[] = images.map(img => ({
      id: img.id,
      name: img.name,
      url: img.url,
      width: img.width,
      height: img.height,
      category: '',
      sorted: false
    }))
    ensureProject(projectId).inbox.push(...photos)
  }

  function getInboxCount(projectId: number): number {
    return ensureProject(projectId).inbox.length
  }

  return { getInbox, addToInbox, getInboxCount }
}
