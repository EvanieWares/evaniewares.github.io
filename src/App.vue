<script setup lang="ts">
import LoadingScreen from './components/LoadingScreen.vue'
import NavigationBar from './components/NavigationBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 transition-colors">
    <LoadingScreen />
    <NavigationBar />
    
    <main>
      <section id="hero">
        <HeroSection />
      </section>
      
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    
    <FooterSection />
  </div>
</template>
