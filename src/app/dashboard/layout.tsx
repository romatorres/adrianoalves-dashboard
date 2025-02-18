import { Suspense } from "react";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import Loading from "./loading";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="lg:ml-64 p-4">
        <div className="mt-14 lg:mt-0">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </main>
    </div>
  );
}
