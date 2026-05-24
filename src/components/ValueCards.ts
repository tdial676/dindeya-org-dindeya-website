/**
 * Value cards grid component
 */

import { createElement, appendChildren } from '@/utils/dom';
import { Value } from '@/types/index';

export class ValueCards {
  private values: Value[];

  constructor(values: Value[]) {
    this.values = values;
  }

  render(): HTMLElement {
    const section = createElement('section', {
      classes: ['values-section'],
      attributes: { style: 'padding: 3rem 1rem; background-color: white;' },
    });

    const container = createElement('div', { classes: ['container'] });

    const heading = createElement('h2', {
      classes: ['section-title'],
      textContent: 'Our Core Values',
      attributes: { style: 'text-align: center; margin-bottom: 2rem;' },
    });

    const grid = createElement('div', {
      classes: ['grid', 'grid-3'],
    });

    const cards = this.values.map((value) => this.createCard(value));
    appendChildren(grid, ...cards);
    appendChildren(container, heading, grid);
    appendChildren(section, container);

    return section;
  }

  private createCard(value: Value): HTMLElement {
    const card = createElement('div', { classes: ['card', 'value-card'] });

    const icon = createElement('div', {
      classes: ['value-icon'],
      textContent: value.icon,
      attributes: { style: 'font-size: 2.5rem; margin-bottom: 1rem;' },
    });

    const title = createElement('h3', {
      textContent: value.title,
    });

    const description = createElement('p', {
      textContent: value.description,
    });

    appendChildren(card, icon, title, description);
    return card;
  }
}
