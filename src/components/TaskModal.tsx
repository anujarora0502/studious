'use client';

import { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import styles from './TaskModal.module.css';
import Linkify from './Linkify';

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  date: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  tasks: Task[];
}

export default function TaskModal({ isOpen, onClose, date, tasks }: TaskModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Format date for display
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Completed Tasks</h2>
            <p className={styles.date}>{formattedDate}</p>
          </div>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {tasks.length === 0 ? (
            <p className={styles.emptyState}>No completed tasks for this date.</p>
          ) : (
            <ul className={styles.taskList}>
              {tasks.map((task) => (
                <li key={task.id} className={styles.taskItem}>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <Linkify text={task.title} className={styles.taskTitle} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
