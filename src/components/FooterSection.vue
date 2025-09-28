<template>
  <footer class="bg-gray-900 dark:bg-black text-white py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Chisomo Psyelera
          </div>
          <p class="text-gray-400 leading-relaxed">
            Passionate developer creating innovative digital solutions with modern web technologies.
          </p>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              class="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all group"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
            >
              <Icon :icon="social.icon" class="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <a 
                :href="link.href" 
                class="text-gray-400 hover:text-white transition-colors"
                @click.prevent="scrollToSection(link.section)"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Services</h3>
          <ul class="space-y-2">
            <li v-for="service in services" :key="service">
              <span class="text-gray-400">{{ service }}</span>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Get In Touch</h3>
          <div class="space-y-3">
            <div class="flex items-center text-gray-400">
              <Icon icon="lucide:mail" class="w-5 h-5 mr-3 text-blue-400" />
              <a href="mailto:contact@evaniewares.com" class="hover:text-white transition-colors">
                evaniewares@gmail.com
              </a>
            </div>
            <div class="flex items-center text-gray-400">
              <Icon icon="lucide:phone" class="w-5 h-5 mr-3 text-blue-400" />
              <a href="tel:+15551234567" class="hover:text-white transition-colors">
                +265 994 142 773
              </a>
            </div>
            <div class="flex items-center text-gray-400">
              <Icon icon="lucide:map-pin" class="w-5 h-5 mr-3 text-blue-400" />
              <span>Liwonde, Machinga, Malawi</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Subscription -->
      <div class="mt-12 pt-8 border-t border-gray-800">
        <div class="max-w-2xl mx-auto text-center">
          <h3 class="text-xl font-semibold mb-4">Stay Updated</h3>
          <p class="text-gray-400 mb-6">
            Subscribe to my newsletter for the latest updates on projects and tech insights.
          </p>
          <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
              class="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            />
            <Button
              type="submit"
              :disabled="isSubscribing"
              class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg transition-all"
            >
              <Icon 
                :icon="isSubscribing ? 'lucide:loader-2' : 'lucide:send'" 
                class="w-4 h-4 mr-2"
                :class="{ 'animate-spin': isSubscribing }"
              />
              {{ isSubscribing ? 'Subscribing...' : 'Subscribe' }}
            </Button>
          </form>
          
          <!-- Success Message -->
          <div 
            v-if="showSubscribeSuccess"
            class="mt-4 text-green-400 font-medium"
          >
            <Icon icon="lucide:check-circle" class="w-5 h-5 inline mr-2" />
            Successfully subscribed! Thank you for joining.
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-400 mb-4 md:mb-0">
            <p>&copy; {{ currentYear }} PsyByte Labs. All rights reserved.</p>
          </div>
          <div class="flex space-x-6 text-sm">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      <!-- Back to Top Button -->
      <div class="fixed bottom-8 right-8 z-40">
        <Button
          v-show="showBackToTop"
          @click="scrollToTop"
          class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-lg transition-all transform hover:scale-110"
          size="sm"
        >
          <Icon icon="lucide:arrow-up" class="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'

const email = ref('')
const isSubscribing = ref(false)
const showSubscribeSuccess = ref(false)
const showBackToTop = ref(false)

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  { name: 'GitHub', icon: 'lucide:github', url: 'https://github.com/EvanieWares' },
  { name: 'LinkedIn', icon: 'lucide:linkedin', url: 'https://linkedin.com/in/chisopsyelera' },
  { name: 'Twitter', icon: 'lucide:twitter', url: 'https://twitter.com/EvanieWares' },
  { name: 'Instagram', icon: 'lucide:instagram', url: 'https://instagram.com/psybytelabs' }
]

const quickLinks = [
  { name: 'Home', href: '#hero', section: 'hero' },
  { name: 'About', href: '#about', section: 'about' },
  { name: 'Skills', href: '#skills', section: 'skills' },
  { name: 'Projects', href: '#projects', section: 'projects' },
  { name: 'Contact', href: '#contact', section: 'contact' }
]

const services = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'API Development',
  'Consulting'
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

const subscribeNewsletter = async () => {
  isSubscribing.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    email.value = ''
    showSubscribeSuccess.value = true
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      showSubscribeSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('Error subscribing:', error)
  } finally {
    isSubscribing.value = false
  }
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 500
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>