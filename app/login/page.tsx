"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Landmark, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNeedsVerification(false);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    setLoading(false);

    if (result?.error === "EMAIL_NOT_VERIFIED") {
      setNeedsVerification(true);
      return;
    }

    if (result?.error) {
      setError("Incorrect email or password");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-paper dark:bg-ink text-ink dark:text-paper flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <Landmark className="h-5 w-5 text-brand" />
          <span className="font-display font-bold text-lg">United Cart Bank</span>
        </Link>

        <h1 className="font-display font-bold text-2xl text-center mb-1">Welcome back</h1>
        <p className="text-muted text-sm text-center mb-8">Sign in to your dashboard.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-xs font-mono tracking-wide text-muted">
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-md bg-paper-soft dark:bg-ink-soft border border-paper-line dark:border-ink-line px-3 py-2.5 text-sm focus:border-brand outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-mono tracking-wide text-muted">
                PASSWORD
              </label>
              <Link href="/forgot-password" className="text-xs text-brand hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-md bg-paper-soft dark:bg-ink-soft border border-paper-line dark:border-ink-line px-3 py-2.5 text-sm focus:border-brand outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-danger text-sm"
            >
              {error}
            </motion.p>
          )}

          {needsVerification && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-danger text-sm"
            >
              Your email isn&apos;t verified yet.{" "}
              <Link href={`/verify?email=${encodeURIComponent(email)}`} className="underline">
                Verify it now
              </Link>
            </motion.p>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 bg-brand text-white font-medium py-2.5 rounded-md hover:bg-brand/90 transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Signing in…" : "Sign in"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-brand hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
