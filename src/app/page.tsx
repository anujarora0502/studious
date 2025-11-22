import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "calc(100vh - 10rem)",
      padding: "2rem 1rem"
    }}>
      <div className="animate-fade-in" style={{ width: "100%", maxWidth: "1200px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ 
            fontSize: "clamp(2rem, 5vw, 3.5rem)", 
            fontWeight: 800, 
            marginBottom: "1.5rem",
            letterSpacing: "-0.025em",
            background: "linear-gradient(to bottom right, var(--foreground), var(--muted-foreground))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Master Your Studies
          </h1>
          <p style={{ 
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)", 
            color: "var(--muted-foreground)", 
            maxWidth: "600px", 
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            A suite of tools designed to help you organize, track, and excel in your academic journey.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", 
          gap: "2rem",
          padding: "0 1rem"
        }}>
          {/* Study Planner Tool Card */}
          <Link href={session ? "/study-planner" : "/login"} style={{ textDecoration: "none" }}>
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
                fontWeight: 500 
              }}>
                {session ? "Go to Study Planner" : "Get Started"} <ArrowRight size={16} />
              </div>
            </div>
          </Link>

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
