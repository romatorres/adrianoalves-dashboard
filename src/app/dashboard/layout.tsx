import { Suspense } from "react";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import { RequireAuth } from "@/components/Auth/RequireAuth";
import Loading from "./loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
