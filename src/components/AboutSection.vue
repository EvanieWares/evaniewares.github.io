<template>
  <section id="about" class="py-20 bg-white dark:bg-slate-900">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">About Me</h2>
          <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <div class="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face" 
                alt="About me" 
                class="rounded-2xl shadow-2xl w-full object-cover transition-transform hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-600/20 rounded-2xl"></div>
            </div>
          </div>

          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Passionate Developer & Designer
              </h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                I'm a full-stack developer with a passion for creating beautiful, functional, and 
                user-centered digital experiences. With over {{ yearsOfExperience }} years of experience 
                in web development, I specialize in modern JavaScript frameworks, responsive design, 
                and clean, maintainable code.
              </p>
            </div>

            <div>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open source projects, or sharing knowledge with the developer community. I believe 
                in continuous learning and staying up-to-date with the latest industry trends.
              </p>
            </div>

            <!-- Skills Progress Bars -->
            <div class="space-y-6">
              <h4 class="text-xl font-semibold text-gray-900 dark:text-white">Core Skills</h4>
              <div 
                v-for="skill in skills" 
                :key="skill.name"
                class="space-y-2"
              >
                <div class="flex justify-between">
                  <span class="text-gray-700 dark:text-gray-300 font-medium">{{ skill.name }}</span>
                  <span class="text-gray-500 dark:text-gray-400">{{ skill.level }}%</span>
                </div>
                <Progress 
                  :model-value="animatedSkills[skill.name] || 0" 
                  class="h-2"
                />
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 pt-8">
              <div 
                v-for="stat in stats" 
                :key="stat.label"
                class="text-center p-4 rounded-lg bg-gray-50 dark:bg-slate-800"
              >
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {{ animatedStats[stat.label] || 0 }}{{ stat.suffix }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Progress } from '@/components/ui/progress'

const yearsOfExperience = ref(5)
const target = ref()
const animatedSkills = reactive<Record<string, number>>({})
const animatedStats = reactive<Record<string, number>>({})

const skills = [
  { name: 'JavaScript/TypeScript', level: 95 },
  { name: 'Vue.js/React', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'UI/UX Design', level: 80 },
  { name: 'Database Design', level: 75 },
]

const stats = [
  { label: 'Projects', value: 50, suffix: '+' },
  { label: 'Clients', value: 25, suffix: '+' },
  { label: 'Experience', value: 5, suffix: 'y' },
]

const animateNumber = (
  targetValue: number, 
  callback: (value: number) => void, 
  duration: number = 2000
) => {
  const startTime = Date.now()
  const startValue = 0
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = Math.round(startValue + (targetValue - startValue) * easeOutQuart)
    
    callback(currentValue)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  animate()
}

const { stop } = useIntersectionObserver(
  target,
  ([entry]) => {
    if (entry?.isIntersecting) {
      // Animate skills
      skills.forEach((skill, index) => {
        setTimeout(() => {
          animateNumber(skill.level, (value) => {
            animatedSkills[skill.name] = value
          })
        }, index * 200)
      })
      
      // Animate stats
      stats.forEach((stat, index) => {
        setTimeout(() => {
          animateNumber(stat.value, (value) => {
            animatedStats[stat.label] = value
          })
        }, index * 300)
      })
      
      stop()
    }
  },
  { threshold: 0.3 }
)
</script>