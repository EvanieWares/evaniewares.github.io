<template>
  <section id="skills" class="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Skills & Technologies</h2>
          <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <!-- Skill Categories -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div 
            v-for="category in skillCategories" 
            :key="category.name"
            class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
          >
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon :icon="category.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ category.name }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">{{ category.description }}</p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div 
                v-for="skill in category.skills" 
                :key="skill.name"
                class="group"
              >
                <div class="relative p-3 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all cursor-pointer">
                  <div class="flex items-center space-x-2">
                    <Icon :icon="skill.icon" class="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" />
                    <span class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-white transition-colors">
                      {{ skill.name }}
                    </span>
                  </div>
                  
                  <!-- Skill Level Indicator -->
                  <div class="mt-2 w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1">
                    <div 
                      class="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all group-hover:bg-white"
                      :style="{ width: skill.level + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Tech Stack -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
          <h3 class="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-8">
            Interactive Tech Stack
          </h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div 
              v-for="(tech, index) in techStack" 
              :key="tech.name"
              class="group relative flex flex-col items-center"
              @mouseover="hoveredTech = tech"
              @mouseleave="hoveredTech = null"
            >
              <div 
                class="w-20 h-20 bg-gray-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 cursor-pointer"
                :style="{ 
                  animationDelay: (index * 0.1) + 's',
                  animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                }"
              >
                <Icon :icon="tech.icon" class="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" />
              </div>
              
              <div class="text-center mt-3">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300">{{ tech.name }}</span>
              </div>

              <!-- Tooltip -->
              <div 
                v-if="hoveredTech?.name === tech.name"
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-slate-700 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap opacity-0 animate-fadeIn"
              >
                {{ tech.description }}
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-slate-700"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Certifications & Achievements -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Icon icon="lucide:award" class="w-6 h-6 text-blue-500 mr-2" />
              Certifications
            </h3>
            <div class="space-y-4">
              <div 
                v-for="cert in certifications" 
                :key="cert.name"
                class="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">{{ cert.name }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">{{ cert.issuer }} • {{ cert.year }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Icon icon="lucide:trophy" class="w-6 h-6 text-yellow-500 mr-2" />
              Achievements
            </h3>
            <div class="space-y-4">
              <div 
                v-for="achievement in achievements" 
                :key="achievement.title"
                class="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <div class="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mt-2"></div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">{{ achievement.title }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">{{ achievement.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const target = ref()
const isVisible = ref(false)
const hoveredTech = ref<any>(null)

const skillCategories = [
  {
    name: 'Frontend',
    description: 'Building beautiful and interactive user interfaces',
    icon: 'lucide:monitor',
    skills: [
      { name: 'Vue.js', icon: 'logos:vue', level: 95 },
      { name: 'React', icon: 'logos:react', level: 90 },
      { name: 'TypeScript', icon: 'logos:typescript-icon', level: 85 },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', level: 90 },
      { name: 'Sass', icon: 'logos:sass', level: 80 },
      { name: 'Webpack', icon: 'logos:webpack', level: 75 }
    ]
  },
  {
    name: 'Mobile Development',
    description: 'Native Android apps with modern UI frameworks',
    icon: 'lucide:smartphone',
    skills: [
      { name: 'Android', icon: 'logos:android-icon', level: 90 },
      { name: 'Jetpack Compose', icon: 'simple-icons:jetpackcompose', level: 85 },
      { name: 'Kotlin', icon: 'logos:kotlin-icon', level: 90 },
      { name: 'Firebase', icon: 'logos:firebase', level: 80 },
      { name: 'Java', icon: 'logos:java', level: 75 },
      { name: 'Android Studio', icon: 'simple-icons:androidstudio', level: 85 }
    ]
  },
  {
    name: 'Backend',
    description: 'Creating robust server-side applications and APIs',
    icon: 'lucide:server',
    skills: [
      { name: 'Node.js', icon: 'logos:nodejs-icon', level: 90 },
      { name: 'Python', icon: 'logos:python', level: 85 },
      { name: 'Express', icon: 'simple-icons:express', level: 88 },
      { name: 'PostgreSQL', icon: 'logos:postgresql', level: 80 },
      { name: 'MongoDB', icon: 'logos:mongodb-icon', level: 75 },
      { name: 'Redis', icon: 'logos:redis', level: 70 }
    ]
  },
  {
    name: 'Automation & DevOps',
    description: 'Workflow automation and deployment processes',
    icon: 'lucide:workflow',
    skills: [
      { name: 'GitHub Actions', icon: 'simple-icons:githubactions', level: 90 },
      { name: 'Docker', icon: 'logos:docker-icon', level: 80 },
      { name: 'AWS', icon: 'logos:aws', level: 75 },
      { name: 'Zapier', icon: 'simple-icons:zapier', level: 85 },
      { name: 'Make', icon: 'simple-icons:make', level: 85 },
      { name: 'Terraform', icon: 'simple-icons:terraform', level: 65 }
    ]
  },
  {
    name: 'Tools & Design',
    description: 'Development tools and design workflow',
    icon: 'lucide:wrench',
    skills: [
      { name: 'Git', icon: 'logos:git-icon', level: 95 },
      { name: 'Vercel', icon: 'logos:vercel-icon', level: 85 },
      { name: 'Jest', icon: 'logos:jest', level: 80 },
      { name: 'Figma', icon: 'logos:figma', level: 85 },
      { name: 'VS Code', icon: 'logos:visual-studio-code', level: 95 },
      { name: 'Postman', icon: 'simple-icons:postman', level: 85 }
    ]
  }
]

const techStack = [
  { name: 'Vue.js', icon: 'logos:vue', description: 'Progressive JavaScript framework for building user interfaces' },
  { name: 'React', icon: 'logos:react', description: 'A JavaScript library for building user interfaces' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', description: 'Typed superset of JavaScript' },
  { name: 'Android', icon: 'logos:android-icon', description: 'Native Android app development' },
  { name: 'Jetpack Compose', icon: 'simple-icons:jetpackcompose', description: 'Modern toolkit for building native Android UI' },
  { name: 'Kotlin', icon: 'logos:kotlin-icon', description: 'Modern programming language for Android development' },
  { name: 'Node.js', icon: 'logos:nodejs-icon', description: 'JavaScript runtime built on Chrome\'s V8 engine' },
  { name: 'Python', icon: 'logos:python', description: 'High-level programming language' },
  { name: 'Firebase', icon: 'logos:firebase', description: 'Google\'s mobile and web application development platform' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', description: 'Advanced open source relational database' },
  { name: 'MongoDB', icon: 'logos:mongodb-icon', description: 'Document-based NoSQL database' },
  { name: 'Docker', icon: 'logos:docker-icon', description: 'Platform for developing, shipping, and running applications' },
  { name: 'GitHub Actions', icon: 'simple-icons:githubactions', description: 'Workflow automation and CI/CD platform' },
  { name: 'AWS', icon: 'logos:aws', description: 'Amazon Web Services cloud platform' },
  { name: 'Git', icon: 'logos:git-icon', description: 'Distributed version control system' },
  { name: 'Figma', icon: 'logos:figma', description: 'Collaborative interface design tool' },
  { name: 'Tailwind', icon: 'logos:tailwindcss-icon', description: 'Utility-first CSS framework' },
  { name: 'Zapier', icon: 'simple-icons:zapier', description: 'Workflow automation platform' }
]

const certifications = [
  { name: 'Fundamentals of Data Science in Precision Medicine and Cloud Computing', issuer: 'Stanford Medicine', year: '2025' },
  { name: 'Software Engineering - Backend Specialization', issuer: 'ALX Africa', year: '2024' },
  { name: 'AiCE Career Essentials', issuer: 'ALX Africa', year: '2024' },
  { name: 'Vue.js Certified Developer', issuer: 'Vue.js Foundation', year: '2023' },
  { name: 'Android Development with Kotlin', issuer: 'Google', year: '2023' }
]

const achievements = [
  { title: 'Full-Stack Developer', description: 'Built end-to-end applications across web and mobile platforms' },
  { title: 'Mobile App Success', description: 'Published 5+ Android apps with 10k+ downloads' },
  { title: 'Automation Expert', description: 'Reduced manual tasks by 80% through workflow automation' },
  { title: 'Tech Speaker', description: 'Spoke at 8 conferences and meetups' },
  { title: 'Mentor', description: 'Mentored 20+ junior developers' }
]

useIntersectionObserver(
  target,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true
    }
  },
  { threshold: 0.3 }
)
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>