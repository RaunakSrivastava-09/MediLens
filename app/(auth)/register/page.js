"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
      body: JSON.stringify({ name, email, password, preferredLanguage }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (signInRes?.error) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-7 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#17392C] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2v20M2 12h20"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#17392C]">
            Create your account
          </h1>

          <p className="text-sm text-[#71837B] mt-1.5">
            Set up MediLens in under a minute
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-[#DDE9E3] rounded-3xl p-5 sm:p-7 shadow-sm">
          <form onSubmit={handleSubmit}>
            <label className="block text-xs font-semibold text-[#17392C] mb-1.5">
              Full name
            </label>

            <input
              className="w-full rounded-xl border border-[#DDE9E3] bg-[#F8FBF9] px-3.5 py-3 text-sm text-[#17392C] outline-none placeholder:text-[#A0AEA8] focus:border-[#2F8F68] transition mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="block text-xs font-semibold text-[#17392C] mb-1.5">
              Email address
            </label>

            <input
              type="email"
              className="w-full rounded-xl border border-[#DDE9E3] bg-[#F8FBF9] px-3.5 py-3 text-sm text-[#17392C] outline-none placeholder:text-[#A0AEA8] focus:border-[#2F8F68] transition mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="block text-xs font-semibold text-[#17392C] mb-1.5">
              Password
            </label>

            <input
              type="password"
              className="w-full rounded-xl border border-[#DDE9E3] bg-[#F8FBF9] px-3.5 py-3 text-sm text-[#17392C] outline-none placeholder:text-[#A0AEA8] focus:border-[#2F8F68] transition mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />

            <label className="block text-xs font-semibold text-[#17392C] mb-1.5">
              Preferred language
            </label>

            <LanguageSelector
              value={preferredLanguage}
              onChange={setPreferredLanguage}
              className="mb-5"
            />

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#17392C] px-4 py-3 text-sm font-medium text-white hover:bg-[#24513F] transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Login */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#DDE9E3]" />
            <span className="text-xs text-[#9AA9A2]">or</span>
            <div className="flex-1 h-px bg-[#DDE9E3]" />
          </div>

          <div className="text-center">
            <p className="text-sm text-[#71837B]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#2F8F68] hover:text-[#17392C] transition"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-[11px] text-[#83948C] text-center mt-5 px-3 leading-relaxed">
          By creating an account, you can securely manage your medicines,
          reminders, and medication history.
        </p>
      </div>
    </div>
  );
}