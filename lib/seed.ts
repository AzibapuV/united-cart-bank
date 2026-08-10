import { prisma } from "@/lib/prisma";
import { randomInt } from "crypto";

function randomAccountNumber(): string {
  return Array.from({ length: 10 }, () => randomInt(0, 10)).join("");
}

function randomRoutingNumber(): string {
  return Array.from({ length: 9 }, () => randomInt(0, 10)).join("");
}

function daysAgo(n: number): Date {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000);
}

export async function seedDemoAccounts(userId: string) {
  const checking = await prisma.account.create({
    data: {
      userId,
      type: "CHECKING",
      nickname: "Everyday Checking",
      accountNumber: randomAccountNumber(),
      routingNumber: randomRoutingNumber(),
      balance: 2452.64
    }
  });

  const savings = await prisma.account.create({
    data: {
      userId,
      type: "SAVINGS",
      nickname: "High-Yield Savings",
      accountNumber: randomAccountNumber(),
      routingNumber: randomRoutingNumber(),
      balance: 8462.4
    }
  });

  await prisma.card.create({
    data: {
      accountId: checking.id,
      last4: String(randomInt(1000, 9999)),
      spendingLimit: 2500
    }
  });

  const checkingTx: {
    type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER_OUT";
    amount: number;
    description: string;
    balanceAfter: number;
    createdAt: Date;
  }[] = [
    { type: "DEPOSIT", amount: 3200, description: "Direct Deposit - Payroll", balanceAfter: 3200, createdAt: daysAgo(20) },
    { type: "WITHDRAWAL", amount: -84.32, description: "Grocery Mart", balanceAfter: 3115.68, createdAt: daysAgo(15) },
    { type: "WITHDRAWAL", amount: -142.1, description: "Electric & Utility Co.", balanceAfter: 2973.58, createdAt: daysAgo(10) },
    { type: "WITHDRAWAL", amount: -6.75, description: "Coffee House", balanceAfter: 2966.83, createdAt: daysAgo(8) },
    { type: "WITHDRAWAL", amount: -15.99, description: "Streaming Service", balanceAfter: 2950.84, createdAt: daysAgo(5) },
    { type: "WITHDRAWAL", amount: -48.2, description: "Gas Station", balanceAfter: 2902.64, createdAt: daysAgo(3) },
    { type: "TRANSFER_OUT", amount: -450, description: "Transfer to Savings", balanceAfter: 2452.64, createdAt: daysAgo(1) }
  ];

  const savingsTx: {
    type: "TRANSFER_IN" | "DEPOSIT";
    amount: number;
    description: string;
    balanceAfter: number;
    createdAt: Date;
  }[] = [
    { type: "TRANSFER_IN", amount: 450, description: "Transfer from Checking", balanceAfter: 450, createdAt: daysAgo(1) },
    { type: "DEPOSIT", amount: 8000, description: "Initial Deposit", balanceAfter: 8450, createdAt: daysAgo(18) },
    { type: "DEPOSIT", amount: 12.4, description: "Interest Payment", balanceAfter: 8462.4, createdAt: daysAgo(2) }
  ];

  await prisma.transaction.createMany({
    data: [
      ...checkingTx.map((t) => ({ ...t, accountId: checking.id })),
      ...savingsTx.map((t) => ({ ...t, accountId: savings.id }))
    ]
  });

  await prisma.notification.create({
    data: {
      userId,
      title: "Welcome to United Cart Bank",
      body: "Your checking and savings accounts are ready. Explore your dashboard to see balances, transactions, and more."
    }
  });
}
