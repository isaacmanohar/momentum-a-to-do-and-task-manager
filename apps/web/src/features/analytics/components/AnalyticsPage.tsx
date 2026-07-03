import { RefreshCw, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores';

import { KPICards } from './KPICards';
import { ProductivityScoreCircular } from './ProductivityScoreCircular';
import { TaskAnalyticsCharts } from './TaskAnalyticsCharts';
import { CategoryDonut } from './CategoryDonut';
import { FocusAnalytics } from './FocusAnalytics';
import { AdvancedHeatmap } from './AdvancedHeatmap';
import { ProjectAnalyticsCards } from './ProjectAnalyticsCards';
import { GoalAnalytics } from './GoalAnalytics';
import { HabitAnalytics } from './HabitAnalytics';
import { LifeBalanceRadar } from './LifeBalanceRadar';
import { AIInsightsPanel } from './AIInsightsPanel';
import { PredictionsPanel } from './PredictionsPanel';
import { AchievementGallery } from './AchievementGallery';
import { TimeTrackingTimeline } from './TimeTrackingTimeline';
import { CalendarInsights } from './CalendarInsights';
import { ComparisonView } from './ComparisonView';
import { TeamAnalytics } from './TeamAnalytics';
import { ReportExportOptions } from './ReportExportOptions';

import { 
  MOCK_KPIS, 
  MOCK_TASK_ANALYTICS, 
  MOCK_CATEGORIES, 
  MOCK_FOCUS_TRENDS, 
  MOCK_PROJECTS, 
  MOCK_GOALS, 
  MOCK_HABITS, 
  MOCK_LIFE_BALANCE, 
  MOCK_AI_INSIGHTS, 
  MOCK_ACHIEVEMENTS,
  MOCK_TEAM,
  MOCK_COMPARISON 
} from '../mockData';

const EMPTY_KPIS = {
  productivityScore: 0, scoreTrend: '0%', tasksCompleted: 0, tasksTrend: '0%',
  completionRate: 0, completionRateTrend: '0%', focusHours: 0, focusTrend: '0h',
  currentStreak: 0, longestStreak: 0, habitsCompleted: 0, habitsTrend: '0%',
  goalsAchieved: 0, projectsActive: 0, overdueTasks: 0, overdueTrend: '0',
  totalTimeTracked: '0h', avgDailyProductivity: 0,
};

export function AnalyticsPage() {
  const { user } = useAuthStore();
  const isDemoAccount = user?.email === 'isaac@gmail.com';

  const kpis = isDemoAccount ? MOCK_KPIS : EMPTY_KPIS;
  const taskAnalytics = isDemoAccount ? MOCK_TASK_ANALYTICS : [];
  const categories = isDemoAccount ? MOCK_CATEGORIES : [];
  const focusTrends = isDemoAccount ? MOCK_FOCUS_TRENDS : [];
  const projects = isDemoAccount ? MOCK_PROJECTS : [];
  const goals = isDemoAccount ? MOCK_GOALS : [];
  const habits = isDemoAccount ? MOCK_HABITS : [];
  const lifeBalance = isDemoAccount ? MOCK_LIFE_BALANCE : [];
  const aiInsights = isDemoAccount ? MOCK_AI_INSIGHTS : ["Get started by completing tasks to see AI insights."];
  const achievements = isDemoAccount ? MOCK_ACHIEVEMENTS : [];
  const team = isDemoAccount ? MOCK_TEAM : [];
  const comparison = isDemoAccount ? MOCK_COMPARISON : [];

  const handleRefresh = () => {
    toast.success('Analytics refreshed');
  };

  const handleShare = () => {
    toast.success('Dashboard link copied to clipboard');
  };

  return (
    <div className="flex h-full flex-col bg-background/50 text-foreground overflow-y-auto">
      {/* Top Navigation */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-background/95 px-8 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Analytics Command Center</h2>
            <p className="text-sm text-muted-foreground">Comprehensive insights into your productivity</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ReportExportOptions />
          <div className="h-6 w-px bg-border mx-2" />
          <button onClick={handleShare} className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Share Dashboard">
            <Share2 size={18} />
          </button>
          <button onClick={handleRefresh} className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Refresh Data">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="mx-auto max-w-[1600px] space-y-8">
          
          {/* KPI Row */}
          <KPICards data={kpis} />

          {/* Top Row: Score, AI, Predictions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ProductivityScoreCircular score={kpis.productivityScore} />
            </div>
            <div className="lg:col-span-1">
              <AIInsightsPanel insights={aiInsights} />
            </div>
            <div className="lg:col-span-1">
              <PredictionsPanel />
            </div>
          </div>

          {/* Middle Row: Task Analytics & Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TaskAnalyticsCharts data={taskAnalytics} />
            </div>
            <div className="lg:col-span-1">
              <CategoryDonut data={categories} />
            </div>
          </div>

          {/* Focus & Heatmap Row */}
          <div className="grid grid-cols-1 gap-6">
            <FocusAnalytics data={focusTrends} />
            <AdvancedHeatmap />
          </div>

          {/* Entities Row: Habits & Projects */}
          <HabitAnalytics habits={habits} />
          <ProjectAnalyticsCards projects={projects} />

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GoalAnalytics goals={goals} />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
              <LifeBalanceRadar data={lifeBalance} />
              <ComparisonView data={comparison} />
            </div>
          </div>

          <TimeTrackingTimeline />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <AchievementGallery achievements={achievements} />
            </div>
            <div className="lg:col-span-1">
              <CalendarInsights />
            </div>
          </div>

          {/* Team Analytics */}
          <TeamAnalytics team={team} />
          
        </div>
      </div>
    </div>
  );
}
