// Centralized portfolio data store
// This data is shared between the GUI components and the terminal interface

// Type definitions
export interface Project {
  id: number
  name: string
  title: string
  description: string
  image: string
  categories: string[]
  technologies: string[]
  demoUrl: string
  githubUrl: string
  year: string
}

export interface SkillCategory {
  name: string
  description: string
  icon: string
  skills: Array<{
    name: string
    icon: string
    level: number
  }>
}

export interface ContactInfo {
  type: string
  label: string
  value: string
  icon: string
  action: string | null
}

export interface SocialLink {
  name: string
  icon: string
  url: string
}

export const skills = [
  'JavaScript/TypeScript', 
  'Vue.js', 
  'React', 
  'Android',
  'Jetpack Compose',
  'Kotlin',
  'Node.js', 
  'Python', 
  'HTML/CSS', 
  'Tailwind CSS', 
  'Firebase',
  'PostgreSQL',
  'MongoDB',
  'Git', 
  'GitHub Actions',
  'Docker',
  'AWS',
  'Linux',
  'Zapier',
  'Make',
  'Figma',
  'VS Code'
]

export const skillCategories = [
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

export const techStack = [
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

export const contactInfo = [
  {
    type: 'email',
    label: 'Email',
    value: 'evaniewares@gmail.com',
    icon: 'lucide:mail',
    action: 'mailto:evaniewares@gmail.com'
  },
  {
    type: 'phone',
    label: 'Phone',
    value: '+265 994 142 773',
    icon: 'lucide:phone',
    action: 'tel:+265994142773'
  },
  {
    type: 'location',
    label: 'Location',
    value: 'Liwonde, Machinga, Malawi',
    icon: 'lucide:map-pin',
    action: null
  }
]

export const socialLinks = [
  { name: 'GitHub', icon: 'lucide:github', url: 'https://github.com/EvanieWares' },
  { name: 'LinkedIn', icon: 'lucide:linkedin', url: 'https://linkedin.com/in/chisopsyelera' },
  { name: 'Twitter', icon: 'lucide:twitter', url: 'https://twitter.com/EvanieWares' },
  { name: 'Instagram', icon: 'lucide:instagram', url: 'https://instagram.com/psybytelabs' }
]

export const projects = [
  {
    id: 1,
    name: 'personal-finance-tool.txt',
    title: 'Personal Finance Management Tool',
    description: 'A full-stack application that helps users manage their personal finances by tracking transactions, creating budgets, and generating financial summaries.',
    image: 'https://github.com/user-attachments/assets/f79a9e92-5474-419f-a58c-2e5d5f2a7f48',
    categories: ['Web App', 'API'],
    technologies: ['Vue.js', 'FastAPI', 'PyMongo', 'Vuetify', 'JWT', 'Axios'],
    demoUrl: 'https://github.com/Brendah90/personal-finance-management-tool',
    githubUrl: 'https://github.com/Brendah90/personal-finance-management-tool',
    year: '2024'
  },
  {
    id: 2,
    name: 'task-automation.txt',
    title: 'Task Management App',
    description: 'An AI-powered Zapier automation that triggers every morning to read tasks from ClickUp, Google Calendar, and Microsoft Calendar, then sends clients a well-crafted WhatsApp message with daily tasks and smart priority recommendations.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop',
    categories: ['API'],
    technologies: ['Zapier', 'ClickUp API', 'Google Calendar API', 'Microsoft Graph API', 'WhatsApp API'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example',
    year: '2024'
  },
  {
    id: 3,
    name: 'classease.txt',
    title: 'ClassEase',
    description: 'A comprehensive mobile app that streamlines teachers\' assessment process. Features educational resources, plus a community section for collaboration and mutual assistance.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=240&fit=crop',
    categories: ['Mobile'],
    technologies: ['Jetpack Compose', 'Room Database', 'Firebase', 'Hilt', 'Android'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example',
    year: '2024'
  },
  {
    id: 4,
    name: 'school-data-sync.txt',
    title: 'School Data Sync',
    description: 'An Android app for headteachers to submit monthly school data including staff returns, enrollment, buildings, and furniture inventories. Built with modern Android architecture.',
    image: '/images/sds.jpg',
    categories: ['Mobile'],
    technologies: ['Jetpack Compose', 'Firebase', 'Hilt', 'Android'],
    demoUrl: 'https://github.com/EvanieWares/sds',
    githubUrl: 'https://github.com/EvanieWares/sds',
    year: '2024'
  },
  {
    id: 5,
    name: 'sds-portal.txt',
    title: 'School Data Sync Portal',
    description: 'A web application for district and zone admins to retrieve and analyze school data submitted by headteachers. Features data visualization, Excel export, and comprehensive reporting.',
    image: '/images/sds-portal.png',
    categories: ['Web App'],
    technologies: ['Vue.js', 'Vuetify', 'XLSX', 'Firebase', 'Sass', 'Pinia'],
    demoUrl: 'https://github.com/EvanieWares/sds-portal',
    githubUrl: 'https://github.com/EvanieWares/sds-portal',
    year: '2025'
  },
  {
    id: 6,
    name: 'sivimeka.txt',
    title: 'Sivi Meka',
    description: 'A modern, expressive Vue.js web application for building professional CVs with style. Uses Make.com workflow to create CVs tailored to job descriptions.',
    image: 'https://github.com/EvanieWares/sivimeka/blob/main/screenshots/desktop-cv-form-step1.png?raw=true',
    categories: ['Web App'],
    technologies: ['Vue.js', 'Make.com', 'Tailwind CSS', 'JavaScript'],
    demoUrl: 'https://evaniewares.github.io/sivimeka/',
    githubUrl: 'https://github.com/EvanieWares/sivimeka',
    year: '2025'
  }
]

export const certifications = [
  { name: 'Fundamentals of Data Science in Precision Medicine and Cloud Computing', issuer: 'Stanford Medicine', year: '2025' },
  { name: 'Software Engineering - Backend Specialization', issuer: 'ALX Africa', year: '2024' },
  { name: 'AiCE Career Essentials', issuer: 'ALX Africa', year: '2024' },
  { name: 'Vue.js Certified Developer', issuer: 'Vue.js Foundation', year: '2023' },
  { name: 'Android Development with Kotlin', issuer: 'Google', year: '2023' }
]

export const achievements = [
  { title: 'Full-Stack Developer', description: 'Built end-to-end applications across web and mobile platforms' },
  { title: 'Mobile App Success', description: 'Published 5+ Android apps with 10k+ downloads' },
  { title: 'Automation Expert', description: 'Reduced manual tasks by 80% through workflow automation' },
  { title: 'Tech Speaker', description: 'Spoke at 8 conferences and meetups' },
  { title: 'Mentor', description: 'Mentored 20+ junior developers' }
]

export const personalInfo = {
  name: 'Chisomo Psyelera',
  title: 'Full-Stack Developer',
  company: 'PsyByte Labs',
  status: 'Available for hire',
  location: 'Liwonde, Machinga, Malawi'
}