<template>
  <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="i in 20" 
        :key="i"
        class="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-float"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (3 + Math.random() * 4) + 's'
        }"
      />
    </div>

    <div class="container mx-auto px-4 text-center z-10">
      <div 
        class="animate-fade-in-up opacity-0"
        style="animation-delay: 0.2s"
      >
        <Avatar class="w-32 h-32 mx-auto mb-8 ring-4 ring-blue-500/20 transition-transform hover:scale-105">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Profile" />
          <AvatarFallback class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            EW
          </AvatarFallback>
        </Avatar>
      </div>

      <div 
        class="animate-fade-in-up opacity-0"
        style="animation-delay: 0.4s"
      >
        <h1 class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {{ name }}
        </h1>
        <div class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2">
          <span class="inline-block animate-typewriter">{{ currentTitle }}</span>
          <span class="animate-blink">|</span>
        </div>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          {{ description }}
        </p>
      </div>

      <div 
        class="animate-fade-in-up opacity-0 flex justify-center gap-4"
        style="animation-delay: 0.6s"
      >
        <Button 
          class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 transition-all transform hover:scale-105"
          @click="scrollToSection('projects')"
        >
          <Icon icon="lucide:eye" class="mr-2" />
          View My Work
        </Button>
        <Button 
          variant="outline" 
          class="px-8 py-3 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all transform hover:scale-105"
          @click="scrollToSection('contact')"
        >
          <Icon icon="lucide:mail" class="mr-2" />
          Get In Touch
        </Button>
      </div>

      <!-- Social links -->
      <div 
        class="animate-fade-in-up opacity-0 flex justify-center gap-4 mt-8"
        style="animation-delay: 0.8s"
      >
        <a 
          v-for="social in socials" 
          :key="social.name"
          :href="social.url"
          class="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover:-translate-y-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon :icon="social.icon" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <Icon icon="lucide:chevron-down" class="w-6 h-6 text-gray-500" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const name = ref('Evanie Wares')
const titles = ['Full Stack Developer', 'UI/UX Designer', 'Creative Technologist', 'Problem Solver']
const currentTitle = ref('')
const currentTitleIndex = ref(0)
const description = ref('Passionate about creating innovative digital solutions that make a difference. I specialize in modern web technologies and user-centered design.')

const socials = [
  { name: 'GitHub', icon: 'lucide:github', url: 'https://github.com/EvanieWares' },
  { name: 'LinkedIn', icon: 'lucide:linkedin', url: 'https://linkedin.com/in/chisopsyelera' },
  { name: 'Twitter', icon: 'lucide:twitter', url: 'https://twitter.com/EvanieWares' },
  { name: 'Instagram', icon: 'lucide:instagram', url: 'https://instagram.com/psybytelabs' }
]

const typewriterEffect = () => {
  const title = titles[currentTitleIndex.value]
  if (!title) return
  
  let charIndex = 0
  currentTitle.value = ''

  const typeChar = () => {
    if (charIndex < title.length) {
      currentTitle.value += title.charAt(charIndex)
      charIndex++
      setTimeout(typeChar, 100)
    } else {
      setTimeout(() => {
        deleteChar()
      }, 2000)
    }
  }

  const deleteChar = () => {
    if (currentTitle.value.length > 0) {
      currentTitle.value = currentTitle.value.slice(0, -1)
      setTimeout(deleteChar, 50)
    } else {
      currentTitleIndex.value = (currentTitleIndex.value + 1) % titles.length
      setTimeout(typewriterEffect, 500)
    }
  }

  typeChar()
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  element?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  typewriterEffect()
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-float {
  animation: float infinite ease-in-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-typewriter {
  overflow: hidden;
  white-space: nowrap;
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>