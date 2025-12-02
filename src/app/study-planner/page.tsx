import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTasks, addTask } from "@/lib/actions";
import TaskItem from "@/components/TaskItem";
import AddTaskForm from "@/components/AddTaskForm";
import ProgressLink from "@/components/ProgressLink";
import { History } from "lucide-react";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const tasks = await getTasks(session.user.id);
  const addTaskWithId = addTask.bind(null, session.user.id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 style={{ 
            fontSize: "2rem", 
            fontWeight: 700, 
            background: "linear-gradient(to right, var(--foreground), var(--muted-foreground))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem"
          }}>
            Hi, {session.user.name}
          </h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            You have completed {tasks.filter((t: any) => t.isCompleted).length} out of {tasks.length} tasks today
          </p>
        </div>
        <ProgressLink 
          href="/study-planner/history" 
          className="btn btn-ghost" 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
            borderRadius: "2rem",
            padding: "0.5rem 1rem",
            textDecoration: "none"
          }}
        >
          <History size={16} />
          <span>History</span>
        </ProgressLink>
      </div>
      
      <AddTaskForm addTaskAction={addTaskWithId} />

      <div className="animate-fade-in">
        <h2 style={{ 
          fontSize: "0.875rem", 
          textTransform: "uppercase", 
          letterSpacing: "0.05em", 
          color: "var(--muted-foreground)", 
          marginBottom: "1rem",
          fontWeight: 600
        }}>
          Today's Focus
        </h2>
        {tasks.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "4rem 2rem", 
            border: "1px dashed var(--border)", 
            borderRadius: "var(--radius)",
            color: "var(--muted-foreground)"
          }}>
            <p>No tasks yet. Add one above to get started.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {tasks.map((task: any) => <TaskItem key={task.id} task={task} />)}
          </div>
        )}
      </div>
    </div>
  );
}
