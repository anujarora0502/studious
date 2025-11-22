'use client';

import { registerUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await registerUser(formData);
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/login");
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
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Create an account</h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
            Enter your details to get started
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
        <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>Name</label>
            <input type="text" name="name" id="name" className="input" placeholder="John Doe" required />
          </div>
          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>Email</label>
            <input type="email" name="email" id="email" className="input" placeholder="name@example.com" required />
          </div>
          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>Password</label>
            <input type="password" name="password" id="password" className="input" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem", width: "100%" }}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
