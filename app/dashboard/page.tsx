import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Wallet, PiggyBank, ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import SpendingChart from "@/components/SpendingChart";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id: string }).id;

  const accounts = await prisma.account.findMany({
    where: { userId },
    include: { transactions: { orderBy: { createdAt: "desc" }, take: 5 } },
    orderBy: { type: "asc" }
  });

  type TransactionRow = { id: string; type: string; amount: number; description: string; balanceAfter: number; createdAt: Date; };
  type AccountRow = { type: string; nickname: string | null; balance: number; transactions: TransactionRow[]; };
  const typedAccounts = accounts as unknown as AccountRow[];

  const checking = typedAccounts.find((a) => a.type === "CHECKING");
  const savings = typedAccounts.find((a) => a.type === "SAVINGS");
  const totalBalance = typedAccounts.reduce((sum, a) => sum + a.balance, 0);

  const allTransactions = typedAccounts
    .flatMap((a) => a.transactions.map((t) => ({ ...t, accountNickname: a.nickname })))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8);

  const chartSource = checking?.transactions.slice().reverse() ?? [];
  const chartLabels = chartSource.map((t) => t.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
  const chartValues = chartSource.map((t) => t.balanceAfter);

  return (
    <main className="min-h-screen bg-paper dark:bg-ink text-ink dark:text-paper">
      <AppHeader />
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div>
          <h1 className="font-display font-bold text-2xl">
            Welcome back{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-muted text-sm mt-1">Here&apos;s where things stand today.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="border border-paper-line dark:border-ink-line rounded-xl p-5">
            <p className="text-xs font-mono text-muted mb-1">TOTAL BALANCE</p>
            <p className="font-display font-bold text-2xl">${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="border border-paper-line dark:border-ink-line rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1 text-muted">
              <Wallet className="h-3.5 w-3.5" />
              <p className="text-xs font-mono">{checking?.nickname ?? "Checking"}</p>
            </div>
            <p className="font-display font-bold text-2xl">${(checking?.balance ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="border border-paper-line dark:border-ink-line rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1 text-muted">
              <PiggyBank className="h-3.5 w-3.5" />
              <p className="text-xs font-mono">{savings?.nickname ?? "Savings"}</p>
            </div>
            <p className="font-display font-bold text-2xl">${(savings?.balance ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="border border-paper-line dark:border-ink-line rounded-xl p-5">
          <h2 className="font-display font-bold text-sm text-muted tracking-wide uppercase mb-4">Checking balance trend</h2>
          {chartValues.length > 1 ? (
            <SpendingChart labels={chartLabels} values={chartValues} />
          ) : (
            <p className="text-muted text-sm">Not enough activity yet to chart.</p>
          )}
        </div>

        <div className="border border-paper-line dark:border-ink-line rounded-xl p-5">
          <h2 className="font-display font-bold text-sm text-muted tracking-wide uppercase mb-4">Recent activity</h2>
          <div className="flex flex-col gap-3">
            {allTransactions.map((t) => {
              const isPositive = t.amount > 0;
              const Icon = t.type === "TRANSFER_IN" || t.type === "TRANSFER_OUT" ? ArrowLeftRight : isPositive ? ArrowDownLeft : ArrowUpRight;
              return (
                <div key={t.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${isPositive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm truncate">{t.description}</p>
                      <p className="text-xs text-muted">{t.accountNickname} &middot; {t.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-mono shrink-0 ${isPositive ? "text-success" : "text-danger"}`}>
                    {isPositive ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
