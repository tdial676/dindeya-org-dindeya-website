/**
 * Footer component
 */

import { createElement, appendChildren } from '@/utils/dom';
import { SITE_CONFIG } from '@/config/site.config';

export class Footer {
  render(): HTMLElement {
    const footer = createElement('footer');
    const container = createElement('div', { classes: ['container'] });

    const grid = createElement('div', {
      classes: ['grid', 'grid-3'],
      attributes: { style: 'gap: 2rem; margin-bottom: 2rem;' },
    });

    // Organization info
    const orgInfo = createElement('div');
    const orgName = createElement('h3', {
      textContent: SITE_CONFIG.organization,
    });
    const tagline = createElement('p', {
      textContent: SITE_CONFIG.tagline,
      attributes: { style: 'color: #87A96B; font-weight: bold; margin-top: 0.5rem;' },
    });
    appendChildren(orgInfo, orgName, tagline);

    // Quick links
    const quickLinks = createElement('div');
    const quickLinksTitle = createElement('h4', { textContent: 'Quick Links' });
    const linksList = createElement('ul', {
      attributes: { style: 'list-style: none; padding: 0;' },
    });

    const links = SITE_CONFIG.footer.quickLinks.map((link) => {
      const li = createElement('li', { attributes: { style: 'margin-bottom: 0.5rem;' } });
      const a = createElement('a', {
        attributes: { href: link.href },
        textContent: link.label,
      });
      li.appendChild(a);
      return li;
    });

    appendChildren(linksList, ...links);
    appendChildren(quickLinks, quickLinksTitle, linksList);

    // Contact
    const contact = createElement('div');
    const contactTitle = createElement('h4', { textContent: 'Contact' });
    const email = createElement('p', {
      innerHTML: `<a href="mailto:${SITE_CONFIG.contactEmail}">${SITE_CONFIG.contactEmail}</a>`,
    });
    appendChildren(contact, contactTitle, email);

    appendChildren(grid, orgInfo, quickLinks, contact);

    // Bottom
    const bottom = createElement('div', {
      classes: ['footer-bottom'],
      attributes: {
        style: 'border-top: 1px solid #ddd; padding-top: 1.5rem; text-align: center;',
      },
    });

    const copyright = createElement('p', {
      textContent: SITE_CONFIG.footer.copyright,
      attributes: { style: 'font-size: 0.9rem; color: #666;' },
    });

    bottom.appendChild(copyright);
    appendChildren(container, grid, bottom);
    appendChildren(footer, container);

    return footer;
  }
}
