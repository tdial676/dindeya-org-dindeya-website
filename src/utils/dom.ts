/**
 * DOM manipulation utilities for cleaner component rendering
 */

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: {
    classes?: string[];
    attributes?: Record<string, string>;
    innerHTML?: string;
    textContent?: string;
  }
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (options?.classes) {
    element.classList.add(...options.classes);
  }

  if (options?.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (options?.innerHTML) {
    element.innerHTML = options.innerHTML;
  }

  if (options?.textContent) {
    element.textContent = options.textContent;
  }

  return element;
}

export function appendChildren(
  parent: HTMLElement,
  ...children: (HTMLElement | string)[]
): HTMLElement {
  children.forEach((child) => {
    if (typeof child === 'string') {
      parent.appendChild(document.createTextNode(child));
    } else {
      parent.appendChild(child);
    }
  });
  return parent;
}

export function query<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: Document | HTMLElement = document
): T | null {
  return parent.querySelector(selector) as T | null;
}

export function queryAll<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: Document | HTMLElement = document
): T[] {
  return Array.from(parent.querySelectorAll(selector)) as T[];
}

export function addClass(
  element: HTMLElement,
  ...classes: string[]
): HTMLElement {
  element.classList.add(...classes);
  return element;
}

export function removeClass(
  element: HTMLElement,
  ...classes: string[]
): HTMLElement {
  element.classList.remove(...classes);
  return element;
}

export function toggleClass(
  element: HTMLElement,
  className: string
): HTMLElement {
  element.classList.toggle(className);
  return element;
}

export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

export function on<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  event: K,
  handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
): HTMLElement {
  element.addEventListener(event, handler as EventListener);
  return element;
}

export function off<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  event: K,
  handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
): HTMLElement {
  element.removeEventListener(event, handler as EventListener);
  return element;
}
