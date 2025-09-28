<template>
  <section class="py-20 bg-gray-50 dark:bg-slate-800">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">What Clients Say</h2>
          <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Trusted by amazing people and companies around the world.
          </p>
        </div>

        <!-- Testimonials Carousel -->
        <div class="relative">
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div
                v-for="testimonial in testimonials"
                :key="testimonial.id"
                class="w-full flex-shrink-0 px-4"
              >
                <div class="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
                  <div class="text-center">
                    <!-- Quote Icon -->
                    <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon icon="lucide:quote" class="w-8 h-8 text-white" />
                    </div>

                    <!-- Testimonial Text -->
                    <blockquote class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                      "{{ testimonial.content }}"
                    </blockquote>

                    <!-- Rating -->
                    <div class="flex justify-center mb-6">
                      <div class="flex space-x-1">
                        <Icon
                          v-for="star in 5"
                          :key="star"
                          icon="lucide:star"
                          class="w-5 h-5 text-yellow-400 fill-current"
                        />
                      </div>
                    </div>

                    <!-- Client Info -->
                    <div class="flex items-center justify-center space-x-4">
                      <img
                        :src="testimonial.avatar"
                        :alt="testimonial.name"
                        class="w-16 h-16 rounded-full object-cover"
                      />
                      <div class="text-left">
                        <div class="font-semibold text-gray-900 dark:text-white">
                          {{ testimonial.name }}
                        </div>
                        <div class="text-gray-600 dark:text-gray-400">
                          {{ testimonial.role }}
                        </div>
                        <div class="text-blue-600 dark:text-blue-400 text-sm">
                          {{ testimonial.company }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button
            @click="previousSlide"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            :disabled="currentSlide === 0"
          >
            <Icon icon="lucide:chevron-left" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            @click="nextSlide"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            :disabled="currentSlide === testimonials.length - 1"
          >
            <Icon icon="lucide:chevron-right" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <!-- Dots Indicator -->
        <div class="flex justify-center mt-8 space-x-2">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            @click="currentSlide = index"
            class="w-3 h-3 rounded-full transition-colors"
            :class="{
              'bg-gradient-to-r from-blue-500 to-purple-600': currentSlide === index,
              'bg-gray-300 dark:bg-gray-600': currentSlide !== index
            }"
          />
        </div>

        <!-- Stats Section -->
        <div class="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg"
          >
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {{ animatedStats[stat.label] || 0 }}{{ stat.suffix }}
            </div>
            <div class="text-gray-600 dark:text-gray-300 font-medium">{{ stat.label }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ stat.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const currentSlide = ref(0)
const target = ref()
const animatedStats = reactive<Record<string, number>>({})
let autoSlideInterval: NodeJS.Timeout

const testimonials = [
  {
    id: 1,
    content: "Evanie delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and user experience is outstanding. Our conversion rates increased by 40% after launch.",
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechFlow Solutions",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    content: "Working with Evanie was a game-changer for our startup. The mobile app they developed is intuitive, fast, and our users love it. Highly recommend their expertise in React Native.",
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateLab",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    content: "The API framework Evanie built for us is incredibly robust and scalable. It handles our high traffic seamlessly and the documentation is excellent. A true professional.",
    name: "Emily Rodriguez",
    role: "Lead Developer",
    company: "DataSync Inc",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    content: "Evanie's design system transformed how our team builds interfaces. It's comprehensive, well-documented, and has improved our development speed by 60%. Amazing work!",
    name: "David Kim",
    role: "Design Director",
    company: "CreativeWorks",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }
]

const stats = [
  { label: 'Happy Clients', value: 50, suffix: '+', description: 'Satisfied customers worldwide' },
  { label: 'Projects Done', value: 85, suffix: '+', description: 'Successfully completed projects' },
  { label: 'Team Members', value: 12, suffix: '', description: 'Talented professionals' },
  { label: 'Awards Won', value: 8, suffix: '', description: 'Industry recognitions' }
]

const nextSlide = () => {
  if (currentSlide.value < testimonials.length - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = testimonials.length - 1
  }
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
}

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

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // Animate stats
      stats.forEach((stat, index) => {
        setTimeout(() => {
          animateNumber(stat.value, (value) => {
            animatedStats[stat.label] = value
          })
        }, index * 200)
      })
    }
  },
  { threshold: 0.3 }
)

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>