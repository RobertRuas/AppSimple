import { ref } from 'vue'

export interface Project {
  id: number
  name: string
  shortName: string
  category: string
  entity: string
  photos: number
  status: string
  photosToSort: number
  photosSorted: number
  trash: number
  inspectionRange: string
}

const projects = ref<Project[]>([
  { id: 1, name: 'Eonien WEA02 FA', shortName: 'WEA02 FA', category: 'Wind Farm', entity: 'Eonien', photos: 8, status: 'In Progress', photosToSort: 3, photosSorted: 5, trash: 0, inspectionRange: 'T1–T12' },
  { id: 2, name: 'Eonien WEA02 TA', shortName: 'WEA02 TA', category: 'Wind Farm', entity: 'Eonien', photos: 6, status: 'In Progress', photosToSort: 2, photosSorted: 4, trash: 0, inspectionRange: 'T1–T8' },
  { id: 3, name: 'Eonien WEA02 Retrofit', shortName: 'WEA02 Retrofit', category: 'Wind Farm', entity: 'Eonien', photos: 12, status: 'Completed', photosToSort: 0, photosSorted: 12, trash: 0, inspectionRange: 'T1–T24' },
  { id: 4, name: 'Elster ELS08 FA', shortName: 'ELS08 FA', category: 'Wind Farm', entity: 'Elster', photos: 10, status: 'In Progress', photosToSort: 4, photosSorted: 6, trash: 0, inspectionRange: 'T1–T16' },
  { id: 5, name: 'Elster ELS08 TA', shortName: 'ELS08 TA', category: 'Wind Farm', entity: 'Elster', photos: 5, status: 'Completed', photosToSort: 0, photosSorted: 5, trash: 0, inspectionRange: 'T1–T10' }
])

export function useProjects() {
  function getProject(id: number) {
    return projects.value.find(p => p.id === id)
  }

  return { projects, getProject }
}
