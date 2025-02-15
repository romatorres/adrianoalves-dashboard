import { getServerSession } from "next-auth/next";

export async function validateAdminAccess() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Não autenticado");
  }

  if (session.user.role !== "admin") {
    throw new Error("Acesso não autorizado");
  }
}
