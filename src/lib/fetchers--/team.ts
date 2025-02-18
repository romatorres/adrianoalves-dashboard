import { TeamMember } from "@/app/dashboard/team/types";

export async function getTeamMembers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch team members");
    }

    const data = await res.json();
    return data as TeamMember[];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
} 