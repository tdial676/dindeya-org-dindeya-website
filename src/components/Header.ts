/**
 * Header component - renders navigation and branding
 */

import { createElement, appendChildren } from '@/utils/dom';
import { SITE_CONFIG } from '@/config/site.config';

export class Header {
  private element: HTMLElement | null = null;
  private currentPath: string;

  constructor() {
    this.currentPath = window.location.pathname;
  }

  render(): HTMLElement {
    const header = createElement('header');
    const nav = createElement('nav');
    const navContainer = createElement('div', { classes: ['nav-container'] });

    // Logo
    const logo = createElement('a', {
      classes: ['logo'],
      attributes: { href: '/index.html' },
      innerHTML: `
        <img src="/assets/images/logo.png" alt="Dindeya Logo" class="logo-icon" />
        <span>Dindeya</span>
      `,
    });

    // Navigation Links
    const navLinks = createElement('ul', { classes: ['nav-links'] });
    const navItems = SITE_CONFIG.navigation.map((link) => {
      const li = createElement('li');
      const isActive = this.isActive(link.href);
      const classes = link.primary ? ['btn', 'btn-primary', 'btn-sm'] : [];
      if (isActive) classes.push('active');

      const a = createElement('a', {
        classes,
        attributes: { href: link.href },
        textContent: link.label,
      });

      li.appendChild(a);
      return li;
    });

    // Hamburger button for mobile
    const hamburger = createElement('button', {
      classes: ['hamburger'],
      attributes: { 'aria-label': 'Toggle navigation', 'aria-expanded': 'false' },
      innerHTML: `
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      `,
    });

    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navLinks.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).tagName === 'A') {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    appendChildren(navLinks, ...navItems);
    appendChildren(navContainer, logo, navLinks, hamburger);
    appendChildren(nav, navContainer);
    appendChildren(header, nav);

    this.element = header;
    return header;
  }

  private isActive(href: string): boolean {
    return this.currentPath === href || this.currentPath.endsWith(href.replace('/', '.html'));
  }

  setActive(href: string): void {
    if (!this.element) return;

    const links = this.element.querySelectorAll('a');
    links.forEach((link) => {
      const linkHref = link.getAttribute('href');
      if (linkHref === href) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
