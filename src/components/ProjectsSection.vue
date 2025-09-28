<template>
  <section id="projects" class="py-20 bg-gray-50 dark:bg-slate-800">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and passion for development.
        </p>
      </div>

      <!-- Project Filter -->
      <div class="flex justify-center mb-12">
        <div class="flex flex-wrap gap-2 p-1 bg-white dark:bg-slate-900 rounded-lg shadow-lg">
          <Button
            v-for="category in categories"
            :key="category"
            :variant="selectedCategory === category ? 'default' : 'ghost'"
            @click="selectedCategory = category"
            class="px-6 py-2 transition-all"
            :class="{
              'bg-gradient-to-r from-blue-500 to-purple-600 text-white': selectedCategory === category,
              'hover:bg-gray-100 dark:hover:bg-slate-700': selectedCategory !== category
            }"
          >
            {{ category }}
          </Button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="group relative bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
        >
          <!-- Project Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover object-top transition-transform group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <!-- Project Links Overlay -->
            <div class="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                class="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                @click="openProject(project.demoUrl)"
              >
                <Icon icon="lucide:external-link" class="w-4 h-4 mr-1" />
                Demo
              </Button>
              <Button
                size="sm"
                variant="outline"
                class="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                @click="openProject(project.githubUrl)"
              >
                <Icon icon="lucide:github" class="w-4 h-4 mr-1" />
                Code
              </Button>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {{ project.title }}
              </h3>
              <div class="flex flex-wrap gap-1 ml-2">
                <Badge 
                  v-for="category in project.categories" 
                  :key="category"
                  :variant="getCategoryVariant(category)" 
                  class="text-xs"
                >
                  {{ category }}
                </Badge>
              </div>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {{ project.description }}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-md"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Project Stats -->
            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1">
                  <Icon icon="lucide:star" class="w-4 h-4" />
                  <!-- {{ project.stars }} -->
                </span>
                <span class="flex items-center gap-1">
                  <Icon icon="lucide:git-fork" class="w-4 h-4" />
                  <!-- {{ project.forks }} -->
                </span>
              </div>
              <span>{{ project.year }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="text-center mt-12" v-if="hasMoreProjects">
        <Button
          variant="outline"
          size="lg"
          @click="loadMoreProjects"
          class="px-8 py-3 hover:bg-blue-50 dark:hover:bg-slate-700"
        >
          <Icon icon="lucide:plus" class="w-4 h-4 mr-2" />
          Load More Projects
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Project {
  id: number
  title: string
  description: string
  image: string
  categories: string[]
  technologies: string[]
  demoUrl: string
  githubUrl: string
  stars: number
  forks: number
  year: string
}

const selectedCategory = ref('All')
const visibleProjectsCount = ref(6)

const categories = ['All', 'Web App', 'Mobile', 'API', 'Open Source']

const projects: Project[] = [
  {
    id: 1,
    title: 'Personal Finance Management Tool',
    description: 'A full-stack application that helps users manage their personal finances by tracking transactions, creating budgets, and generating financial summaries.',
    image: 'https://github.com/user-attachments/assets/f79a9e92-5474-419f-a58c-2e5d5f2a7f48',
    categories: ['Web App', 'API'],
    technologies: ['Vue.js', 'FastAPI', 'PyMongo', 'Vuetify', 'JWT', 'Axios'],
    demoUrl: 'https://github.com/Brendah90/personal-finance-management-tool',
    githubUrl: 'https://github.com/Brendah90/personal-finance-management-tool',
    stars: 78,
    forks: 21,
    year: '2024'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'An AI-powered Zapier automation that triggers every morning to read tasks from ClickUp, Google Calendar, and Microsoft Calendar, then sends clients a well-crafted WhatsApp message with daily tasks and smart priority recommendations.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop',
    categories: ['API'],
    technologies: ['Zapier', 'ClickUp API', 'Google Calendar API', 'Microsoft Graph API', 'WhatsApp API'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example',
    stars: 195,
    forks: 47,
    year: '2024'
  },
  {
    id: 3,
    title: 'ClassEase',
    description: 'A comprehensive mobile app that streamlines teachers\' assessment process. Features educational resources, plus a community section for collaboration and mutual assistance.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=240&fit=crop',
    categories: ['Mobile'],
    technologies: ['Jetpack Compose', 'Room Database', 'Firebase', 'Hilt', 'Android'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example',
    stars: 124,
    forks: 38,
    year: '2024'
  },
  {
    id: 4,
    title: 'School Data Sync',
    description: 'An Android app for headteachers to submit monthly school data including staff returns, enrollment, buildings, and furniture inventories. Built with modern Android architecture.',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=240&fit=crop',
    categories: ['Mobile'],
    technologies: ['Jetpack Compose', 'Firebase', 'Hilt', 'Android'],
    demoUrl: 'https://github.com/EvanieWares/sds',
    githubUrl: 'https://github.com/EvanieWares/sds',
    stars: 89,
    forks: 24,
    year: '2024'
  },
  {
    id: 5,
    title: 'School Data Sync Portal',
    description: 'A web application for district and zone admins to retrieve and analyze school data submitted by headteachers. Features data visualization, Excel export, and comprehensive reporting.',
    image: 'https://private-user-images.githubusercontent.com/59230534/494848435-fb74c23b-f61c-48c9-a225-c05ea2b1ab39.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTkwNTczOTQsIm5iZiI6MTc1OTA1NzA5NCwicGF0aCI6Ii81OTIzMDUzNC80OTQ4NDg0MzUtZmI3NGMyM2ItZjYxYy00OGM5LWEyMjUtYzA1ZWEyYjFhYjM5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA5MjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwOTI4VDEwNTgxNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWUwYWUzM2I0MTM1ODZhMGIyYzM3NDAzY2NmNmE1YTI1ZTFlYjhmZGMzMzE0MzMwZjhmNTI4MjJlZmZkZGE5ZjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.rGAw8ZQbg2MfLkZBnPJBptCnxAmvU1PPXiiH8w1aP68',
    categories: ['Web App'],
    technologies: ['Vue.js', 'Vuetify', 'XLSX', 'Firebase', 'Sass', 'Pinia'],
    demoUrl: 'https://github.com/EvanieWares/sds-portal',
    githubUrl: 'https://github.com/EvanieWares/sds-portal',
    stars: 156,
    forks: 42,
    year: '2025'
  },
  {
    id: 6,
    title: 'Sivi Meka',
    description: 'A modern, expressive Vue.js web application for building professional CVs with style. Uses Make.com workflow to create CVs tailored to job descriptions.',
    image: 'https://github.com/EvanieWares/sivimeka/blob/main/screenshots/desktop-cv-form-step1.png?raw=true',
    categories: ['Web App'],
    technologies: ['Vue.js', 'Make.com', 'Tailwind CSS', 'JavaScript'],
    demoUrl: 'https://evaniewares.github.io/sivimeka/',
    githubUrl: 'https://github.com/EvanieWares/sivimeka',
    stars: 15,
    forks: 3,
    year: '2025'
  }
]

const filteredProjects = computed(() => {
  const filtered = selectedCategory.value === 'All' 
    ? projects 
    : projects.filter(project => project.categories.includes(selectedCategory.value))
  
  return filtered.slice(0, visibleProjectsCount.value)
})

const hasMoreProjects = computed(() => {
  const totalFiltered = selectedCategory.value === 'All' 
    ? projects.length 
    : projects.filter(project => project.categories.includes(selectedCategory.value)).length
  
  return visibleProjectsCount.value < totalFiltered
})

const getCategoryVariant = (category: string): "default" | "destructive" | "outline" | "secondary" => {
  const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
    'Web App': 'default',
    'Mobile': 'secondary',
    'API': 'outline',
    'Open Source': 'destructive'
  }
  return variants[category] || 'default'
}

const openProject = (url: string) => {
  window.open(url, '_blank')
}

const loadMoreProjects = () => {
  visibleProjectsCount.value += 3
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>