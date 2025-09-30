<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{
      'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg': isScrolled,
      'bg-transparent': !isScrolled
    }"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <a 
            href="#" 
            class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            @click="scrollToTop"
          >
            EW
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group py-2"
            :class="{ 'text-blue-600 dark:text-blue-400': activeSection === item.section }"
            @click.prevent="scrollToSection(item.section)"
          >
            {{ item.name }}
            <span 
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all group-hover:w-full"
              :class="{ 'w-full': activeSection === item.section }"
            ></span>
          </a>
          
          <!-- Terminal Button -->
          <Button
            variant="outline"
            size="sm"
            @click="goToTerminal"
            class="border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-black transition-colors font-mono text-xs animate-pulse"
          >
            <Icon icon="lucide:terminal" class="w-4 h-4 mr-1" />
            TERMINAL
          </Button>
        </div>

        <!-- Theme Toggle & Mobile Menu Button -->
        <div class="flex items-center space-x-4">
          <!-- Theme Toggle -->
          <!-- <Button
            variant="ghost"
            size="sm"
            @click="toggleTheme"
            class="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"
          >
            <Icon 
              :icon="isDark ? 'lucide:sun' : 'lucide:moon'" 
              class="w-5 h-5 text-gray-700 dark:text-gray-300" 
            />
          </Button> -->

          <!-- Mobile Menu Button -->
          <Button
            variant="ghost"
            size="sm"
            class="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"
            @click="toggleMobileMenu"
          >
            <Icon 
              :icon="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'" 
              class="w-6 h-6 text-gray-700 dark:text-gray-300" 
            />
          </Button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div 
        class="md:hidden overflow-hidden transition-all duration-300"
        :class="{
          'max-h-64 opacity-100': isMobileMenuOpen,
          'max-h-0 opacity-0': !isMobileMenuOpen
        }"
      >
        <div class="py-4 space-y-2 border-t border-gray-200 dark:border-slate-700">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            class="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-slate-800': activeSection === item.section }"
            @click.prevent="handleMobileNavClick(item.section)"
          >
            {{ item.name }}
          </a>
          
          <!-- Mobile Terminal Button -->
          <button
            @click="goToTerminal"
            class="w-full text-left px-4 py-3 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors font-mono text-sm flex items-center"
          >
            <Icon icon="lucide:terminal" class="w-4 h-4 mr-2" />
            TERMINAL MODE
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'

const router = useRouter()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')
const isDark = ref(false)

const navItems = [
  { name: 'Home', href: '#hero', section: 'hero' },
  { name: 'About', href: '#about', section: 'about' },
  { name: 'Skills', href: '#skills', section: 'skills' },
  { name: 'Projects', href: '#projects', section: 'projects' },
  { name: 'Contact', href: '#contact', section: 'contact' }
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId === 'hero' ? '' : sectionId)
  if (element || sectionId === 'hero') {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleMobileNavClick = (sectionId: string) => {
  scrollToSection(sectionId)
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const goToTerminal = () => {
  router.push('/terminal')
}

// const toggleTheme = () => {
//   isDark.value = !isDark.value
//   document.documentElement.classList.toggle('dark', isDark.value)
//   localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
// }

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Update active section based on scroll position
  const sections = navItems.map(item => item.section)
  const scrollPosition = window.scrollY + 100

  // If we're at the very top, always show hero as active
  if (window.scrollY < 100) {
    activeSection.value = 'hero'
    return
  }

  // Check each section to find which one is currently in view
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (!section) continue
    
    const element = document.getElementById(section)
    
    if (element) {
      const offsetTop = element.offsetTop
      if (scrollPosition >= offsetTop) {
        activeSection.value = section
        break
      }
    } else if (section === 'hero') {
      // For hero section, check if we're near the top
      if (scrollPosition <= 100) {
        activeSection.value = 'hero'
        break
      }
    }
  }
}

const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  isDark.value = savedTheme ? savedTheme === 'dark' : prefersDark
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  initializeTheme()
  window.addEventListener('scroll', handleScroll)
  
  // Close mobile menu on outside click
  document.addEventListener('click', (event) => {
    const nav = document.querySelector('nav')
    if (nav && !nav.contains(event.target as Node)) {
      isMobileMenuOpen.value = false
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>