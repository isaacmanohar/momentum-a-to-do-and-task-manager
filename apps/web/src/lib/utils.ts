// =============================================================
// Life OS — Utility Functions
// shadcn/ui cn() helper and other shared utilities
// =============================================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatRelativeDate(date: string | Date | null | undefined): string {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  if (days > 0 && days <= 7) return `In ${days} days`;
  if (days < 0 && days >= -7) return `${Math.abs(days)} days ago`;
  return formatDate(date);
}

export function formatTime(time: string | null | undefined): string {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function formatDuration(minutes: number | null | undefined): string {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    URGENT: '#ef4444',
    HIGH: '#f97316',
    MEDIUM: '#eab308',
    LOW: '#22c55e',
    NONE: '#a1a1aa',
  };
  return colors[priority] || '#a1a1aa';
}

export function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    URGENT: 'Urgent',
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
    NONE: 'None',
  };
  return labels[priority] || 'None';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    TODO: '#a1a1aa',
    IN_PROGRESS: '#3b82f6',
    DONE: '#10b981',
    ARCHIVED: '#6b7280',
    CANCELLED: '#ef4444',
  };
  return colors[status] || '#a1a1aa';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
    ARCHIVED: 'Archived',
    CANCELLED: 'Cancelled',
  };
  return labels[status] || status;
}

export function getXPForLevel(level: number): number {
  return level * 100;
}

export function debounce<T extends (...args: any[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}
