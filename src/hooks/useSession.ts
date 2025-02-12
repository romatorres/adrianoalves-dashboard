import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useCustomSession() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkSession = () => {
      if (!session?.user) {
        router.push("/login");
      }
    };

    // Verifica a sessão quando a página é carregada
    checkSession();

    // Adiciona listener para verificar a sessão quando a página voltar a ter foco
    window.addEventListener("focus", checkSession);

    return () => {
      window.removeEventListener("focus", checkSession);
    };
  }, [session, router]);

  return { session, status };
}
