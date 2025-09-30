<template>
  <div class="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
    <!-- Terminal Header -->
    <div class="bg-gray-800 border-b border-green-400 p-2 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
        <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        <span class="ml-4 text-white text-sm">evanie@portfolio:~$</span>
      </div>
      <button
        @click="exitTerminal"
        class="text-red-400 hover:text-red-300 transition-colors text-sm"
      >
        [EXIT]
      </button>
    </div>

    <!-- Terminal Content -->
    <div class="p-4 h-screen overflow-y-auto pb-20" ref="terminalContainer">
      <!-- Welcome Message -->
      <div class="mb-4">
        <div class="text-cyan-400">╔══════════════════════════════════════════════════════════╗</div>
        <div class="text-cyan-400">║              Welcome to Evanie's Portfolio Terminal     ║</div>
        <div class="text-cyan-400">║                                                          ║</div>
        <div class="text-cyan-400">║  Type 'help' to see available commands                  ║</div>
        <div class="text-cyan-400">║  Type 'gui' to return to the normal portfolio           ║</div>
        <div class="text-cyan-400">╚══════════════════════════════════════════════════════════╝</div>
        <div class="mt-2 text-yellow-400">System initialized... Ready for commands.</div>
      </div>

      <!-- Command History -->
      <div v-for="(entry, index) in commandHistory" :key="index" class="mb-2">
        <div class="flex">
          <span class="text-green-400">evanie@portfolio:~$ </span>
          <span class="text-white ml-2">{{ entry.command }}</span>
        </div>
        <div v-html="entry.output" class="mt-1 whitespace-pre-wrap"></div>
      </div>

      <!-- Current Input Line -->
      <div class="flex items-center">
        <span class="text-green-400">evanie@portfolio:~$ </span>
        <input
          ref="commandInput"
          v-model="currentCommand"
          @keydown.enter="executeCommand"
          @keydown.up="navigateHistory('up')"
          @keydown.down="navigateHistory('down')"
          @keydown.tab.prevent="handleTab"
          class="bg-transparent border-none outline-none text-white ml-2 flex-1"
          placeholder=""
          autofocus
        />
        <span class="animate-pulse">█</span>
      </div>
    </div>

    <!-- Sudo Hire Me Animation -->
    <div
      v-if="showHireMeAnimation"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
    >
      <div class="text-center">
        <div class="text-6xl mb-4 animate-bounce">💼</div>
        <div class="text-4xl text-green-400 mb-4 font-bold">HIRE_ME.EXE EXECUTING...</div>
        <div class="text-2xl text-yellow-400 mb-8">{{ animationText }}</div>
        <div class="border border-green-400 p-6 bg-black max-w-md mx-auto">
          <h3 class="text-xl text-green-400 mb-4">CONTACT INITIATED</h3>
          <form @submit.prevent="submitContact" class="space-y-4">
            <input
              v-model="contactForm.name"
              placeholder="Enter your name..."
              class="w-full bg-transparent border border-green-400 p-2 text-green-400 placeholder-green-600"
              required
            />
            <input
              v-model="contactForm.email"
              type="email"
              placeholder="Enter your email..."
              class="w-full bg-transparent border border-green-400 p-2 text-green-400 placeholder-green-600"
              required
            />
            <textarea
              v-model="contactForm.message"
              placeholder="Enter your message..."
              rows="4"
              class="w-full bg-transparent border border-green-400 p-2 text-green-400 placeholder-green-600"
              required
            ></textarea>
            <div class="flex space-x-2">
              <button
                type="submit"
                class="flex-1 bg-green-400 text-black p-2 hover:bg-green-300 transition-colors"
              >
                EXECUTE
              </button>
              <button
                type="button"
                @click="closeHireMeAnimation"
                class="flex-1 border border-red-400 text-red-400 p-2 hover:bg-red-400 hover:text-black transition-colors"
              >
                ABORT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { 
  skills, 
  projects, 
  contactInfo, 
  socialLinks, 
  personalInfo,
  certifications,
  achievements 
} from '@/data/portfolio'

const router = useRouter()
const terminalContainer = ref<HTMLElement>()
const commandInput = ref<HTMLInputElement>()
const currentCommand = ref('')
const commandHistory = ref<Array<{ command: string; output: string }>>([])
const historyIndex = ref(-1)
const inputHistory = ref<string[]>([])

// Animation states
const showHireMeAnimation = ref(false)
const animationText = ref('')
const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const availableCommands = [
  'help', 'ls', 'cat', 'pwd', 'whoami', 'date', 'clear', 
  'tree', 'ps', 'top', 'sudo', 'gui', 'exit', 'neofetch', 'fortune', 'contact', 'projects'
]

const executeCommand = () => {
  const command = currentCommand.value.trim()
  if (!command) return

  // Add to history only if it's different from the last command
  const lastCommand = inputHistory.value[inputHistory.value.length - 1]
  if (lastCommand !== command) {
    inputHistory.value.push(command)
  }
  historyIndex.value = -1

  let output = ''
  const args = command.split(' ')
  const cmd = args[0]?.toLowerCase() || ''

  switch (cmd) {
    case 'help':
      output = `<div class="text-cyan-400">
Available commands:
<span class="text-yellow-400">help</span>        - Show this help message
<span class="text-yellow-400">ls</span>          - List projects and files
<span class="text-yellow-400">projects</span>    - List all projects with details
<span class="text-yellow-400">cat [file]</span>  - Display file contents (try: resume.txt, about.txt)
<span class="text-yellow-400">pwd</span>         - Show current directory
<span class="text-yellow-400">whoami</span>      - Display user information
<span class="text-yellow-400">contact</span>     - Show contact information
<span class="text-yellow-400">date</span>        - Show current date and time
<span class="text-yellow-400">clear</span>       - Clear the terminal
<span class="text-yellow-400">tree</span>        - Show project structure
<span class="text-yellow-400">ps</span>          - Show running skills
<span class="text-yellow-400">neofetch</span>    - Show system information
<span class="text-yellow-400">fortune</span>     - Get a random quote
<span class="text-yellow-400">sudo hire-me</span> - Execute hiring protocol (DANGEROUS!)
<span class="text-yellow-400">gui</span>         - Return to graphical interface
<span class="text-yellow-400">exit</span>        - Exit terminal
</div>`
      break

    case 'ls':
      output = `<div class="text-white">
<span class="text-blue-400">total ${projects.length + 3}</span>
<span class="text-green-400">drwxr-xr-x</span> 2 evanie evanie 4096 Dec 15 2024 <span class="text-cyan-400">projects/</span>
<span class="text-green-400">-rw-r--r--</span> 1 evanie evanie 2048 Dec 15 2024 <span class="text-white">resume.txt</span>
<span class="text-green-400">-rw-r--r--</span> 1 evanie evanie 1024 Dec 15 2024 <span class="text-white">about.txt</span>
<span class="text-green-400">-rw-r--r--</span> 1 evanie evanie  512 Dec 15 2024 <span class="text-white">skills.txt</span>
${projects.map(p => `<span class="text-green-400">-rw-r--r--</span> 1 evanie evanie 1337 ${p.year} <span class="text-white">${p.name}</span>`).join('\n')}
</div>`
      break

    case 'projects':
      output = `<div class="text-cyan-400">
<span class="text-green-400">📁 PROJECT PORTFOLIO</span>
<span class="text-cyan-400">═══════════════════════════════════════</span>

${projects.map((project, index) => `
<span class="text-yellow-400">${index + 1}. ${project.title}</span> (${project.year})
   📝 ${project.description.slice(0, 80)}${project.description.length > 80 ? '...' : ''}
   🏷️  Categories: ${project.categories.join(', ')}
   🛠️  Tech: ${project.technologies.slice(0, 3).join(', ')}${project.technologies.length > 3 ? '...' : ''}
   📂 File: ${project.name}
`).join('')}
<span class="text-purple-400">💡 Use 'cat [filename]' to view detailed project information!</span>
</div>`
      break

    case 'cat':
      const filename = args[1]
      if (!filename) {
        output = '<span class="text-red-400">cat: missing file operand</span>'
      } else {
        output = handleCatCommand(filename)
      }
      break

    case 'pwd':
      output = '<span class="text-cyan-400">/home/evanie/portfolio</span>'
      break

    case 'whoami':
      output = `<div class="text-cyan-400">
User: <span class="text-white">${personalInfo.name.toLowerCase().replace(' ', '')}</span>
Role: <span class="text-green-400">${personalInfo.title}</span>
Company: <span class="text-purple-400">${personalInfo.company}</span>
Status: <span class="text-yellow-400">${personalInfo.status}</span>
Location: <span class="text-purple-400">${personalInfo.location}</span>
</div>`
      break

    case 'contact':
      output = `<div class="text-cyan-400">
<span class="text-green-400">📞 CONTACT INFORMATION</span>
<span class="text-cyan-400">═══════════════════════════════════════</span>

<span class="text-yellow-400">📧 Email:</span>
   ${contactInfo.find(c => c.type === 'email')?.value}
   
<span class="text-yellow-400">📞 Phone:</span>
   ${contactInfo.find(c => c.type === 'phone')?.value}
   
<span class="text-yellow-400">📍 Location:</span>
   ${contactInfo.find(c => c.type === 'location')?.value}

<span class="text-yellow-400">🌐 Social Links:</span>
${socialLinks.map(social => `   • ${social.name}: ${social.url}`).join('\n')}

<span class="text-purple-400">💡 Tip: Use 'sudo hire-me' for the interactive contact experience!</span>
</div>`
      break

    case 'date':
      output = `<span class="text-white">${new Date().toLocaleString()}</span>`
      break

    case 'clear':
      commandHistory.value = []
      currentCommand.value = ''
      return

    case 'tree':
      output = `<div class="text-cyan-400">
portfolio/
├── projects/
│   ├── ${projects.map(p => p.name).join('\n│   ├── ')}
├── resume.txt
├── about.txt
└── skills.txt
</div>`
      break

    case 'ps':
      output = `<div class="text-green-400">
PID  TTY          TIME CMD
 1   pts/0    00:00:01 ${skills.join('\n 2   pts/0    00:00:01 ')}
</div>`
      break

    case 'top':
      output = `<div class="text-green-400">
Tasks: ${skills.length} total, ${skills.length} running, 0 sleeping
%Cpu(s): 98.7 us, 1.3 sy, 0.0 ni, 0.0 id

PID USER      PR  NI  VIRT   RES  SHR S  %CPU %MEM     TIME+ COMMAND
${skills.map((skill, i) => `${i+1}   evanie    20   0  ${Math.random() * 1000 | 0}M   ${Math.random() * 100 | 0}M  ${Math.random() * 50 | 0}M R  ${Math.random() * 100 | 0}.${Math.random() * 10 | 0}  ${Math.random() * 10 | 0}.${Math.random() * 10 | 0}   0:${Math.random() * 60 | 0}.${Math.random() * 100 | 0} ${skill}`).join('\n')}
</div>`
      break

    case 'sudo':
      if (args[1] === 'hire-me') {
        startHireMeAnimation()
        output = '<span class="text-red-400">⚠️  EXECUTING HIRE_ME.EXE... ⚠️</span>'
      } else {
        output = `<span class="text-red-400">sudo: ${args.slice(1).join(' ')}: command not found</span>`
      }
      break

    case 'gui':
      router.push('/')
      return

    case 'exit':
      exitTerminal()
      return

    case 'neofetch':
      output = `<div class="text-cyan-400">
<span class="text-green-400">                   -\`                evanie@portfolio</span>
<span class="text-green-400">                  .o+\`               ---------------</span>
<span class="text-green-400">                 \`ooo/               OS</span>: Portfolio Linux v2024
<span class="text-green-400">                \`+oooo:              Host</span>: Personal Website
<span class="text-green-400">               \`+oooooo:             Kernel</span>: Vue.js 3.5.21
<span class="text-green-400">               -+oooooo+:            Uptime</span>: Always online
<span class="text-green-400">             \`/:-:++oooo+:           Packages</span>: ${skills.length} skills installed
<span class="text-green-400">            \`/++++/+++++++:          Shell</span>: evanie-terminal
<span class="text-green-400">           \`/++++++++++++++:         Resolution</span>: Responsive design
<span class="text-green-400">          \`/+++ooooooooooooo/\`       Theme</span>: Hacker [Matrix Green]
<span class="text-green-400">         ./ooosssso++osssssso+\`      CPU</span>: Full-Stack Developer Core
<span class="text-green-400">        .oossssso-\`\`\`\`/ossssss+\`     Memory</span>: Unlimited creativity
<span class="text-green-400">       -osssssso.      :ssssssso.    GPU</span>: Problem Solving Engine
<span class="text-cyan-400">      :osssssss/        osssso+++.   Disk</span>: ∞ GB (GitHub repositories)
<span class="text-cyan-400">     /ossssssss/        +ssssooo/-   Network</span>: Connected to opportunities
<span class="text-yellow-400">   \`/ossssso+/:-        -:/+osssso+-</span>
<span class="text-yellow-400">  \`+sso+:-\`                 \`.-/+oso:</span>
<span class="text-yellow-400"> \`++:.                           \`-/+/</span>
<span class="text-yellow-400"> .\`                                 \`/</span>
</div>`
      break

    case 'fortune':
      const fortunes = [
        '"Code is like humor. When you have to explain it, it\'s bad." – Cory House',
        '"Programs must be written for people to read, and only incidentally for machines to execute." – Harold Abelson',
        '"The best way to get a project done faster is to start sooner." – Jim Highsmith',
        '"Simplicity is the ultimate sophistication." – Leonardo da Vinci',
        '"First, solve the problem. Then, write the code." – John Johnson',
        '"Experience is the name everyone gives to their mistakes." – Oscar Wilde',
        '"The most important property of a program is whether it accomplishes the intention of its user." – C.A.R. Hoare',
        '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." – Martin Fowler'
      ]
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
      output = `<div class="text-yellow-400">💫 ${randomFortune}</div>`
      break

    default:
      if (command.startsWith('./')) {
        output = '<span class="text-red-400">bash: permission denied</span>'
      } else {
        output = `<span class="text-red-400">bash: ${command}: command not found</span>`
      }
  }

  commandHistory.value.push({ command, output })
  currentCommand.value = ''
  scrollToBottom()
}

const handleCatCommand = (filename: string): string => {
  switch (filename.toLowerCase()) {
    case 'resume.txt':
      return `<div class="text-white">
<span class="text-cyan-400">═══════════════════════════════════════</span>
<span class="text-green-400">           ${personalInfo.name.toUpperCase()}'S RESUME              </span>
<span class="text-cyan-400">═══════════════════════════════════════</span>

<span class="text-yellow-400">CONTACT INFO:</span>
📧 Email: ${contactInfo.find(c => c.type === 'email')?.value}
📞 Phone: ${contactInfo.find(c => c.type === 'phone')?.value}
📍 Location: ${contactInfo.find(c => c.type === 'location')?.value}
🔗 LinkedIn: ${socialLinks.find(s => s.name === 'LinkedIn')?.url}
🐙 GitHub: ${socialLinks.find(s => s.name === 'GitHub')?.url}

<span class="text-yellow-400">SKILLS:</span>
${skills.map(skill => `• ${skill}`).join('\n')}

<span class="text-yellow-400">RECENT CERTIFICATIONS:</span>
${certifications.slice(0, 3).map(cert => `• ${cert.name} (${cert.issuer}, ${cert.year})`).join('\n')}

<span class="text-yellow-400">KEY ACHIEVEMENTS:</span>
${achievements.slice(0, 3).map(ach => `• ${ach.title}: ${ach.description}`).join('\n')}

<span class="text-red-400">📄 Full PDF version available upon request!</span>
</div>`

    case 'about.txt':
      return `<div class="text-white">
<span class="text-cyan-400">═══════════════════════════════════════</span>
<span class="text-green-400">            ABOUT ${personalInfo.name.split(' ')[0]?.toUpperCase() || 'EVANIE'}               </span>
<span class="text-cyan-400">═══════════════════════════════════════</span>

Hello! I'm ${personalInfo.name}, a passionate ${personalInfo.title.toLowerCase()} at ${personalInfo.company}.
I love creating innovative web applications and solving complex problems.

<span class="text-yellow-400">Current Status:</span> ${personalInfo.status}
<span class="text-yellow-400">Location:</span> ${personalInfo.location}

<span class="text-yellow-400">What I do:</span>
• Build responsive, user-friendly web applications
• Create scalable backend systems and APIs
• Develop native Android applications with Kotlin
• Design intuitive user interfaces
• Implement workflow automation solutions
• Collaborate with teams to deliver amazing products

<span class="text-yellow-400">My passion:</span>
• Clean, maintainable code
• Continuous learning and growth
• Open source contributions
• Helping others learn to code
• Building tools that make life easier

<span class="text-green-400">Fun fact:</span> I created this terminal interface because
I believe portfolios should be as unique as the developer! 🚀

<span class="text-purple-400">Connect with me:</span>
${socialLinks.map(social => `• ${social.name}: ${social.url}`).join('\n')}
</div>`

    case 'skills.txt':
      return `<div class="text-white">
<span class="text-cyan-400">═══════════════════════════════════════</span>
<span class="text-green-400">         TECHNICAL SKILLS              </span>
<span class="text-cyan-400">═══════════════════════════════════════</span>

<span class="text-yellow-400">Frontend:</span>
${skills.filter(s => ['JavaScript/TypeScript', 'Vue.js', 'React', 'HTML/CSS', 'Tailwind CSS'].includes(s)).map(s => `▓▓▓▓▓▓▓▓▓▓ ${s}`).join('\n')}

<span class="text-yellow-400">Backend:</span>
${skills.filter(s => ['Node.js', 'Python'].includes(s)).map(s => `▓▓▓▓▓▓▓▓▓░ ${s}`).join('\n')}

<span class="text-yellow-400">Tools & Others:</span>
${skills.filter(s => ['Git', 'Linux', 'Docker'].includes(s)).map(s => `▓▓▓▓▓▓▓▓░░ ${s}`).join('\n')}
</div>`

    default:
      const project = projects.find(p => p.name.toLowerCase() === filename.toLowerCase())
      if (project) {
        return `<div class="text-white">
<span class="text-cyan-400">Project: ${project.title}</span>
<span class="text-green-400">Description:</span> ${project.description}

<span class="text-yellow-400">Categories:</span> ${project.categories.join(', ')}
<span class="text-yellow-400">Technologies:</span> ${project.technologies.join(', ')}
<span class="text-yellow-400">Year:</span> ${project.year}
<span class="text-yellow-400">GitHub:</span> ${project.githubUrl}
<span class="text-yellow-400">Demo:</span> ${project.demoUrl}

<span class="text-purple-400">Want to see more? Contact me!</span>
</div>`
      }
      return `<span class="text-red-400">cat: ${filename}: No such file or directory</span>`
  }
}

const navigateHistory = (direction: 'up' | 'down') => {
  if (inputHistory.value.length === 0) return

  if (direction === 'up') {
    if (historyIndex.value === -1) {
      historyIndex.value = inputHistory.value.length - 1
    } else if (historyIndex.value > 0) {
      historyIndex.value--
    }
  } else {
    if (historyIndex.value < inputHistory.value.length - 1) {
      historyIndex.value++
    } else {
      historyIndex.value = -1
      currentCommand.value = ''
      return
    }
  }

  if (historyIndex.value >= 0 && historyIndex.value < inputHistory.value.length) {
    currentCommand.value = inputHistory.value[historyIndex.value] || ''
  }
}

const handleTab = () => {
  const partial = currentCommand.value.trim()
  const matches = availableCommands.filter(cmd => cmd.startsWith(partial))
  
  if (matches.length === 1) {
    currentCommand.value = matches[0] + ' '
  } else if (matches.length > 1) {
    const output = `<span class="text-cyan-400">${matches.join('  ')}</span>`
    commandHistory.value.push({ command: partial, output })
    scrollToBottom()
  }
}

const startHireMeAnimation = () => {
  showHireMeAnimation.value = true
  const messages = [
    'Scanning resume...',
    'Checking GitHub contributions...',
    'Analyzing coding skills...',
    'Verifying coffee intake levels...',
    'MATCH FOUND! 🎯'
  ]
  
  let index = 0
  const interval = setInterval(() => {
    if (index < messages.length) {
      animationText.value = messages[index] || ''
      index++
    }
    if (index >= messages.length) {
      clearInterval(interval)
    }
  }, 1000)
}

const submitContact = () => {
  // Here you would normally send the form data to your backend
  console.log('Contact form submitted:', contactForm.value)
  
  commandHistory.value.push({
    command: 'sudo hire-me',
    output: `<div class="text-green-400">
✅ CONTACT FORM SUBMITTED SUCCESSFULLY!
📧 Message sent to: evanie@portfolio.dev
🤖 Auto-response: "Thanks for reaching out! I'll get back to you ASAP!"

<span class="text-yellow-400">Process completed. Standing by for further instructions...</span>
</div>`
  })
  
  closeHireMeAnimation()
  scrollToBottom()
}

const closeHireMeAnimation = () => {
  showHireMeAnimation.value = false
  animationText.value = ''
  contactForm.value = { name: '', email: '', message: '' }
}

const exitTerminal = () => {
  router.push('/')
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalContainer.value) {
      terminalContainer.value.scrollTop = terminalContainer.value.scrollHeight
    }
  })
}

onMounted(() => {
  if (commandInput.value) {
    commandInput.value.focus()
  }
})
</script>