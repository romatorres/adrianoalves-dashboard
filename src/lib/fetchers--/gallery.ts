import { prisma } from "@/lib/prisma";

export async function getGalleryImages() {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
      },
    });

    return images;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return [];
  }
} 