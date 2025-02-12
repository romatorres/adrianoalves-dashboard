import { prisma } from "@/lib/prisma";
import { UserManager } from "./components/UserManager";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <UserManager initialUsers={users} />;
}
