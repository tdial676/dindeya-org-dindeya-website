/**
 * Hero section component
 */

import { createElement, appendChildren } from '@/utils/dom';
import { CTA, ComponentOptions } from '@/types/index';

interface HeroOptions extends ComponentOptions {
  headline: string;
  subheadline: string;
  description: string;
  ctas: CTA[];
  backgroundImage?: string;
}

export class Hero {
  private options: HeroOptions;

  constructor(options: HeroOptions) {
    this.options = options;
  }

  render(): HTMLElement {
    const section = createElement('section', {
      classes: ['hero'],
      attributes: this.options.backgroundImage
        ? { style: `background-image: url('${this.options.backgroundImage}')` }
        : {},
    });

    const heroContent = createElement('div', { classes: ['hero-content'] });

    const h1 = createElement('h1', {
      textContent: this.options.headline,
    });

    const tagline = createElement('p', {
      classes: ['tagline'],
      textContent: this.options.subheadline,
    });

    const description = createElement('p', {
      textContent: this.options.description,
    });

    const ctaContainer = createElement('div', {
      classes: ['flex', 'flex-center'],
      attributes: { style: 'gap: 1rem; margin-top: 2rem;' },
    });

    const ctaElements = this.options.ctas.map((cta) =>
      createElement('a', {
        classes: ['btn', `btn-${cta.variant || 'primary'}`, 'btn-lg'],
        attributes: { href: cta.href },
        textContent: cta.label,
      })
    );

    appendChildren(ctaContainer, ...ctaElements);
    appendChildren(heroContent, h1, tagline, description, ctaContainer);
    appendChildren(section, heroContent);

    return section;
  }
}
