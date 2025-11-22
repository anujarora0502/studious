'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Calendar.module.css';

interface CalendarProps {
  tasksData: Record<string, number>; // { "2025-11-22": 3, ... }
  onDateClick: (date: string) => void;
}

export default function Calendar({ tasksData, onDateClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate calendar days
  const days = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
  }

  // Actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const taskCount = tasksData[dateString] || 0;
    const hasTask = taskCount > 0;
    const isToday = dateString === new Date().toISOString().split('T')[0];

    days.push(
      <button
        key={day}
        className={`${styles.day} ${hasTask ? styles.hasTask : ''} ${isToday ? styles.today : ''}`}
        onClick={() => hasTask && onDateClick(dateString)}
        disabled={!hasTask}
      >
        <span className={styles.dayNumber}>{day}</span>
        {hasTask && <span className={styles.taskBadge}>{taskCount}</span>}
      </button>
    );
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={previousMonth} className={styles.navButton} aria-label="Previous month">
          <ChevronLeft size={20} />
        </button>
        <h2 className={styles.monthYear}>
          {monthNames[month]} {year}
        </h2>
        <button onClick={nextMonth} className={styles.navButton} aria-label="Next month">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className={styles.weekdays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>
        {days}
      </div>
    </div>
  );
}
