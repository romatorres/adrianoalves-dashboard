import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function validateAdminRoute() {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }
}
