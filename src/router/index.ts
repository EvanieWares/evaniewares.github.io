import { createRouter, createWebHistory } from 'vue-router'
import Portfolio from '@/App.vue'
import Terminal from '@/components/Terminal.vue'

const routes = [
  {
    path: '/',
    name: 'Portfolio',
    component: Portfolio
  },
  {
    path: '/terminal',
    name: 'Terminal',
    component: Terminal
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router