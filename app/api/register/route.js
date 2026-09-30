import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

// Creates a new account. Called from app/(auth)/register/page.js.
export async function POST(req) {
  const { name, email, password, preferredLanguage } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
  }

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash,
    preferredLanguage: preferredLanguage || "en"
  });

  return NextResponse.json({
    user: { id: user._id, name: user.name, email: user.email }
  });
}
