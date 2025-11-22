'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/study-planner");
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem", width: "100%" }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
