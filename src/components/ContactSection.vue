<template>
  <section id="contact" class="py-20 bg-white dark:bg-slate-900">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Get In Touch</h2>
          <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and creative projects.
            Let's discuss how we can work together!
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Let's Connect
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to say hello,
                I'd love to hear from you. Feel free to reach out through any of the channels below.
              </p>
            </div>

            <div class="space-y-6">
              <div 
                v-for="contact in contactInfo" 
                :key="contact.type"
                class="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group cursor-pointer"
                @click="handleContactClick(contact)"
              >
                <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Icon :icon="contact.icon" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">{{ contact.label }}</div>
                  <div class="text-gray-600 dark:text-gray-300">{{ contact.value }}</div>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="pt-8">
              <h4 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Follow Me</h4>
              <div class="flex gap-4">
                <a 
                  v-for="social in socialLinks" 
                  :key="social.name"
                  :href="social.url"
                  class="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon :icon="social.icon" class="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8">
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>

              <Button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon 
                  :icon="isSubmitting ? 'lucide:loader-2' : 'lucide:send'" 
                  class="w-5 h-5 mr-2"
                  :class="{ 'animate-spin': isSubmitting }"
                />
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </Button>
            </form>

            <!-- Success Message -->
            <div 
              v-if="showSuccessMessage"
              class="mt-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg"
            >
              <div class="flex items-center">
                <Icon icon="lucide:check-circle" class="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <span class="text-green-800 dark:text-green-300 font-medium">
                  Message sent successfully! I'll get back to you soon.
                </span>
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
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { contactInfo, socialLinks } from '@/data/portfolio'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

const handleContactClick = (contact: typeof contactInfo[0]) => {
  if (contact.action) {
    window.open(contact.action, '_self')
  }
}

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    
    showSuccessMessage.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)
  } catch (error) {
    console.error('Error sending message:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>