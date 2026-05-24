/**
 * Main application entry point
 * Initializes PWA and renders components
 */

import { registerServiceWorker, setupInstallPrompt } from '@/utils/pwa';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_CONFIG } from '@/config/site.config';
import '../assets/css/style.css';

async function initializeApp(): Promise<void> {
  console.log('🚀 Initializing Dindeya PWA...');

  // Register Service Worker for PWA capabilities
  if (SITE_CONFIG.features.serviceWorker) {
    await registerServiceWorker('/sw.js');
  }

  // Setup install prompt
  setupInstallPrompt(() => {
    console.log('Install prompt ready');
    // Optionally show "Add to Home Screen" button
  });

  // Render header and footer on all pages
  const header = new Header();
  const headerEl = header.render();
  const footerEl = new Footer().render();

  const body = document.body;
  if (body.firstChild) {
    body.insertBefore(headerEl, body.firstChild);
  } else {
    body.appendChild(headerEl);
  }

  body.appendChild(footerEl);

  // Set up page-specific initialization
  setupPageSpecific();

  // Set up global event listeners
  setupGlobalListeners();

  console.log('✅ Application initialized');
}

function setupPageSpecific(): void {
  const path = window.location.pathname;

  if (path === '/' || path.includes('index')) {
    initHomePage();
  } else if (path.includes('about')) {
    initAboutPage();
  } else if (path.includes('projects')) {
    initProjectsPage();
  } else if (path.includes('team')) {
    initTeamPage();
  } else if (path.includes('membership')) {
    initMembershipPage();
  }
}

function initHomePage(): void {
  // Dynamic import for home page specific code
  console.log('Initializing home page');
}

function initAboutPage(): void {
  console.log('Initializing about page');
}

function initProjectsPage(): void {
  console.log('Initializing projects page');
}

function initTeamPage(): void {
  console.log('Initializing team page');
}

function initMembershipPage(): void {
  // Setup form handling
  const form = document.querySelector('#membership-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleMembershipSubmit(form as HTMLFormElement);
    });
  }
}

function handleMembershipSubmit(form: HTMLFormElement): void {
  const formData = new FormData(form);
  const data = {
    email: formData.get('email'),
  };

  console.log('Membership form submitted:', data);
  // TODO: Send to backend or email service

  // Show success message
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message';
  successMsg.textContent = '✅ Thanks for your interest! We\'ll be in touch soon.';
  form.parentNode?.insertBefore(successMsg, form);

  form.reset();
  setTimeout(() => successMsg.remove(), 5000);
}

function setupGlobalListeners(): void {
  // Handle smooth scrolling for anchor links
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('a[href^="#"]');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    const element = document.querySelector(href);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Update navigation active state on scroll
  window.addEventListener('scroll', () => {
    updateNavActiveState();
  });
}

function updateNavActiveState(): void {
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = (section as HTMLElement).offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.id;
    }
  });

  if (currentSection) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
