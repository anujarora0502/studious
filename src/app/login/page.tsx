'use client';

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      if (session.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/study-planner");
      }
    }
  }, [session, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else {
      // Session will be updated, useEffect will handle redirect
      router.refresh();
    }
  }

  return (
    <div style={{ 
      minHeight: "calc(100vh - 10rem)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <div className="card animate-fade-in" style={{ 
        width: "100%", 
        maxWidth: "400px", 
        padding: "2rem",
        border: "1px solid var(--border)",
        background: "var(--card)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Welcome back</h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
            Enter your credentials to access your account
          </p>
        </div>

        {error && (
          <div style={{ 
            color: "var(--destructive)", 
            backgroundColor: "rgba(239, 68, 68, 0.1)", 
            padding: "0.75rem", 
            borderRadius: "var(--radius)", 
            marginBottom: "1.5rem", 
            fontSize: "0.875rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>Email</label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>Password</label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              marginTop: "0.5rem", 
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}
            disabled={isLoading}
          >
            {isLoading && <Loader2 size={16} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
