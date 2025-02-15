export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import { RequireAuth } from "@/components/Auth/RequireAuth";
import Loading from "./loading";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    console.log("Iniciando verificação de sessão...");
    const session = await getServerSession(authOptions);
    console.log("Session obtida:", JSON.stringify(session, null, 2));

    if (!session) {
      console.log("Sessão não encontrada, redirecionando para login");
      redirect("/login");
    }

    console.log("Sessão válida, renderizando dashboard");
    return (
      <RequireAuth>
        <div className="min-h-screen bg-gray-50">
          <Sidebar />
          <main className="lg:ml-64 p-4">
            <div className="mt-14 lg:mt-0">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </main>
        </div>
      </RequireAuth>
    );
  } catch (error) {
    console.error("Erro no DashboardLayout:", error);
    redirect("/login");
  }
}
