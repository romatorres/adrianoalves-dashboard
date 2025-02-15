import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout realizado com sucesso" });
  response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
  return response;
}
