import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().set("next-auth.session-token", "", { maxAge: 0 });
  return NextResponse.json({ message: "Logout realizado com sucesso" });
}
