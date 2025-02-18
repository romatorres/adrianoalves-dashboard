import { prisma } from "@/lib/prisma";
import { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000");
  const apiUrl = `${baseUrl}/api/products`;
  const response = await fetch(apiUrl, {
    next: {
      tags: ["products", "dashboard-products"],
      revalidate: 0,
    },
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar produtos");
  }

  const { data } = await response.json();
  return data;
}

export async function getGalleryImages() {
  const images = await prisma.galleryImage.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return images.map((image) => ({
    id: image.id,
    title: image.title || null,
    imageUrl: image.imageUrl,
    description: image.description || null,
  }));
}

export async function getTeamMembers() {
  const members = await prisma.teamMember.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });
  return members;
}

export async function getPromotions() {
  const promotions = await prisma.promotion.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return promotions.map((promotion) => ({
    ...promotion,
    discount: Number(promotion.discount),
  }));
}

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    });
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}
