"use client";

import { useAuth } from "@/hooks/useAuth";
import Button from "../ui-shadcn/button";

export function LogoutButton() {
  const { handleLogout } = useAuth();

  return (
    <Button onClick={handleLogout} variant="secondary" className="w-full">
      Sair
    </Button>
  );
}
