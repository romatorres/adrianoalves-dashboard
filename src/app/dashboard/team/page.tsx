import { prisma } from "@/lib/prisma";
import { TeamManager } from "./components/TeamManager";

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: { name: "asc" },
  });

  return <TeamManager initialMembers={members} />;
}
