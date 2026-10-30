import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

export interface PageAction {
  icon: string
  label: string
  handler?: () => void
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    isHome?: boolean
    fullscreen?: boolean
    fallbackRoute?: string
    actions?: PageAction[]
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home/HomePage.vue'),
    meta: {
      title: 'Projects',
      isHome: true
    }
  },
  {
    path: '/projects/:id',
    name: 'project-details',
    component: () => import('@/pages/ProjectDetails/ProjectDetailsPage.vue'),
    meta: {
      title: 'Projeto',
      fallbackRoute: '/'
    }
  },
  {
    path: '/projects/:id/review',
    name: 'project-review',
    component: () => import('@/pages/ProjectReview/ProjectReviewPage.vue'),
    meta: {
      title: 'Review',
      fallbackRoute: '/'
    }
  },
  {
    path: '/projects/:id/sort',
    name: 'photo-sort',
    component: () => import('@/pages/PhotoViewer/PhotoViewerPage.vue'),
    meta: {
      title: 'Sorting',
      fullscreen: true,
      fallbackRoute: '/'
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/pages/Demo/DemoPage.vue'),
    meta: {
      title: 'Demonstração',
      fallbackRoute: '/',
      actions: [
        { icon: 'pi pi-search', label: 'Pesquisar' },
        { icon: 'pi pi-filter', label: 'Filtrar' },
        { icon: 'pi pi-ellipsis-v', label: 'Mais opções' }
      ]
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/pages/Settings/SettingsPage.vue'),
    meta: {
      title: 'Definições',
      fallbackRoute: '/'
    }
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
