import { useSession } from "next-auth/react";

export function usePermissions() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return {
    isAdmin,
    canManageUsers: isAdmin,
    canManageSettings: isAdmin,
    canViewReports: isAdmin,
    // Adicione mais permissões conforme necessário
  };
}
