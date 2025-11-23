import { BookOpen } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProgressLink from "@/components/ProgressLink";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Redirect admin users to admin panel
  if (session?.user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="animate-fade-in" style={{
      minHeight: "calc(100vh - 10rem)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 1rem 2rem"
    }}>
      <div style={{ maxWidth: "900px", width: "100%" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 800,
            marginBottom: "1.5rem",
            background: "linear-gradient(to right, var(--foreground), var(--primary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2
          }}>
            Welcome to Studious
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--muted-foreground)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6
          }}>
            Your personal study companion for organizing tasks, tracking progress, and staying productive.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "2rem",
          padding: "0 1rem"
        }}>
          {/* Study Planner Tool Card */}
          <ProgressLink href={session ? "/study-planner" : "/login"} style={{ textDecoration: "none" }}>
            <div className="card" style={{
              padding: "2rem",
              textAlign: "left",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              background: "var(--card)"
            }}>
              <div style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "0.75rem",
                background: "var(--secondary)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem"
              }}>
                <BookOpen size={24} />
              </div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem", fontWeight: 600 }}>Study Planner</h2>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "1.5rem", flex: 1 }}>
                Organize your daily tasks, track completion, and automatically roll over unfinished work to the next day.
              </p>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--primary)",
                fontWeight: 500,
                fontSize: "0.9375rem"
              }}>
                <span>{session ? "Go to Study Planner" : "Sign in to get started"}</span>
                <span style={{ fontSize: "1.25rem" }}>→</span>
              </div>
            </div>
          </ProgressLink>

          {/* Placeholder for future tools */}
          <div className="card" style={{
            padding: "2rem",
            textAlign: "left",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            opacity: 0.6,
            border: "1px dashed var(--border)",
            background: "transparent"
          }}>
            <div style={{ 
              width: "3rem", 
              height: "3rem", 
              borderRadius: "0.75rem", 
              background: "var(--secondary)", 
              color: "var(--muted-foreground)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              marginBottom: "1.5rem"
            }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>+</span>
            </div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem", fontWeight: 600 }}>More Coming Soon</h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              We are building more tools to help you succeed. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
