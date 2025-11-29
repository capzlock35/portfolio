import React, { useState, useEffect } from 'react';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import './Portfolio.css';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [showUpdateModal, setShowUpdateModal] = useState(true);
  const roles = ['Software QA Tester Engineer', 'Front-End Developer'];

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [darkMode]);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && typedText === currentRole) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setTypedText(
        isDeleting
          ? currentRole.substring(0, typedText.length - 1)
          : currentRole.substring(0, typedText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'role', 'skills', 'projects', 'tested', 'hire'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '🎨' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Tailwind CSS', icon: '💨' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Express', icon: '🚂' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Python', icon: '🐍' },
    { name: 'Selenium', icon: '🧪' },
    { name: 'Jest', icon: '🃏' },
    { name: 'Cypress', icon: '🌲' },
    { name: 'Postman', icon: '📮' },
    { name: 'Git', icon: '📦' },
    { name: 'Docker', icon: '🐋' },
    { name: 'Jira', icon: '📊' },
    { name: 'Figma', icon: '🎯' }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with payment integration and admin dashboard',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team features',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      link: '#'
    },
    {
      title: 'Automated Testing Suite',
      description: 'Comprehensive testing framework for web applications with CI/CD integration',
      tech: ['Selenium', 'Python', 'Jenkins', 'Docker'],
      link: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio website with animations and responsive design',
      tech: ['React', 'Tailwind CSS', 'Framer Motion'],
      link: '#'
    }
  ];

  const testedWebsites = [
    {
      title: 'Live Streaming Platform',
      description: 'Comprehensive QA testing for real-time video streaming platform with chat and analytics',
      type: 'Manual & Automated Testing',
      features: ['Video streaming', 'Live chat', 'User authentication', 'Payment processing']
    },
    {
      title: 'CRM System',
      description: 'End-to-end testing of customer relationship management system for enterprise clients',
      type: 'Functional & Integration Testing',
      features: ['Contact management', 'Sales pipeline', 'Reporting dashboard', 'Email integration']
    },
    {
      title: 'E-Commerce Platform',
      description: 'Quality assurance for multi-vendor marketplace with complex payment flows',
      type: 'Performance & Security Testing',
      features: ['Product catalog', 'Shopping cart', 'Checkout process', 'Inventory management']
    },
    {
      title: 'Booking System',
      description: 'Testing of appointment scheduling platform with calendar integration and notifications',
      type: 'UI/UX & API Testing',
      features: ['Calendar booking', 'Email reminders', 'Payment gateway', 'Admin dashboard']
    },
    {
      title: 'ERP Solution',
      description: 'Comprehensive testing of enterprise resource planning system for manufacturing',
      type: 'System & Regression Testing',
      features: ['Inventory control', 'Financial reporting', 'HR management', 'Supply chain']
    }
  ];

  useEffect(() => {
    document.body.style.overflow = showUpdateModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showUpdateModal]);

  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Update modal (centered) */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999] px-4">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl p-8 max-w-lg w-full shadow-xl text-center">
            <h3 className="text-xl font-semibold mb-3">Some sections are still being updated</h3>
            <p className="mb-6">Real content and details will be added soon!</p>
            <button
              onClick={() => setShowUpdateModal(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Noted!
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AWMA
              </div>
              
              <div className="flex items-center space-x-8">
                <button onClick={() => scrollToSection('home')} className={`hover:text-blue-600 transition-colors ${activeSection === 'home' ? 'text-blue-600 font-semibold' : ''}`}>Home</button>
                <button onClick={() => scrollToSection('about')} className={`hover:text-blue-600 transition-colors ${activeSection === 'about' ? 'text-blue-600 font-semibold' : ''}`}>About Me</button>
                <button onClick={() => scrollToSection('skills')} className={`hover:text-blue-600 transition-colors ${activeSection === 'skills' ? 'text-blue-600 font-semibold' : ''}`}>Skills</button>
                <button onClick={() => scrollToSection('projects')} className={`hover:text-blue-600 transition-colors ${activeSection === 'projects' ? 'text-blue-600 font-semibold' : ''}`}>Projects</button>
                <button onClick={() => scrollToSection('tested')} className={`hover:text-blue-600 transition-colors ${activeSection === 'tested' ? 'text-blue-600 font-semibold' : ''}`}>Tested</button>
                <Button onClick={() => scrollToSection('hire')} className="bg-blue-600 hover:bg-blue-700">
                  Hire Me
                </Button>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Hi, I'm <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ABDULWAHID ABDUL</span>
              </h1>
              <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 h-12 flex items-center justify-center">
                <span className="mr-2">{typedText}</span>
                <span className="animate-blink">|</span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                Crafting elegant solutions through code and ensuring quality through rigorous testing. Recent graduate with hands-on experience in front-end development and QA testing.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => scrollToSection('projects')}
                >
                  View Projects
                </Button>
                <Button size="lg" variant="outline">
                  Download CV
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-6">
                I'm a recent graduate with a strong foundation in quality assurance and front-end development. I have
                hands-on experience from projects and internships, building web applications and testing them to ensure
                they meet high standards of quality and performance.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
                When I'm not coding or testing, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <a href="#" className="p-3 bg-white dark:bg-gray-900 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-white dark:bg-gray-900 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-white dark:bg-gray-900 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

        {/* Role Section */}
        <section id="role" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center">What I Do</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-blue-600 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">QA Tester</CardTitle>
                  <CardDescription>Ensuring Reliability & Quality</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    I apply thorough testing strategies to help deliver stable and reliable applications. I approach QA as an integral part of the development process.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Manual and exploratory testing</li>
                    <li>• Writing and executing test cases</li>
                    <li>• Bug reporting and documentation</li>
                    <li>• Automated testing knowledge Using Pytest,Playwright</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-purple-600 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">Front-End Developer</CardTitle>
                  <CardDescription>Building Interactive & User-Friendly Web Interfaces</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    I create responsive and accessible web applications using modern front-end technologies. I focus on clean, maintainable code and practical user experiences.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Front-end development with React, Tailwind, Javascript and More.</li>
                    <li>• Responsive design and mobile-first approach</li>
                    <li>• UI optimization and accessibility</li>
                    <li>• Working knowledge of RESTful APIs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
            <div className="space-y-8">
              {/* First Row - Scroll Right to Left */}
              <div className="relative">
                <div className="flex animate-scroll-left">
                  {/* First set of skills */}
                  {skills.slice(0, 10).map((skill, index) => (
                    <div
                      key={`skill-1-${index}`}
                      className="shrink-0 mx-4 group"
                    >
                      <div className="relative">
                        <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30">
                          {skill.icon}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                            {skill.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {skills.slice(0, 10).map((skill, index) => (
                    <div
                      key={`skill-dup-1-${index}`}
                      className="shrink-0 mx-4 group"
                    >
                      <div className="relative">
                        <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30">
                          {skill.icon}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                            {skill.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Second Row - Scroll Left to Right */}
              <div className="relative">
                <div className="flex animate-scroll-right">
                  {/* First set of skills */}
                  {skills.slice(10).map((skill, index) => (
                    <div
                      key={`skill-2-${index}`}
                      className="shrink-0 mx-4 group"
                    >
                      <div className="relative">
                        <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30">
                          {skill.icon}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                            {skill.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {skills.slice(10).map((skill, index) => (
                    <div
                      key={`skill-dup-2-${index}`}
                      className="shrink-0 mx-4 group"
                    >
                      <div className="relative">
                        <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30">
                          {skill.icon}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                            {skill.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Websites Tested Section */}
        <section id="tested" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-4 text-center">Websites I've Tested</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Quality assurance experience across diverse platforms and industries
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testedWebsites.map((website, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{website.title}</CardTitle>
                    <CardDescription className="text-purple-600 dark:text-purple-400 font-semibold">
                      {website.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      {website.description}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Key Areas Tested:</p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {website.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-600 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hire Me Section */}
        <section id="hire" className="py-20 px-6 bg-linear-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-xl mb-8 opacity-90">
              I'm currently available for freelance projects and full-time opportunities. 
              Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Get In Touch
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Call
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                © 2025 AWMA. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}