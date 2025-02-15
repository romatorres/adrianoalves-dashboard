import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    const response = NextResponse.json({ message: "Logout realizado com sucesso" });
    response.cookies.delete("__Secure-next-auth.session-token");
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("next-auth.csrf-token");
    return response;
  }

  return NextResponse.json({ message: "Nenhuma sessão encontrada" });
}
