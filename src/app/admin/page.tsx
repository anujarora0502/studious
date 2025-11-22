import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllUsersWithTasks } from "@/lib/actions";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/study-planner");
  }

  const users = await getAllUsersWithTasks();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "2rem" }}>Admin Dashboard</h1>
      
      <div style={{ display: "grid", gap: "2rem" }}>
        {users.map((user: any) => (
          <div key={user.id} className="card">
            <h2 style={{ marginBottom: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
              {user.name} ({user.email})
            </h2>
            {user.tasks.length === 0 ? (
              <p style={{ opacity: 0.7 }}>No tasks found.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {user.tasks.map((task: any) => (
                  <li key={task.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ textDecoration: task.isCompleted ? "line-through" : "none", opacity: task.isCompleted ? 0.7 : 1 }}>
                      {task.title}
                    </span>
                    <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                      {task.date} {task.isCompleted ? "✅" : "❌"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
