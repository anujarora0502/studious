'use client';

import { toggleTask, deleteTask } from "@/lib/actions";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";

interface TaskProps {
  task: {
    id: string;
    title: string;
    isCompleted: boolean;
  };
}

export default function TaskItem({ task }: TaskProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      marginBottom: "0.5rem", 
      padding: "0.75rem 1rem",
      borderRadius: "var(--radius)",
      border: "1px solid transparent",
      backgroundColor: "var(--card)",
      transition: "all 0.2s",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
    }}
    className="group task-enter"
    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border)"}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={(e) => startTransition(() => toggleTask(task.id, e.target.checked))}
          disabled={isPending}
          style={{ 
            width: "1.125rem", 
            height: "1.125rem", 
            cursor: "pointer", 
            accentColor: "var(--primary)",
            borderRadius: "4px"
          }}
        />
        <span style={{ 
          textDecoration: task.isCompleted ? "line-through" : "none", 
          color: task.isCompleted ? "var(--muted-foreground)" : "var(--foreground)",
          transition: "color 0.2s",
          fontSize: "0.9375rem"
        }}>
          {task.title}
        </span>
      </div>
      <button
        onClick={() => startTransition(() => deleteTask(task.id))}
        disabled={isPending}
        className="btn btn-ghost"
        style={{ 
          color: "var(--muted-foreground)", 
          padding: "0.5rem", 
          height: "auto"
        }}
        aria-label="Delete task"
        onMouseEnter={(e) => e.currentTarget.style.color = "var(--destructive)"}
        onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted-foreground)"}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
