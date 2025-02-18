export async function getPromotions() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions`);
    if (!res.ok) throw new Error("Failed to fetch promotions");
    return await res.json();
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return [];
  }
} 