"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Landmark, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transfers", label: "Transfers" },
  { href: "/cards", label: "Cards" },
  { href: "/loans", label: "Loans" }
];

export default function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  return (
    <header className="border-b border-paper-line dark:border-ink-line">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-brand" />
            <span className="font-display font-bold text-lg hidden sm:inline">United Cart Bank</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm transition-colors ${pathname === link.href ? "text-brand font-medium" : "text-muted hover:text-ink dark:hover:text-paper"}`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="h-9 w-9 flex items-center justify-center rounded-full border border-paper-line dark:border-ink-line hover:border-brand/50 transition-colors" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="h-9 w-9 flex items-center justify-center rounded-full border border-paper-line dark:border-ink-line hover:border-danger/50 hover:text-danger transition-colors" aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
