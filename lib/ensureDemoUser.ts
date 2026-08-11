import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { seedDemoAccounts } from "@/lib/seed";

export const DEMO_EMAIL = "demo@unitedcartbank.com";
export const DEMO_PASSWORD = "Demo12345!";

export async function ensureDemoUser() {
  let user = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });

  if (!user) {
    const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12);
    user = await prisma.user.create({
      data: {
        name: "Demo User",
        email: DEMO_EMAIL,
        passwordHash,
        emailVerified: new Date()
      }
    });
  }

  const existingAccounts = await prisma.account.count({ where: { userId: user.id } });
  if (existingAccounts === 0) {
    await seedDemoAccounts(user.id);
  }

  return { email: DEMO_EMAIL, password: DEMO_PASSWORD };
}
