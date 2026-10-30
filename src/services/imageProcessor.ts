const MAX_SIZE = 1024
const JPEG_QUALITY = 0.85

export interface ProcessedImage {
  id: string
  name: string
  blob: Blob
  url: string
  width: number
  height: number
}

export async function processImage(file: File): Promise<ProcessedImage> {
  const bitmap = await createImageBitmap(file)
  const { width: ow, height: oh } = bitmap

  let w = ow
  let h = oh
  if (w > MAX_SIZE || h > MAX_SIZE) {
    if (w >= h) {
      h = Math.round((h / w) * MAX_SIZE)
      w = MAX_SIZE
    } else {
      w = Math.round((w / h) * MAX_SIZE)
      h = MAX_SIZE
    }
  }

  const canvas = new OffscreenCanvas(w, h)
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()

  const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: JPEG_QUALITY })

  const baseName = file.name.replace(/\.[^.]+$/, '')
  const id = `${baseName}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

  return {
    id,
    name: `${baseName}.jpg`,
    blob,
    url: URL.createObjectURL(blob),
    width: w,
    height: h
  }
}

export function revokeImageUrl(url: string) {
  URL.revokeObjectURL(url)
}
