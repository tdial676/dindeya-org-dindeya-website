/**
 * Metrics display component
 */

import { createElement, appendChildren } from '@/utils/dom';
import { Metric } from '@/types/index';

export class MetricsDisplay {
  private metrics: Metric[];

  constructor(metrics: Metric[]) {
    this.metrics = metrics;
  }

  render(): HTMLElement {
    const section = createElement('section', {
      classes: ['metrics-section'],
      attributes: { style: 'padding: 3rem 1rem; background-color: #F5F5F4;' },
    });

    const container = createElement('div', { classes: ['container'] });

    const heading = createElement('h2', {
      classes: ['section-title'],
      textContent: 'Our Impact',
      attributes: { style: 'text-align: center; margin-bottom: 2rem;' },
    });

    const grid = createElement('div', {
      classes: ['grid', 'grid-4'],
      attributes: { style: 'gap: 1.5rem;' },
    });

    const metricElements = this.metrics.map((metric) => this.createMetric(metric));
    appendChildren(grid, ...metricElements);
    appendChildren(container, heading, grid);
    appendChildren(section, container);

    return section;
  }

  private createMetric(metric: Metric): HTMLElement {
    const div = createElement('div', {
      classes: ['metric'],
      attributes: { style: 'text-align: center;' },
    });

    const value = createElement('div', {
      classes: ['metric-value'],
      textContent: metric.value,
      attributes: {
        style: 'font-size: 2.5rem; font-weight: bold; color: #87A96B; margin-bottom: 0.5rem;',
      },
    });

    const label = createElement('div', {
      classes: ['metric-label'],
      textContent: metric.label,
      attributes: { style: 'color: #666; font-size: 0.95rem;' },
    });

    appendChildren(div, value, label);
    return div;
  }
}
