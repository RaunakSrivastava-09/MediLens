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

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Incorrect email or password.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-md">

        <div className="text-center mb-8 sm:mb-10">
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
            Welcome back
          </h1>

          <p className="text-sm text-[#71837B] mt-1.5">
            Sign in to your MediLens account
          </p>
        </div>

        <div className="bg-white border border-[#DDE9E3] rounded-3xl p-5 sm:p-7 shadow-sm">
          <form onSubmit={handleSubmit}>
            <label className="block text-xs font-semibold text-[#17392C] mb-1.5">
              Email address
            </label>

            <input
              type="email"
              className="w-full rounded-xl border border-[#DDE9E3] bg-[#F8FBF9] px-3.5 py-3 text-sm text-[#17392C] outline-none placeholder:text-[#A0AEA8] focus:border-[#2F8F68] transition mb-4"
              placeholder="name@example.com"
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#DDE9E3]" />
            <span className="text-xs text-[#9AA9A2]">or</span>
            <div className="flex-1 h-px bg-[#DDE9E3]" />
          </div>

          <Link
            href="/register"
            className="w-full flex items-center justify-center rounded-xl border border-[#DDE9E3] bg-white px-4 py-3 text-sm font-medium text-[#17392C] hover:bg-[#F8FBF9] transition"
          >
            Create an account
          </Link>
        </div>

        <p className="text-[11px] text-[#83948C] text-center mt-6 px-3 leading-relaxed">
          MediLens provides informational guidance only and does not replace
          advice from a licensed doctor or pharmacist.
        </p>
      </div>
    </div>
  );
}