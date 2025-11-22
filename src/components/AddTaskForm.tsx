'use client';

import { useTransition } from 'react';
import { Loader2, Plus } from 'lucide-react';
import styles from './dashboard.module.css';

interface AddTaskFormProps {
  addTaskAction: (formData: FormData) => Promise<void>;
}

export default function AddTaskForm({ addTaskAction }: AddTaskFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await addTaskAction(formData);
      // Reset form
      const form = document.querySelector('form') as HTMLFormElement;
      form?.reset();
    });
  };

  return (
    <div className={styles.formWrapper}>
      <form action={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="What needs to be done?"
          className={`input ${styles.input}`}
          style={{ 
            backgroundColor: "var(--card)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }}
          required
          autoComplete="off"
          disabled={isPending}
        />
        <button 
          type="submit" 
          className={`btn btn-primary ${styles.submitButton}`}
          disabled={isPending}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>Add Task</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
