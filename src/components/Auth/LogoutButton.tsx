"use client";

import { useAuth } from "@/hooks/useAuth";
import Button from "../ui/button";

export function LogoutButton() {
  const { handleLogout } = useAuth();

  return (
    <Button onClick={handleLogout} variant="secondary" className="w-full">
      Sair
    </Button>
  );
}
