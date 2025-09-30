# Chisomo Psyelera Portfolio Website

An interactive and animated portfolio/profile website built with modern web technologies, featuring beautiful animations and a responsive design.

## ✨ Features

- **Interactive Hero Section** with typewriter animation and floating elements
- **About Section** with animated skill progress bars and achievement stats
- **Skills & Technologies** showcase with categorized tech stack
- **Project Portfolio** with filtering, hover effects, and clean project cards
- **Testimonials Carousel** with auto-slide functionality and smooth transitions
- **Contact Form** with validation and beautiful animations
- **Responsive Design** optimized for all devices and screen sizes
- **Smooth Scrolling Navigation** with active section highlighting
- **Loading Screen** with progress animation and brand elements
- **SEO Optimized** with proper meta tags and semantic HTML
- **🔥 Terminal Mode** - Unique hacker-style terminal interface with 18+ commands
- **📊 Centralized Data** - Single source of truth for all portfolio information
- **⚡ Performance Optimized** - Fast loading with code splitting and lazy loading

### 🖥️ Terminal Commands

The terminal mode offers an immersive, command-line portfolio experience with proper Unix-like directory structure:

- `help` - Show all available commands
- `ls [dir]` - List files and directories (try: `ls`, `ls projects`)
- `projects` - List all projects with details and technologies
- `cat [file]` - Display file contents (try: `resume.txt`, `projects/sds-portal`)
- `pwd` - Show current directory
- `whoami` - Display user information
- `contact` - Show contact information and social links
- `date` - Show current date and time
- `clear` - Clear terminal screen
- `tree` - Show complete project directory structure
- `ps` - Display running skills/processes
- `top` - Show system resource usage with skills
- `neofetch` - Creative system information display
- `fortune` - Get random programming quotes
- `sudo hire-me` - Execute hiring protocol with animated contact form
- `gui` - Return to graphical portfolio interface
- `exit` - Exit terminal mode

**Terminal Features**:

- ⌨️ Command history navigation (↑/↓ arrow keys)
- 🔄 Tab auto-completion for commands
- 📁 Proper directory structure (`projects/` contains all project files)
- 🎨 Matrix-style green terminal aesthetic

### 🗃️ Data Architecture

The portfolio uses a **centralized data store** (`/src/data/portfolio.ts`) with TypeScript interfaces for type safety:

- **Skills & Technologies** - Shared between SkillsSection and terminal commands
- **Contact Information** - Used across ContactSection, FooterSection, and terminal
- **Social Links** - Consistent across all components and interfaces
- **Personal Information** - Centralized profile data with company and status
- **Projects Portfolio** - Clean project data focused on content and technologies
- **Certifications & Achievements** - Professional accomplishments and credentials

**Benefits**:

- ✅ **Single Source of Truth** - Update once, reflects everywhere
- ✅ **Type Safety** - TypeScript interfaces prevent data errors
- ✅ **Consistency** - Same data across GUI and terminal interfaces
- ✅ **Maintainability** - Easy to add new projects or update information

## 🛠️ Built With

- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe JavaScript with interfaces and strict typing
- **Vite** - Fast build tool and dev server with hot module replacement
- **Tailwind CSS** - Utility-first CSS framework for rapid development
- **Vue Router** - Official router for Vue.js for seamless navigation
- **shadcn-vue** - Beautiful, accessible UI components built on Radix Vue
- **@vueuse/core** - Collection of Vue composition utilities for enhanced functionality
- **Iconify** - Comprehensive icon framework with thousands of icons

### 🏗️ Architecture

- **Component-based Architecture** - Modular Vue 3 components
- **TypeScript Interfaces** - Type-safe data structures
- **Centralized Data Store** - Single source of truth pattern
- **Responsive Design System** - Mobile-first approach with Tailwind
- **Route-based Navigation** - Vue Router for SPA functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EvanieWares/evaniewares.github.io.git
   cd evaniewares.github.io
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Responsive Design

The website is fully responsive and optimized for:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🎨 Customization

### Colors & Theming

- Edit CSS custom properties in `src/index.css`
- Modify Tailwind config in `tailwind.config.js`

### Content

- **Hero Section**: Update personal info in `HeroSection.vue`
- **About**: Modify experience and skills in `AboutSection.vue`
- **Projects**: Add your projects in `ProjectsSection.vue`
- **Testimonials**: Update client reviews in `TestimonialsSection.vue`
- **Contact**: Configure contact info in `ContactSection.vue`

## 🌟 Key Components

### 1. Hero Section

- Animated avatar and typewriter effect
- Social links and call-to-action buttons
- Floating background animations

### 2. About Section

- Personal introduction and experience
- Animated skill progress bars
- Achievement statistics

### 3. Skills Section

- Categorized skill showcase
- Interactive technology stack
- Certifications and achievements

### 4. Projects Section

- Filterable project portfolio
- Hover effects and project details
- GitHub and demo links

### 5. Testimonials

- Carousel with auto-slide
- Client reviews and ratings
- Company stats

### 6. Contact Section

- Interactive contact form
- Contact information
- Social media links

## 🎯 Performance Features

- **Lazy Loading** for images and components
- **Code Splitting** with dynamic imports
- **Optimized Assets** with Vite bundling
- **Progressive Enhancement** for slower connections
- **Accessibility** compliance (WCAG 2.1)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/EvanieWares/evaniewares.github.io/issues).

## 📞 Contact

- **Email**: evaniewares@gmail.com
- **Twitter**: [EvanieWares](https://twitter.com/EvanieWares)
- **LinkedIn**: [Chisomo Psyelera](https://linkedin.com/in/chisopsyelera)
- **Instagram**: [PsyByte Labs](https://instagram.com/psybytelabs)
- **GitHub**: [EvanieWares](https://github.com/EvanieWares)
- **Website**: [evaniewares.github.io](https://evaniewares.github.io)

---

⭐ Star this repo if you found it helpful!
