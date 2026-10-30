import { reactive, watch } from 'vue'

export interface AppSettings {
  userName: string
  email: string
  language: string
  notifications: boolean
  soundEnabled: boolean
  autoSave: boolean
  itemsPerPage: number
}

const STORAGE_KEY = 'app-settings'

const defaults: AppSettings = {
  userName: '',
  email: '',
  language: 'pt',
  notifications: true,
  soundEnabled: false,
  autoSave: true,
  itemsPerPage: 10
}

function load(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaults, ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return { ...defaults }
}

const settings = reactive<AppSettings>(load())

watch(settings, (val) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  } catch { /* ignore */ }
}, { deep: true })

export function useSettings() {
  function reset() {
    Object.assign(settings, { ...defaults })
  }
  return { settings, reset }
}
