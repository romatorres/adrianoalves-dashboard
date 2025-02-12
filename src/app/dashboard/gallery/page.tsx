import { prisma } from "@/lib/prisma";
import { GalleryManager } from "./components/GalleryManager";

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <GalleryManager initialImages={images} />;
}
