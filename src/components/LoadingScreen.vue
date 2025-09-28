<template>
  <div 
    v-if="isLoading"
    class="fixed inset-0 bg-white dark:bg-slate-900 z-50 flex items-center justify-center transition-opacity duration-500"
    :class="{ 'opacity-0 pointer-events-none': !isLoading }"
  >
    <div class="text-center">
      <!-- Animated Logo -->
      <div class="relative mb-8">
        <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <span class="text-2xl font-bold text-white">EW</span>
        </div>
        
        <!-- Rotating Ring -->
        <div class="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
      </div>

      <!-- Loading Text -->
      <div class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Loading Portfolio
      </div>
      
      <!-- Progress Bar -->
      <div class="w-64 h-1 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden mx-auto">
        <div 
          class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      
      <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {{ Math.round(progress) }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const progress = ref(0)

const simulateLoading = () => {
  const interval = setInterval(() => {
    progress.value += Math.random() * 15 + 5
    
    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(interval)
      
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    }
  }, 100)
}

onMounted(() => {
  simulateLoading()
})
</script>