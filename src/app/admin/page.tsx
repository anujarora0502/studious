import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllUsersWithTasks } from "@/lib/actions";
import { Users } from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/study-planner");
  }

  const users = await getAllUsersWithTasks();

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ 
            fontSize: "2rem", 
            fontWeight: 700,
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            <Users size={28} />
            Admin Dashboard
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem" }}>
            Overview of all users and their tasks
          </p>
        </div>
        
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {users.map((user: any) => {
            const completedTasks = user.tasks.filter((t: any) => t.isCompleted).length;
            const totalTasks = user.tasks.length;
            
            return (
              <div 
                key={user.id} 
                className="card" 
                style={{ 
                  padding: "1.5rem",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  background: "var(--card)"
                }}
              >
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start",
                  marginBottom: "1.25rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid var(--border)"
                }}>
                  <div>
                    <h2 style={{ 
                      fontSize: "1.25rem", 
                      fontWeight: 600,
                      marginBottom: "0.25rem"
                    }}>
                      {user.name}
                    </h2>
                    <p style={{ 
                      fontSize: "0.875rem", 
                      color: "var(--muted-foreground)" 
                    }}>
                      {user.email}
                    </p>
                  </div>
                  <div style={{ 
                    textAlign: "right",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    background: "var(--secondary)",
                    fontSize: "0.875rem",
                    fontWeight: 500
                  }}>
                    <div style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                      Progress
                    </div>
                    <div style={{ fontSize: "1rem", fontWeight: 600 }}>
                      {completedTasks}/{totalTasks} tasks
                    </div>
                  </div>
                </div>
                
                {user.tasks.length === 0 ? (
                  <p style={{ 
                    color: "var(--muted-foreground)", 
                    textAlign: "center",
                    padding: "2rem",
                    fontSize: "0.9375rem"
                  }}>
                    No tasks found for this user.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {user.tasks.map((task: any) => (
                      <div 
                        key={task.id} 
                        style={{ 
                          display: "flex", 
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0.875rem 1rem",
                          borderRadius: "0.5rem",
                          background: "var(--background)",
                          border: "1px solid var(--border)",
                          transition: "all 0.2s"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
                          <div 
                            className="status-dot"
                            data-tooltip={task.isCompleted ? "Done" : "Pending"}
                            style={{ 
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: task.isCompleted ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
                              flexShrink: 0,
                              cursor: "help"
                            }}
                          />
                          <span style={{ 
                            textDecoration: task.isCompleted ? "line-through" : "none",
                            color: task.isCompleted ? "var(--muted-foreground)" : "var(--foreground)",
                            fontSize: "0.9375rem"
                          }}>
                            {task.title}
                          </span>
                        </div>
                        <div style={{ 
                          fontSize: "0.8125rem",
                          color: "var(--muted-foreground)",
                          flexShrink: 0
                        }}>
                          <span>{task.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
  );
}
