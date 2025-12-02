import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import ElectricBorder from './components/ElectricBorder';
import DecryptedText from './components/DecryptedText';
// ... (The rest of your code using <DecryptedText />)
import './Portfolio.css';
import profilePic from './assets/Pic.jpg'; // use the new Pic.jpg from assets
import lootLanding from './assets/LootBxLanding.png';
import lootLogo from './assets/LootBxLogo.jpg';
import alacincoLanding from './assets/AlacincoLanding.png';
import alacincoLogo from './assets/AlacincoLogo.png';
import resume from './assets/resume.pdf';



export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  // show update popup every page load (not persisted)
  const [showUpdateModal, setShowUpdateModal] = useState(true);
  useEffect(() => {
    // ensure modal opens on mount (works on mobile & desktop)
    setShowUpdateModal(true);
  }, []);

  // lock background scroll while modal open
  useEffect(() => {
    document.body.style.overflow = showUpdateModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showUpdateModal]);

  const handleLinkClick = (e) => {
  e.preventDefault(); // prevent default navigation
  setShowLinkModal(true); // open the modal
};



  // close on Escape
  useEffect(() => {
    if (!showUpdateModal) return;
    const onKey = (e) => { if (e.key === 'Escape') setShowUpdateModal(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showUpdateModal]);

  const roles = ['Software QA Tester Engineer', 'Front-End Developer'];

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

  // categorized technologies (use colored brand icons where possible)
  const techCategories = [
    {
      category: 'Frontend',
      items: [
        { name: 'React', url: 'https://reactjs.org/', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Tailwind CSS', url: 'https://tailwindcss.com/', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' }
      ]
    },
    {
      category: 'Backend / DB',
      items: [
        { name: 'Python', url: 'https://www.python.org/', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'MongoDB', url: 'https://www.mongodb.com/', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'MySQL', url: 'https://www.mysql.com/', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
      ]
    },
    {
      category: 'Testing & Automation',
      items: [
        { name: 'Playwright', url: 'https://playwright.dev/', logo: 'https://logo.clearbit.com/playwright.dev' },
        { name: 'Pytest', url: 'https://docs.pytest.org/', logo: 'https://logo.clearbit.com/pytest.org' },
        { name: 'Postman', url: 'https://www.postman.com/', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
        { name: 'Selenium', url: 'https://www.selenium.dev/', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg' }
      ]
    },
    {
      category: 'Tools & Collaboration',
      items: [
        { name: 'GitHub', url: 'https://github.com/', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'VS Code', url: 'https://code.visualstudio.com/', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Jira', url: 'https://www.atlassian.com/software/jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
        { name: 'PyCharm', url: 'https://www.jetbrains.com/pycharm/', logo: 'https://logo.clearbit.com/pycharm.jetbrains.com' },
        { name: 'TestRail', url: 'https://www.gurock.com/testrail', logo: 'https://logo.clearbit.com/gurock.com' },
        { name: 'Bugzilla', url: 'https://www.bugzilla.org/', logo: 'https://logo.clearbit.com/bugzilla.org' },
        { name: 'Vercel', url: 'https://vercel.com/', logo: 'https://logo.clearbit.com/vercel.com' }
      ]
    },
    {
      category: 'Productivity & Remote',
      items: [
        { name: 'Google Workspace', url: 'https://workspace.google.com/', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
        { name: 'MS Office', url: 'https://www.microsoft.com/microsoft-365', logo: 'https://logo.clearbit.com/microsoft.com' },
        { name: 'AnyDesk', url: 'https://anydesk.com/', logo: 'https://logo.clearbit.com/anydesk.com' },
        { name: 'Redmine', url: 'https://www.redmine.org/', logo: 'https://logo.clearbit.com/redmine.org' }
      ]
    },
    {
      category: 'Hardware / Troubleshooting',
      items: [
        // non-clickable; will render wrench SVG
        { name: 'Computer Troubleshooting', url: null, logo: null, clickable: false }
      ]
    }
  ];

  const projects = [
    {
      title: 'Manufacturing Admin',
      description: 'Full-stack manufacturing management system with admin dashboard for managing production, inventory, and operations.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS', 'Daisy UI'],
      link: '#'
    },
    {
      title: 'Task Management',
      description: 'Collaborative task management tool with real-time updates and team features',
      tech: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
      link: '#'
    },
    {
      title: 'Automated Testing Suite',
      description: 'Comprehensive testing framework for web applications with CI/CD integration.',
      tech: ['Selenium', 'Python', 'Pytest', 'Playwright'],
      link: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio website with animations and responsive design.',
      tech: ['React', 'Tailwind CSS', 'Vercel'],
      link: '#'
    },
   {
      title: 'Interactive Dashboard / Analytics Panel',
      description: 'Modern, responsive dashboard visualizing data with charts, tables, and filters.',
      tech: ['React', 'Tailwind CSS', 'API', 'Chart.js', 'JavaScript'],
      link: '#'
    },
    {
      title: 'E-Commerce / Product Catalog Frontend',
      description: 'Sleek, responsive storefront with product listings, search, filters, and shopping cart.',
      tech: ['React', 'Tailwind CSS', 'Shadcn', 'Daisy UI'],
      link: '#'
    },
    {
      title: 'Weather App',
      description: 'Real-time weather updates with forecasts for any location.',
      tech: ['React', 'Tailwind CSS', 'API', 'JavaScript'],
      link: '#'
    },
        {
      title: 'World Clock',
      description: 'Displays current time across multiple cities worldwide.',
      tech: ['React', 'Tailwind CSS',],
      link: '#'
    }

    
  ];

  const testedWebsites = [
    // LootBx (keeps existing images)
    {
      title: 'LootBx',
      description: 'Streaming platform with tokenized rewards and airdrops for viewers.',
      type: 'Streaming / DropLoot / Tokenized',
      features: [
        'Video streaming stability & latency',
        'Live chat and real-time interactions',
        'Authentication, payments & reward flows',
        'Token & reward distribution',
        'And More'
      ],
      url: 'https://lootbx.com/',
      landing: lootLanding,
      logo: lootLogo
    },
    // Alacinco (keeps images)
    {
      title: 'Alacinco',
      description: 'Airbnb-style booking platform with crypto payment integration.',
      type: 'AirBnb - Property Booking Platform',
      features: [
        'Booking flow & calendar availability',
        'Crypto payment integration',
        'Search, filters & listing UX',
        'Security & data validation',
        'And More'
      ],
      url: 'https://alacinco.com/',
      landing: alacincoLanding,
      logo: alacincoLogo
    },
    // Placeholder "More" card (spans second row)
    {
      title: 'More',
      description: 'Additional websites tested — content will be updated soon.',
      type: '',
      features: [],
      url: '#',
      landing: null,
      logo: null,
      placeholder: true
    }
  ];

  // close modals on outside click
  const closeModal = (setter) => (e) => {
    if (e.target.closest('.modal-content')) return;
    setter(false);
  };

  // missing modal / mobile-nav state (prevents runtime ReferenceError -> white screen)
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // helper to scroll to sections (used in header / mobile nav)
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 72; // adjust if your header height differs
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Update modal (centered) */}
      {showUpdateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowUpdateModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-auto shadow-xl"
          >
            <h3 id="update-modal-title" className="text-lg sm:text-xl font-semibold mb-3 text-center">
              Some sections are still being updated and need to Fix (Some Bugs and Defect)
            </h3>
            <p className="mb-6 text-center text-sm text-gray-700 dark:text-gray-300">
              Real content and details will be added soon!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none w-full sm:w-auto"
              >
                Noted!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email modal */}
      {showEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-9999 px-4">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl p-6 max-w-sm w-full shadow-xl text-center">
            <h3 className="text-lg font-semibold mb-2">Email me</h3>
            <p className="mb-4 text-sm wrap-break-word">abdulwahid01.abdul@gmail.com</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                Exit
              </button>
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Open Gmail
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Work Experience modal (roadmap style) */}
      {showWorkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Work Experience</h3>
              <button
                onClick={() => setShowWorkModal(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md p-2"
                aria-label="Close work experience"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Current - Socia */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />
                  <div className="w-px bg-gray-200 dark:bg-gray-700 flex-1" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Software QA Engineer</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Socia, Taguig City</p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">10/2025 – Present</div>
                  </div>
                  <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                    <li>Serve as the one‑man QA for the team, independently managing all testing responsibilities across multiple projects.</li>
                    <li>Handle numerous large, high‑traffic client websites, ensuring quality, stability, and seamless user experience.</li>
                    <li>Perform comprehensive manual and automation testing, including functional, regression, and cross‑browser testing.</li>
                    <li>Create clear and detailed bug reports and oversee ticketing and issue‑tracking processes.</li>
                    <li>Develop and execute test plans, scenarios, and test cases tailored to each assigned website.</li>
                  </ul>
                </div>
              </div>

              {/* Previous - IT STORE PERSONNEL */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />
                  <div className="w-px bg-gray-200 dark:bg-gray-700 flex-1" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">IT STORE PERSONNEL</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">PC Express, San Juan City</p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">09/2025 – 10/2025</div>
                  </div>
                  <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                    <li>Provided sales support and product recommendations to customers, improving overall client satisfaction.</li>
                    <li>Assembled, configured, and tested PCs and IT equipment, ensuring optimal performance before handover.</li>
                    <li>Performed software installation, troubleshooting, and product demonstrations for customers.</li>
                    <li>Maintained inventory management and documentation of IT products and stocks.</li>
                    <li>Supported both technical and sales operations, bridging customer needs with technical expertise.</li>
                  </ul>
                </div>
              </div>

              {/* Earlier - Intern */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />
                  <div className="w-px bg-gray-200 dark:bg-gray-700 flex-1" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">IT DESKTOP SUPPORT ENGINEER INTERN</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tech Mahindra, Eastwood Q.C</p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">04/2025 – 06/2025</div>
                  </div>
                  <ul className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                    <li>Diagnosed and resolved hardware, software, and network issues, ensuring system reliability and performance.</li>
                    <li>Assisted with system reimaging, configuration, and deployment, validating functionality post-installation.</li>
                    <li>Managed user access and permissions in Active Directory, supporting secure environments.</li>
                    <li>Documented technical issues, test results, and resolutions to support process improvements.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
          <nav className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AWMA
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => { setMobileNavOpen(false); scrollToSection('home'); }} className={`hover:text-blue-600 transition-colors ${activeSection === 'home' ? 'text-blue-600 font-semibold' : ''}`}>Home</button>
              <button onClick={() => { setMobileNavOpen(false); scrollToSection('about'); }} className={`hover:text-blue-600 transition-colors ${activeSection === 'about' ? 'text-blue-600 font-semibold' : ''}`}>About Me</button>
              <button onClick={() => { setMobileNavOpen(false); scrollToSection('skills'); }} className={`hover:text-blue-600 transition-colors ${activeSection === 'skills' ? 'text-blue-600 font-semibold' : ''}`}>Skills</button>
              <button onClick={() => { setMobileNavOpen(false); scrollToSection('projects'); }} className={`hover:text-blue-600 transition-colors ${activeSection === 'projects' ? 'text-blue-600 font-semibold' : ''}`}>Projects</button>
              <button onClick={() => { setMobileNavOpen(false); scrollToSection('tested'); }} className={`hover:text-blue-600 transition-colors ${activeSection === 'tested' ? 'text-blue-600 font-semibold' : ''}`}>Tested</button>
              <button onClick={() => setShowWorkModal(true)} className="hover:text-blue-600 transition-colors">Work Experience</button>
              <Button onClick={() => { setMobileNavOpen(false); scrollToSection('hire'); }} className="bg-blue-600 hover:bg-blue-700 hidden lg:inline-flex">
                Hire Me
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {/* <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button> */}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md ml-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={mobileNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile nav panel */}
          <div className={`md:hidden ${mobileNavOpen ? 'block' : 'hidden'}`} aria-hidden={!mobileNavOpen}>
            <div className={`px-4 pb-4 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 ${mobileNavOpen ? '' : 'pointer-events-none'}`}>
               <button onClick={() => { setMobileNavOpen(false); scrollToSection('home'); }} className="w-full text-left py-2">Home</button>
               <button onClick={() => { setMobileNavOpen(false); scrollToSection('about'); }} className="w-full text-left py-2">About Me</button>
               <button onClick={() => { setMobileNavOpen(false); scrollToSection('skills'); }} className="w-full text-left py-2">Skills</button>
               <button onClick={() => { setMobileNavOpen(false); scrollToSection('projects'); }} className="w-full text-left py-2">Projects</button>
               <button onClick={() => { setMobileNavOpen(false); scrollToSection('tested'); }} className="w-full text-left py-2">Tested</button>
               <button onClick={() => { setMobileNavOpen(false); setShowWorkModal(true); }} className="w-full text-left py-2">Work Experience</button>
               <button onClick={() => { setMobileNavOpen(false); scrollToSection('hire'); }} className="w-full text-left py-2">Hire Me</button>
             </div>
           </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="pt-28 pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center">
<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
  Hi, I'm{' '}
  <DecryptedText
    text="ABDULWAHID ABDUL"
    animateOn="repeat"          // *** NEW: Tells the component to repeat ***
    repeatInterval={5000}       // *** NEW: Repeats every 5 seconds (5000ms) ***
    
    sequential={true} 
    speed={100}                  // Optional: Make character speed faster
    
    className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
    parentClassName="inline"
  />
</h1>
              <div className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 h-12 flex items-center justify-center">
                <span className="mr-2">{typedText}</span>
                <span className="animate-blink">|</span>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                Crafting elegant solutions through code and ensuring quality through rigorous testing. Recent graduate with hands-on experience in front-end development and QA testing.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                  onClick={() => scrollToSection('projects')}
                >
                  View Projects
                </Button>
      <a href={resume} target="_blank" rel="noopener noreferrer">
        <Button size="lg" variant="outline" className="w-full sm:w-auto">
          Download CV
        </Button>
      </a>


              </div>
            </div>
          </div>
        </section>

        {/* About Me Section (image left, content right) */}
        <section id="about" className="py-16 px-4 sm:px-6 bg-gray-800 text-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">About Me</h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Profile image */}
              <div className="flex justify-center md:justify-end">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transform hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800">
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Right: About text card */}
              <div className="bg-transparent rounded-2xl p-8">
                <p className="text-gray-200 dark:text-gray-300 mb-4 text-lg">
                  I'm a recent graduate with a strong foundation in quality assurance and front-end development. I have
                  hands-on experience from projects and internships, building web applications and testing them to ensure
                  they meet high standards of quality and performance.
                </p>

                <p className="text-gray-400 dark:text-gray-400 mb-6 text-lg">
                  When I'm not coding or testing, you can find me exploring new technologies, contributing to open-source
                  projects, or sharing knowledge with the developer community.
                </p>

                <div className="flex items-center justify-end gap-4 mt-6">
                  <a
                    href="https://github.com/capzlock35"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub (opens in new tab)"
                    className="p-3 bg-black/20 rounded-full hover:bg-black/30 transition"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/abdulwahidabdul"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn (opens in new tab)"
                    className="p-3 bg-blue-700 rounded-full hover:bg-blue-800 transition"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>

                  <button
                    onClick={() => setShowEmailModal(true)}
                    aria-label="Email"
                    className="p-3 bg-black/20 rounded-full hover:bg-black/30 transition"
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

{/* Role Section */}
<section id="role" className="py-20 px-6">
  <div className="container mx-auto max-w-6xl">
    <h2 className="text-4xl font-bold mb-12 text-center">What I Do</h2>
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* 1. QA Tester Card wrapped in ElectricBorder */}
      <ElectricBorder
        color="#00A2FF" // Blue border color
        speed={1.5}     // Slightly faster speed
        chaos={0.6}
        thickness={2}
        // Use inline style to apply a standard border radius (matching the Card's default)
        style={{ borderRadius: 12 }} 
      >
        {/* The Card component is now a child. 
            We override its default border to prevent double borders, 
            but keep the background and shape. */}
        <Card className="border-2 border-transparent hover:border-transparent transition-colors h-full">
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
              <li>• And More</li>
            </ul>
          </CardContent>
        </Card>
      </ElectricBorder>

      {/* 2. Front-End Developer Card wrapped in ElectricBorder */}
      <ElectricBorder
        color="#7C3AED" // Purple border color
        speed={1.5}     // Slightly faster speed
        chaos={0.6}
        thickness={2}
        // Use inline style to apply a standard border radius (matching the Card's default)
        style={{ borderRadius: 12 }} 
      >
        {/* The Card component is now a child. 
            We override its default border to prevent double borders, 
            but keep the background and shape. */}
        <Card className="border-2 border-transparent hover:border-transparent transition-colors h-full">
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
              <li>• And More</li>
            </ul>
          </CardContent>
        </Card>
      </ElectricBorder>
      
    </div>
  </div>
</section>

        {/* Skills & Technologies - categorized with logos */}
        <section id="skills" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Skills & Technologies</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {techCategories.map((cat) => (
                <div key={cat.category} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-4">{cat.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {cat.items.map((it) => {
                      const isClickable = it.clickable === false ? false : Boolean(it.url);
                      // anchor vs plain div based on clickable
                      const Wrapper = isClickable ? 'a' : 'div';
                      const wrapperProps = isClickable
                        ? {
                            href: it.url || '#',
                            target: it.url && it.url !== '#' ? '_blank' : '_self',
                            rel: it.url && it.url !== '#' ? 'noopener noreferrer' : undefined,
                            className: 'flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-md hover:shadow transition text-sm'
                          }
                        : { className: 'flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm' };

                      return (
                        <Wrapper key={it.name} {...wrapperProps}>
                          {/* Computer Troubleshooting -> show inline wrench svg */}
                          {it.name === 'Computer Troubleshooting' ? (
                            <span className="w-5 h-5 inline-flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                                <path d="M21 8v6a2 2 0 0 1-2 2h-3" />
                                <path d="M14 8L9 13" />
                                <path d="M10 3L21 14" />
                                <path d="M7 21a4 4 0 0 1-4-4 4 4 0 0 1 4-4h3" />
                              </svg>
                            </span>
                          ) : it.logo ? (
                            <img
                              src={it.logo}
                              alt={`${it.name} logo`}
                              className="w-5 h-5 object-contain"
                              onError={(e) => {
                                // replace broken logo with a small placeholder showing first letter
                                const ch = encodeURIComponent(it.name.charAt(0));
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://via.placeholder.com/24/cccccc/000000?text=${ch}`;
                              }}
                            />
                          ) : (
                            <div className="w-5 h-5 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-xs">{it.name.charAt(0)}</div>
                          )}
                          <span>{it.name}</span>
                        </Wrapper>
                      );
                    })}
                  </div>
                </div>
              ))}
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
                    <ExternalLink
                      className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer"
                      onClick={handleLinkClick} // <-- trigger modal here
                    />
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

              {showLinkModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl p-6 max-w-sm w-full shadow-xl text-center">
            <h3 className="text-lg font-semibold mb-2">Link Not Available</h3>
            <p className="mb-4 text-sm">
              This project link is not available for now. Check my{' '}
              <a
                href="https://github.com/capzlock35"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                GitHub
              </a>{' '}
              for projects.
            </p>
            <button
              onClick={() => setShowLinkModal(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}


        {/* Websites Tested Section */}
        <section id="tested" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Websites I've Tested</h2>

            {/* Grid with two cards: LootBx then Alacinco */}
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {testedWebsites.map((site, idx) => {
                // placeholder card should span the full width on md+ (second row)
                const wrapperClass = site.placeholder ? 'block h-full md:col-span-2' : 'block h-full';
                return (
                  <a
                    key={idx}
                    href={site.url || '#'}
                    target={site.url && site.url !== '#' ? '_blank' : '_self'}
                    rel={site.url && site.url !== '#' ? 'noopener noreferrer' : undefined}
                    className={wrapperClass}
                  >
                    <Card className="h-full flex flex-col hover:shadow-xl transition-shadow overflow-visible">
                      <div className="relative">
                        {site.landing ? (
                          <img src={site.landing} alt={`${site.title} preview`} className="w-full h-56 sm:h-64 md:h-72 object-cover" />
                        ) : (
                          <div className="w-full h-56 sm:h-64 md:h-72 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400 font-semibold">{site.title}</span>
                          </div>
                        )}

                        {site.logo && (
                          <img
                            src={site.logo}
                            alt={`${site.title} logo`}
                            className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-lg"
                          />
                        )}
                      </div>

                      {/* For placeholder, show centered message */}
                      {site.placeholder ? (
                        <CardContent className="pt-12 flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <h3 className="text-2xl font-semibold mb-2">More</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Additional websites tested — will be updated soon.</p>
                          </div>
                        </CardContent>
                      ) : (
                        <CardContent className={site.logo ? 'pt-12 flex-1' : 'pt-6 flex-1'}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{site.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{site.type}</p>
                            </div>
                            <ExternalLink className="w-5 h-5 text-gray-400" />
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{site.description}</p>

                          {site.features && site.features.length > 0 && (
                            <>
                              <p className="mt-3 font-semibold text-sm text-gray-700 dark:text-gray-300">Key Areas Tested:</p>
                              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                {site.features.map((f, i) => (
                                  <li key={i}>{f}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  </a>
                );
              })}
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
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setShowEmailModal(true)} // <-- open the modal
            >
              Get In Touch
            </Button>

              {/* <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Call
              </Button> */}
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