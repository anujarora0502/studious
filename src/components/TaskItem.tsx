'use client';

import { toggleTask, deleteTask, updateTask } from "@/lib/actions";
import { useTransition, useState, useRef, useEffect } from "react";
import { Trash2, Loader2, Pencil, Check, X } from "lucide-react";
import Linkify from "./Linkify";

interface TaskProps {
  task: {
    id: string;
    title: string;
    isCompleted: boolean;
  };
}

export default function TaskItem({ task }: TaskProps) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editTitle.trim() === "") return;
    if (editTitle === task.title) {
      setIsEditing(false);
      return;
    }
    
    startTransition(async () => {
      await updateTask(task.id, editTitle);
      setIsEditing(false);
    });
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

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
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      opacity: isPending ? 0.6 : 1
    }}
    className="group task-enter"
    onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border)"}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={(e) => startTransition(() => toggleTask(task.id, e.target.checked))}
          disabled={isPending || isEditing}
          style={{ 
            width: "1.125rem", 
            height: "1.125rem", 
            cursor: isPending || isEditing ? "not-allowed" : "pointer", 
            accentColor: "var(--primary)",
            borderRadius: "4px",
            flexShrink: 0
          }}
        />
        
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            disabled={isPending}
            style={{
              flex: 1,
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              border: "1px solid var(--primary)",
              outline: "none",
              fontSize: "0.9375rem",
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              width: "100%"
            }}
          />
        ) : (
          <span style={{ 
            textDecoration: task.isCompleted ? "line-through" : "none", 
            color: task.isCompleted ? "var(--muted-foreground)" : "var(--foreground)",
            transition: "color 0.2s",
            fontSize: "0.9375rem",
            flex: 1,
            wordBreak: "break-word"
          }}>
            <Linkify 
              text={task.title}
              className="task-title"
            />
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.25rem" }}>
        {isEditing ? (
           // While editing, show nothing extra or maybe a save icon? 
           // The input handles save on blur/enter, so explicit buttons might be clutter, 
           // but let's keep it simple. The design said "Edit button (Pencil icon)".
           // Let's just hide the edit button while editing.
           null
        ) : (
          !task.isCompleted && (
            <button
              onClick={() => setIsEditing(true)}
              disabled={isPending}
              className="btn btn-ghost"
              style={{ 
                color: "var(--muted-foreground)", 
                padding: "0.5rem", 
                height: "auto",
                cursor: isPending ? "not-allowed" : "pointer"
              }}
              aria-label="Edit task"
              onMouseEnter={(e) => !isPending && (e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted-foreground)"}
            >
              <Pencil size={16} />
            </button>
          )
        )}

        <button
          onClick={() => startTransition(() => deleteTask(task.id))}
          disabled={isPending || isEditing}
          className="btn btn-ghost"
          style={{ 
            color: "var(--muted-foreground)", 
            padding: "0.5rem", 
            height: "auto",
            cursor: isPending || isEditing ? "not-allowed" : "pointer"
          }}
          aria-label="Delete task"
          onMouseEnter={(e) => !isPending && !isEditing && (e.currentTarget.style.color = "var(--destructive)")}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted-foreground)"}
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
        </button>
      </div>
    </div>
  );
}
