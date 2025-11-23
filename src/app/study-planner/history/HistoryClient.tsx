'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ProgressLink from '@/components/ProgressLink';
import Calendar from '@/components/Calendar';
import TaskModal from '@/components/TaskModal';

export default function HistoryClient({ tasks }: { tasks: any[] }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group tasks by date and count them
  const tasksData: Record<string, number> = {};
  const tasksByDate: Record<string, any[]> = {};

  tasks.forEach((task) => {
    const date = task.date;
    tasksData[date] = (tasksData[date] || 0) + 1;
    if (!tasksByDate[date]) {
      tasksByDate[date] = [];
    }
    tasksByDate[date].push(task);
  });

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const selectedTasks = selectedDate ? tasksByDate[selectedDate] || [] : [];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
      <ProgressLink
        href="/study-planner"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.5rem',
          height: '2.5rem',
          marginBottom: '1rem',
          background: 'transparent',
          border: '1px solid var(--border)',
          borderRadius: '0.5rem',
          color: 'var(--foreground)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          textDecoration: 'none'
        }}
        onMouseEnter={(e: any) => {
          e.currentTarget.style.backgroundColor = 'var(--accent)';
        }}
        onMouseLeave={(e: any) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <ArrowLeft size={18} />
      </ProgressLink>

      <Calendar tasksData={tasksData} onDateClick={handleDateClick} />

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        date={selectedDate || ''}
        tasks={selectedTasks}
      />
    </div>
  );
}
