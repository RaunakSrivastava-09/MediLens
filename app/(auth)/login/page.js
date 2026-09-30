"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", { email, password, redirect: false });

    setLoading(false);
    if (res?.error) {
      setError("Incorrect email or password.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-11">
          <div className="w-[62px] h-[62px] rounded-[18px] bg-forest flex items-center justify-center mb-3.5">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M2 12h20" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl">MediLens</h1>
          <p className="text-sm text-ink-soft mt-1">Smart medication companion</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="field-label">Email address</label>
          <input
            type="email"
            className="field mb-4.5"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="field-label">Password</label>
          <input
            type="password"
            className="field mb-4.5"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-danger mb-4">{error}</p>}

          <button type="submit" className="btn btn-primary w-full mb-3" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="flex items-center gap-2.5 my-5">
          <div className="flex-1 h-px bg-line" />
          <span className="text-xs text-ink-faint">or</span>
          <div className="flex-1 h-px bg-line" />
        </div>

        <Link href="/register" className="btn btn-secondary w-full">
          Create an account
        </Link>

        <p className="text-[11.5px] text-ink-faint text-center mt-8 leading-relaxed">
          MediLens provides informational guidance only and does not replace advice from a licensed
          doctor or pharmacist.
        </p>
      </div>
    </div>
  );
}
