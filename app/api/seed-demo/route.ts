import { NextResponse } from "next/server";
import { ensureDemoUser } from "@/lib/ensureDemoUser";

export async function GET() {
  try {
    const { email, password } = await ensureDemoUser();
    return NextResponse.json({
      ok: true,
      message: "Demo login is ready.",
      email,
      password
    });
  } catch (err) {
    console.error("Failed to seed demo user:", err);
    return NextResponse.json({ error: "Couldn't set up the demo account" }, { status: 500 });
  }
}
