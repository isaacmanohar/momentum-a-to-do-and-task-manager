import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Plus } from 'lucide-react';

import { useUIStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api-client';

export function CalendarPage() {
  const [view, setView] = useState('dayGridMonth');
  const { setTaskModalOpen } = useUIStore();

  const { data: tasksData } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await api.get('/tasks?limit=100');
      return res.data;
    }
  });

  const tasks = tasksData?.data || [];

  const calendarEvents = tasks
    .filter((task: any) => task.dueDate)
    .map((task: any) => {
      let color = '#6366f1'; // default
      if (task.status === 'DONE') color = '#10b981'; // green
      else if (task.priority === 'URGENT') color = '#ef4444';
      else if (task.priority === 'HIGH') color = '#f97316';
      else if (task.priority === 'MEDIUM') color = '#eab308';
      else if (task.project?.color) color = task.project.color;

      return {
        id: task.id,
        title: task.title,
        start: task.dueDate,
        allDay: true,
        backgroundColor: color,
        classNames: task.status === 'DONE' ? ['opacity-60'] : [],
      };
    });

  return (
    <div className="flex h-full flex-col animate-fade-in bg-background">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-8 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
          <p className="text-sm text-muted-foreground">Your schedule and upcoming events.</p>
        </div>
        <button 
          onClick={() => setTaskModalOpen(true)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          <Plus size={16} />
          <span>New Task</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="rounded-xl border bg-card shadow-sm p-4 h-full min-h-[600px]">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={view}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={calendarEvents}
            height="100%"
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            nowIndicator={true}
          />
        </div>
      </div>
    </div>
  );
}
