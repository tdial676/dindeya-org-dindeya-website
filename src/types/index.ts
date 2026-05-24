/**
 * Core TypeScript type definitions for the application
 */

export interface NavLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface CTA {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  status: 'completed' | 'ongoing' | 'planned';
  impact: string;
  year: number;
}

export interface ImpactStory {
  title: string;
  excerpt: string;
  author: string;
}

export interface Campaign {
  title: string;
  description: string;
  goal: number;
  raised: number;
  impact: string;
  stories: ImpactStory[];
}

export interface ComponentOptions {
  class?: string;
  attributes?: Record<string, string>;
}

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}
