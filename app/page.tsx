"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Landmark,
  ArrowRight,
  ShieldCheck,
  PiggyBank,
  CreditCard,
  TrendingUp,
  Moon,
  Sun,
  AlertTriangle
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const FEATURES = [
  {
    icon: PiggyBank,
    title: "Checking & Savings",
    body: "Separate accounts for spending and saving, with real-time balances and a clear picture of where your money sits."
  },
  {
    icon: TrendingUp,
    title: "Spending insights",
    body: "Monthly charts and category breakdowns so your spending patterns are visible, not buried in a statement."
  },
  {
    icon: CreditCard,
    title: "Card controls",
    body: "Freeze a card instantly, set spending limits, or toggle international and contactless payments in a tap."
  },
  {
    icon: ShieldCheck,
    title: "Built-in security",
    body: "Email verification, password reset, and session-aware sign-in from day one."
  }
];

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen bg-paper dark:bg-ink text-ink dark:text-paper">
      <div className="bg-warning/15 border-b border-warning/30 text-warning text-xs">
        <div className="max-w-5xl mx-auto px-6 py-2 flex items-center gap-2">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          <span>
            United Cart Bank is a fictional demo application for portfolio purposes. No real funds,
            accounts, or personal financial data are involved.
          </span>
        </div>
      </div>

      <header className="border-b border-paper-line dark:border-ink-line">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-brand" />
            <span className="font-display font-bold text-lg">United Cart Bank</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-paper-line dark:border-ink-line hover:border-brand/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              href="/login"
              className="text-sm text-muted hover:text-ink dark:hover:text-paper transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-brand text-white px-4 py-2 rounded-md hover:bg-brand/90 transition-colors"
            >
              Open an account
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display font-extrabold text-4xl md:text-5xl leading-tight max-w-3xl mx-auto"
        >
          Digital banking, designed to feel effortless.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-muted mt-5 max-w-xl mx-auto"
        >
          Checking, savings, transfers, and card controls in one clean dashboard. United Cart Bank is a
          demo build showing what a modern banking experience can look like.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8"
        >
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-brand text-white font-medium px-6 py-3 rounded-md hover:bg-brand/90 transition-colors"
          >
            Open a demo account <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-2 gap-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="border border-paper-line dark:border-ink-line rounded-xl p-6"
          >
            <f.icon className="h-5 w-5 text-brand mb-3" />
            <h3 className="font-display font-bold mb-1">{f.title}</h3>
            <p className="text-sm text-muted">{f.body}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
