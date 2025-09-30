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
            <div class="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
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
import { projects } from '@/data/portfolio'

const selectedCategory = ref('All')
const visibleProjectsCount = ref(6)

const categories = ['All', 'Web App', 'Mobile', 'API', 'Open Source']

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