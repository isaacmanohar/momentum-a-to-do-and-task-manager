// Comprehensive mock data for the Analytics Dashboard

export const MOCK_KPIS = {
  productivityScore: 84,
  scoreTrend: '+5.2%',
  tasksCompleted: 142,
  tasksTrend: '+12%',
  completionRate: 88,
  completionRateTrend: '+2.1%',
  focusHours: 32.5,
  focusTrend: '+4.5h',
  currentStreak: 12,
  longestStreak: 45,
  habitsCompleted: 94,
  habitsTrend: '+8%',
  goalsAchieved: 3,
  projectsActive: 5,
  overdueTasks: 4,
  overdueTrend: '-2',
  totalTimeTracked: '124h',
  avgDailyProductivity: 7.2,
};

export const MOCK_TASK_ANALYTICS = Array.from({ length: 30 }).map((_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  completed: Math.floor(Math.random() * 15) + 5,
  pending: Math.floor(Math.random() * 5) + 1,
  overdue: Math.floor(Math.random() * 3),
}));

export const MOCK_CATEGORIES = [
  { name: 'Work', value: 45, color: '#3b82f6' },
  { name: 'Study', value: 20, color: '#8b5cf6' },
  { name: 'Health', value: 15, color: '#10b981' },
  { name: 'Personal', value: 10, color: '#f59e0b' },
  { name: 'Finance', value: 5, color: '#6366f1' },
  { name: 'Reading', value: 5, color: '#ec4899' },
];

export const MOCK_FOCUS_TRENDS = Array.from({ length: 14 }).map((_, i) => ({
  date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
  hours: Number((Math.random() * 4 + 1).toFixed(1)),
  deepWork: Number((Math.random() * 3).toFixed(1)),
}));

export const MOCK_PROJECTS = [
  { id: '1', name: 'Website Redesign', progress: 75, remaining: 12, estCompletion: '2 weeks', timeSpent: '45h', color: '#3b82f6' },
  { id: '2', name: 'Learn Spanish', progress: 40, remaining: 34, estCompletion: '3 months', timeSpent: '20h', color: '#10b981' },
  { id: '3', name: 'Fitness Plan', progress: 90, remaining: 2, estCompletion: '1 week', timeSpent: '60h', color: '#f59e0b' },
];

export const MOCK_GOALS = [
  { id: '1', title: 'Read 24 Books', progress: 50, deadline: 'Dec 31, 2026', milestonesCompleted: 12, totalMilestones: 24, probability: 85, color: '#8b5cf6' },
  { id: '2', title: 'Save $10k', progress: 30, deadline: 'Oct 01, 2026', milestonesCompleted: 3, totalMilestones: 10, probability: 65, color: '#10b981' },
];

export const MOCK_HABITS = [
  { id: '1', name: 'Morning Run', streak: 5, longest: 14, completion: 80, consistency: 85, color: '#3b82f6' },
  { id: '2', name: 'Read 20 pages', streak: 12, longest: 30, completion: 95, consistency: 98, color: '#ec4899' },
  { id: '3', name: 'Meditate', streak: 0, longest: 7, completion: 40, consistency: 45, color: '#8b5cf6' },
];

export const MOCK_LIFE_BALANCE = [
  { subject: 'Work', A: 80, fullMark: 100 },
  { subject: 'Health', A: 65, fullMark: 100 },
  { subject: 'Fitness', A: 70, fullMark: 100 },
  { subject: 'Learning', A: 90, fullMark: 100 },
  { subject: 'Finance', A: 60, fullMark: 100 },
  { subject: 'Relationships', A: 85, fullMark: 100 },
  { subject: 'Growth', A: 75, fullMark: 100 },
];

export const MOCK_AI_INSIGHTS = [
  "You complete 34% more work before noon. Try tackling hard tasks early.",
  "You miss deadlines mostly on Fridays. Avoid scheduling critical items then.",
  "You focus 40% longer on days you exercise.",
  "Your productivity has improved by 18% this month. Great momentum!",
  "Try scheduling deep work between 9 AM and 12 PM for optimal output."
];

export const MOCK_ACHIEVEMENTS = [
  { id: '1', title: '100 Tasks Completed', icon: '🏆', unlocked: true, date: 'Mar 15, 2026' },
  { id: '2', title: '30 Day Streak', icon: '🔥', unlocked: true, date: 'Apr 02, 2026' },
  { id: '3', title: 'Focus Champion', icon: '🎯', unlocked: true, date: 'May 10, 2026' },
  { id: '4', title: 'First Goal Achieved', icon: '⭐', unlocked: false },
  { id: '5', title: 'Productivity Master', icon: '🚀', unlocked: false },
  { id: '6', title: '100 Pomodoros', icon: '💎', unlocked: false },
];

export const MOCK_TEAM = [
  { name: 'Sarah J.', score: 95, avatar: 'SJ', completed: 42 },
  { name: 'You', score: 84, avatar: 'ME', completed: 35 },
  { name: 'Mike R.', score: 78, avatar: 'MR', completed: 28 },
  { name: 'Alex T.', score: 62, avatar: 'AT', completed: 15 },
];

export const MOCK_COMPARISON = [
  { metric: 'Tasks Done', current: 42, previous: 35, label: 'vs last week' },
  { metric: 'Focus Hrs', current: 15.5, previous: 12, label: 'vs last week' },
  { metric: 'Goals Met', current: 2, previous: 0, label: 'vs last month' },
];
