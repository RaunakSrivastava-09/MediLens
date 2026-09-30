"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, preferredLanguage })
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (signInRes?.error) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-9">
          <div className="w-[62px] h-[62px] rounded-[18px] bg-forest flex items-center justify-center mb-3.5">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M2 12h20" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl">Create your account</h1>
          <p className="text-sm text-ink-soft mt-1">Set up MediLens in under a minute</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="field-label">Full name</label>
          <input className="field mb-4" value={name} onChange={(e) => setName(e.target.value)} required />

          <label className="field-label">Email address</label>
          <input
            type="email"
            className="field mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="field-label">Password</label>
          <input
            type="password"
            className="field mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <label className="field-label">Preferred language</label>
          <LanguageSelector value={preferredLanguage} onChange={setPreferredLanguage} className="mb-5" />

          {error && <p className="text-sm text-danger mb-4">{error}</p>}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
