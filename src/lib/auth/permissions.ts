import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function validateAdminAccess() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Não autenticado");
  }

  if (session.user.role !== "admin") {
    throw new Error("Acesso não autorizado");
  }
}
