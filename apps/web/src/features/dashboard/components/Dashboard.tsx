import { CheckCircle2, Circle, Clock, Flame, Target, Zap } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api-client';
import { useUIStore } from '@/stores';

export function Dashboard() {
  const { setTaskModalOpen } = useUIStore();
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const res = await api.get('/analytics/dashboard');
      return res.data;
    }
  });

  const { data: tasksData } = useQuery({
    queryKey: ['tasks', 'upcoming'],
    queryFn: async () => {
      const res = await api.get('/tasks');
      return res.data;
    }
  });

  const stats = statsData || {
    tasksToday: 0,
    tasksCompleted: 0,
    tasksOverdue: 0,
    currentStreak: 0,
    focusMinutesToday: 0,
    xp: 0,
    level: 1,
    productivityScore: 0,
  };

  const heatmapData = [
    { name: 'Mon', count: 4 },
    { name: 'Tue', count: 7 },
    { name: 'Wed', count: 5 },
    { name: 'Thu', count: 8 },
    { name: 'Fri', count: 12 },
    { name: 'Sat', count: 3 },
    { name: 'Sun', count: 6 },
  ];

  const tasks = tasksData?.data || [];
  const upcomingTasks = tasks.filter((t: any) => t.status !== 'DONE').slice(0, 5) || [];

  if (isLoading) {
    return <div className="p-8 animate-pulse flex flex-col gap-6"><div className="h-10 w-48 bg-muted rounded"></div><div className="h-32 w-full bg-muted rounded"></div></div>;
  }
  return (
    <div className="flex-1 space-y-6 p-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Welcome back! You've got <span className="text-primary font-medium">{stats.tasksToday - stats.tasksCompleted} tasks</span> left today.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Productivity Score */}
        <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium tracking-tight">Productivity Score</h3>
            <Target className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{stats.productivityScore}%</div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-out" 
                style={{ width: `${stats.productivityScore}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">+5% from yesterday</p>
          </div>
        </div>

        {/* Current Streak */}
        <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium tracking-tight">Current Streak</h3>
            <Flame className="h-4 w-4 text-orange-500" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{stats.currentStreak} days</div>
            <p className="mt-2 text-xs text-muted-foreground">You're on fire! Keep it up.</p>
          </div>
        </div>

        {/* Focus Hours */}
        <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium tracking-tight">Focus Time</h3>
            <Clock className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{stats.focusMinutesToday / 60}h</div>
            <p className="mt-2 text-xs text-muted-foreground">Today's deep work sessions</p>
          </div>
        </div>

        {/* Level / XP */}
        <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium tracking-tight">Level {stats.level}</h3>
            <Zap className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{stats.xp} XP</div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div 
                className="h-full bg-yellow-400 transition-all duration-1000 ease-out" 
                style={{ width: '45%' }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">550 XP to Level 6</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Activity Chart */}
        <div className="col-span-4 rounded-xl border bg-card shadow-sm p-6">
          <div className="mb-4">
            <h3 className="font-semibold leading-none tracking-tight">Weekly Activity</h3>
            <p className="text-sm text-muted-foreground mt-1">Tasks completed over the last 7 days</p>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={heatmapData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0a0a0b', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="col-span-3 rounded-xl border bg-card shadow-sm p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold leading-none tracking-tight">Upcoming Today</h3>
              <p className="text-sm text-muted-foreground mt-1">Your next scheduled tasks</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {upcomingTasks.map((task: any) => (
              <div key={task.id} className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <button className="mt-0.5 text-muted-foreground hover:text-primary">
                  <Circle size={18} />
                </button>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{task.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {task.time}
                    </span>
                    <span>•</span>
                    <span>{task.project?.name || 'Inbox'}</span>
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={() => setTaskModalOpen(true)}
              className="w-full rounded-md border border-dashed p-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              + Add new task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
