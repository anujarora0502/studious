'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Calendar from '@/components/Calendar';
import TaskModal from '@/components/TaskModal';

export default function HistoryClient({ tasks }: { tasks: any[] }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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
      <button
        onClick={() => router.push('/study-planner')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          marginBottom: '1rem',
          background: 'transparent',
          border: '1px solid var(--border)',
          borderRadius: '0.5rem',
          color: 'var(--foreground)',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Study Planner</span>
      </button>

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
