import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout realizado com sucesso" });
  response.cookies.delete("next-auth.session-token");
  return response;
}
