import { ref, readonly } from 'vue'
import { processImage } from '@/services/imageProcessor'
import type { ProcessedImage } from '@/services/imageProcessor'
import { usePhotoStore } from './usePhotoStore'

const importing = ref(false)
const progress = ref(0)
const totalFiles = ref(0)
const processedFiles = ref(0)
const currentFileName = ref('')

export function usePhotoImport() {
  const { addToInbox } = usePhotoStore()

  function selectFiles(): Promise<File[]> {
    return new Promise((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = true
      input.accept = 'image/*'
      input.onchange = () => {
        const files = input.files ? Array.from(input.files) : []
        resolve(files)
      }
      input.click()
    })
  }

  async function importPhotos(projectId: number): Promise<number> {
    const files = await selectFiles()
    if (files.length === 0) return 0

    importing.value = true
    progress.value = 0
    totalFiles.value = files.length
    processedFiles.value = 0
    currentFileName.value = ''

    const results: ProcessedImage[] = []

    for (let i = 0; i < files.length; i++) {
      currentFileName.value = files[i].name
      try {
        const processed = await processImage(files[i])
        results.push(processed)
      } catch {
        // skip unreadable files
      }

      processedFiles.value = i + 1
      progress.value = Math.round(((i + 1) / files.length) * 100)

      // yield to keep UI responsive
      await new Promise(r => requestAnimationFrame(r))
    }

    addToInbox(projectId, results)

    importing.value = false
    return results.length
  }

  return {
    importing: readonly(importing),
    progress: readonly(progress),
    totalFiles: readonly(totalFiles),
    processedFiles: readonly(processedFiles),
    currentFileName: readonly(currentFileName),
    importPhotos
  }
}
